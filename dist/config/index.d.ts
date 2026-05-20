export declare const config: {
    env: string;
    port: number;
    mongodbUri: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    refreshToken: {
        secret: string;
        expiresIn: string;
    };
    cookie: {
        domain: string | undefined;
        secure: boolean;
        sameSite: "strict";
    };
    cors: {
        origin: string;
    };
};
