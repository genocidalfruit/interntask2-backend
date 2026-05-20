import { IRole } from "./role.model";
export declare class RoleService {
    getAll(): Promise<(import("mongoose").Document<unknown, {}, IRole, {}, import("mongoose").DefaultSchemaOptions> & IRole & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, IRole, {}, import("mongoose").DefaultSchemaOptions> & IRole & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(data: Partial<IRole>): Promise<import("mongoose").Document<unknown, {}, IRole, {}, import("mongoose").DefaultSchemaOptions> & IRole & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, data: Partial<IRole>): Promise<import("mongoose").Document<unknown, {}, IRole, {}, import("mongoose").DefaultSchemaOptions> & IRole & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
