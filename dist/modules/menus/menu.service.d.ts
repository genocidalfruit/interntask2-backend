export declare class MenuService {
    getMenusForUser(userId: string, roleId: string): Promise<any[]>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./menu.model").IMenu, {}, import("mongoose").DefaultSchemaOptions> & import("./menu.model").IMenu & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    create(data: any): Promise<import("mongoose").Document<unknown, {}, import("./menu.model").IMenu, {}, import("mongoose").DefaultSchemaOptions> & import("./menu.model").IMenu & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("./menu.model").IMenu, {}, import("mongoose").DefaultSchemaOptions> & import("./menu.model").IMenu & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
