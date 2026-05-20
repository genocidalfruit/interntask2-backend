import { Response } from "express";
import { AssetService } from "./asset.service";
import { success, error } from "@/shared/response";
import { AuthRequest } from "@/middleware/auth.middleware";
import { Asset } from "./asset.model";
import { auditService } from "@/modules/audit/audit.service";

const assetService = new AssetService();

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const { assets, meta } = await assetService.getAll(req.query, req.user?.id);
    res.json(success("Assets retrieved", assets, meta));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const asset = await assetService.create(req.body);
    await auditService.log(req.user!.id, "Asset created", "Asset", asset._id.toString(), undefined, req.body, req.id);
    res.status(201).json(success("Asset created", asset));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}
export async function getById(req: AuthRequest, res: Response) {
  try {
    const asset = await assetService.getById(req.params.id);
    res.json(success("Asset retrieved", asset));
  } catch (err: any) {
    res.status(404).json(error(err.message, undefined, req.id));
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const existingAsset = await assetService.getById(req.params.id);
    const asset = await assetService.update(req.params.id, req.body);
    await auditService.log(req.user!.id, "Asset updated", "Asset", asset._id.toString(), existingAsset, req.body, req.id);
    res.json(success("Asset updated", asset));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function assign(req: AuthRequest, res: Response) {
  try {
    const { userId } = req.body;
    const asset = await assetService.assign(req.params.id, userId);
    res.json(success("Asset assigned", asset));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function changeStatus(req: AuthRequest, res: Response) {
  try {
    const { status } = req.body;
    const asset = await assetService.changeStatus(req.params.id, status);
    res.json(success("Asset status changed", asset));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function getHistory(req: AuthRequest, res: Response) {
  try {
    const history = await assetService.getHistory(req.params.id);
    res.json(success("Asset history retrieved", history));
  } catch (err: any) {
    res.status(404).json(error(err.message, undefined, req.id));
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const asset = await Asset.findById(req.params.id);
    await Asset.findByIdAndDelete(req.params.id);
    await auditService.log(req.user!.id, "Asset deleted", "Asset", req.params.id, asset?.toObject(), undefined, req.id);
    res.json(success("Asset deleted"));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}