import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "@/config";
import { connectDb } from "@/config/database";
import { correlationIdMiddleware } from "@/middleware/correlationId.middleware";
import { errorMiddleware } from "@/middleware/error.middleware";
import routes from "@/routes";

const app = express();

app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(correlationIdMiddleware);

app.use("/api/v1", routes);

app.use(errorMiddleware);

async function start() {
  await connectDb();
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.env}`);
  });
}

start();

export default app;