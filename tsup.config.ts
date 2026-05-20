import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"],
  outDir: "dist",
  format: ["cjs"],
  target: "node20",
  clean: true,
  sourcemap: true,
  dts: false,
  tsconfig: "./tsconfig.json",
  noExternal: [],
  external: [
    "mongoose",
    "express",
    "cors",
    "cookie-parser",
    "dotenv",
    "bcryptjs",
    "jsonwebtoken",
    "express-validator",
    "uuid",
  ],
});
