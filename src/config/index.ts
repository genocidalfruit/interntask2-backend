import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3001", 10),
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/assets-db",
  jwt: {
    secret: process.env.JWT_SECRET || "dev-jwt-secret",
    expiresIn: "15m",
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret",
    expiresIn: "7d",
  },
  cookie: {
    domain:
      process.env.NODE_ENV === "production"
        ? (process.env.COOKIE_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "") || undefined
        : undefined,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
  },
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? (process.env.CORS_ORIGIN || "*")
        : process.env.CORS_ORIGIN || "http://localhost:3000",
  },
};
