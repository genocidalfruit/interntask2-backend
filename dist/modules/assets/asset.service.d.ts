import { IAsset } from "./asset.model";
import { AssetStatus } from "@/shared/enums";
export declare class AssetService {
    getAll(query: Record<string, unknown>, userId?: string): Promise<{
        assets: (import("mongoose").Document<unknown, {}, IAsset, {}, import("mongoose").DefaultSchemaOptions> & IAsset & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, IAsset, {}, import("mongoose").DefaultSchemaOptions> & IAsset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(data: Partial<IAsset>): Promise<import("mongoose").Document<unknown, {}, IAsset, {}, import("mongoose").DefaultSchemaOptions> & IAsset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, data: Partial<IAsset>): Promise<import("mongoose").Document<unknown, {}, IAsset, {}, import("mongoose").DefaultSchemaOptions> & IAsset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    assign(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, IAsset, {}, import("mongoose").DefaultSchemaOptions> & IAsset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    changeStatus(id: string, newStatus: AssetStatus): Promise<import("mongoose").Document<unknown, {}, IAsset, {}, import("mongoose").DefaultSchemaOptions> & IAsset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getHistory(id: string): Promise<{
        assetCode: string;
        name: string;
        statusChanges: never[];
    }>;
}
