"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.create = create;
exports.getById = getById;
exports.update = update;
exports.assign = assign;
exports.changeStatus = changeStatus;
exports.getHistory = getHistory;
exports.remove = remove;
const asset_service_1 = require("./asset.service");
const response_1 = require("@/shared/response");
const asset_model_1 = require("./asset.model");
const audit_service_1 = require("@/modules/audit/audit.service");
const assetService = new asset_service_1.AssetService();
async function getAll(req, res) {
    try {
        const { assets, meta } = await assetService.getAll(req.query, req.user?.id);
        res.json((0, response_1.success)("Assets retrieved", assets, meta));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function create(req, res) {
    try {
        const asset = await assetService.create(req.body);
        await audit_service_1.auditService.log(req.user.id, "Asset created", "Asset", asset._id.toString(), undefined, req.body, req.id);
        res.status(201).json((0, response_1.success)("Asset created", asset));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function getById(req, res) {
    try {
        const asset = await assetService.getById(req.params.id);
        res.json((0, response_1.success)("Asset retrieved", asset));
    }
    catch (err) {
        res.status(404).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function update(req, res) {
    try {
        const existingAsset = await assetService.getById(req.params.id);
        const asset = await assetService.update(req.params.id, req.body);
        await audit_service_1.auditService.log(req.user.id, "Asset updated", "Asset", asset._id.toString(), existingAsset, req.body, req.id);
        res.json((0, response_1.success)("Asset updated", asset));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function assign(req, res) {
    try {
        const { userId } = req.body;
        const asset = await assetService.assign(req.params.id, userId);
        res.json((0, response_1.success)("Asset assigned", asset));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function changeStatus(req, res) {
    try {
        const { status } = req.body;
        const asset = await assetService.changeStatus(req.params.id, status);
        res.json((0, response_1.success)("Asset status changed", asset));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function getHistory(req, res) {
    try {
        const history = await assetService.getHistory(req.params.id);
        res.json((0, response_1.success)("Asset history retrieved", history));
    }
    catch (err) {
        res.status(404).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function remove(req, res) {
    try {
        const asset = await asset_model_1.Asset.findById(req.params.id);
        await asset_model_1.Asset.findByIdAndDelete(req.params.id);
        await audit_service_1.auditService.log(req.user.id, "Asset deleted", "Asset", req.params.id, asset?.toObject(), undefined, req.id);
        res.json((0, response_1.success)("Asset deleted"));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
//# sourceMappingURL=asset.controller.js.map