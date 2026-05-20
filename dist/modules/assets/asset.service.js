"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetService = void 0;
const asset_model_1 = require("./asset.model");
const enums_1 = require("@/shared/enums");
const pagination_1 = require("@/shared/utils/pagination");
const validTransitions = {
    AVAILABLE: [enums_1.AssetStatus.ASSIGNED],
    ASSIGNED: [enums_1.AssetStatus.MAINTENANCE],
    MAINTENANCE: [enums_1.AssetStatus.AVAILABLE, enums_1.AssetStatus.RETIRED, enums_1.AssetStatus.LOST],
    RETIRED: [],
    LOST: [],
};
class AssetService {
    async getAll(query, userId) {
        const { page, limit, sort } = (0, pagination_1.parsePagination)(query);
        const filter = {};
        if (query.status)
            filter.status = query.status;
        if (query.category)
            filter.category = query.category;
        if (query.search)
            filter.name = { $regex: query.search, $options: "i" };
        if (userId && query.scope) {
            const scope = query.scope;
            if (scope === "assigned") {
                filter.assignedTo = userId;
            }
            else if (scope === "mine") {
                filter.assignedTo = userId;
            }
        }
        const [assets, total] = await Promise.all([
            asset_model_1.Asset.find(filter)
                .populate("assignedTo", "name email")
                .sort((0, pagination_1.getSortObject)(sort))
                .skip((page - 1) * limit)
                .limit(limit),
            asset_model_1.Asset.countDocuments(filter),
        ]);
        return { assets, meta: (0, pagination_1.getMeta)(page, limit, total) };
    }
    async getById(id) {
        const asset = await asset_model_1.Asset.findById(id).populate("assignedTo", "name email");
        if (!asset)
            throw new Error("Asset not found");
        return asset;
    }
    async create(data) {
        const assetCode = `AST-${String(await asset_model_1.Asset.countDocuments() + 1).padStart(3, "0")}`;
        const asset = await asset_model_1.Asset.create({ ...data, assetCode });
        return asset;
    }
    async update(id, data) {
        const asset = await asset_model_1.Asset.findByIdAndUpdate(id, data, { new: true });
        if (!asset)
            throw new Error("Asset not found");
        return asset;
    }
    async assign(id, userId) {
        const asset = await asset_model_1.Asset.findById(id);
        if (!asset)
            throw new Error("Asset not found");
        if (asset.status !== enums_1.AssetStatus.AVAILABLE)
            throw new Error("Asset is not available");
        asset.assignedTo = userId;
        asset.status = enums_1.AssetStatus.ASSIGNED;
        await asset.save();
        return asset;
    }
    async changeStatus(id, newStatus) {
        const asset = await asset_model_1.Asset.findById(id);
        if (!asset)
            throw new Error("Asset not found");
        if (!validTransitions[asset.status].includes(newStatus)) {
            throw new Error(`Invalid transition from ${asset.status} to ${newStatus}`);
        }
        if (newStatus === enums_1.AssetStatus.AVAILABLE) {
            asset.assignedTo = undefined;
        }
        asset.status = newStatus;
        await asset.save();
        return asset;
    }
    async getHistory(id) {
        const asset = await asset_model_1.Asset.findById(id);
        if (!asset)
            throw new Error("Asset not found");
        return { assetCode: asset.assetCode, name: asset.name, statusChanges: [] };
    }
}
exports.AssetService = AssetService;
//# sourceMappingURL=asset.service.js.map