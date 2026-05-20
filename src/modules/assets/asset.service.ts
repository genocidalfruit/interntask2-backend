import { Asset, IAsset } from "./asset.model";
import { AssetStatus } from "@/shared/enums";
import { PaginationQuery } from "@/shared/types";
import { parsePagination, getMeta, getSortObject } from "@/shared/utils/pagination";

const validTransitions: Record<AssetStatus, AssetStatus[]> = {
  AVAILABLE: [AssetStatus.ASSIGNED],
  ASSIGNED: [AssetStatus.MAINTENANCE],
  MAINTENANCE: [AssetStatus.AVAILABLE, AssetStatus.RETIRED, AssetStatus.LOST],
  RETIRED: [],
  LOST: [],
};

export class AssetService {
  async getAll(query: Record<string, unknown>, userId?: string) {
    const { page, limit, sort } = parsePagination(query);
    const filter: Record<string, unknown> = {};
    if (query.status) filter.status = query.status;
    if (query.category) filter.category = query.category;
    if (query.search) filter.name = { $regex: query.search, $options: "i" };

    if (userId && query.scope) {
      const scope = query.scope as string;
      if (scope === "assigned") {
        filter.assignedTo = userId;
      } else if (scope === "mine") {
        filter.assignedTo = userId;
      }
    }

    const [assets, total] = await Promise.all([
      Asset.find(filter)
        .populate("assignedTo", "name email")
        .sort(getSortObject(sort))
        .skip((page - 1) * limit)
        .limit(limit),
      Asset.countDocuments(filter),
    ]);

    return { assets, meta: getMeta(page, limit, total) };
  }

  async getById(id: string) {
    const asset = await Asset.findById(id).populate("assignedTo", "name email");
    if (!asset) throw new Error("Asset not found");
    return asset;
  }

  async create(data: Partial<IAsset>) {
    const assetCode = `AST-${String(await Asset.countDocuments() + 1).padStart(3, "0")}`;
    const asset = await Asset.create({ ...data, assetCode });
    return asset;
  }

  async update(id: string, data: Partial<IAsset>) {
    const asset = await Asset.findByIdAndUpdate(id, data, { new: true });
    if (!asset) throw new Error("Asset not found");
    return asset;
  }

  async assign(id: string, userId: string) {
    const asset = await Asset.findById(id);
    if (!asset) throw new Error("Asset not found");
    if (asset.status !== AssetStatus.AVAILABLE) throw new Error("Asset is not available");

    asset.assignedTo = userId as any;
    asset.status = AssetStatus.ASSIGNED;
    await asset.save();
    return asset;
  }

  async changeStatus(id: string, newStatus: AssetStatus) {
    const asset = await Asset.findById(id);
    if (!asset) throw new Error("Asset not found");

    if (!validTransitions[asset.status].includes(newStatus)) {
      throw new Error(`Invalid transition from ${asset.status} to ${newStatus}`);
    }

    if (newStatus === AssetStatus.AVAILABLE) {
      asset.assignedTo = undefined;
    }

    asset.status = newStatus;
    await asset.save();
    return asset;
  }

  async getHistory(id: string) {
    const asset = await Asset.findById(id);
    if (!asset) throw new Error("Asset not found");
    return { assetCode: asset.assetCode, name: asset.name, statusChanges: [] };
  }
}