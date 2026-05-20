export declare class AuthService {
    login(email: string, password: string): Promise<{
        accessToken: never;
        refreshToken: never;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            roleId: import("mongoose").Types.ObjectId;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: never;
        refreshToken: never;
    }>;
    logout(userId: string): Promise<void>;
    getMe(userId: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        role: import("mongoose").Types.ObjectId;
        status: import("../../shared/enums").UserStatus;
    }>;
}
