import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://vet-mate.vercel.app",
    ],
    credentials: true,
  })
);

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

const PORT = process.env.PORT || 3600;

import diagnosisRouter from "./routes/diagnosisRoutes.js";
import nearbyVetsRouter from "./routes/vetsRoutes.js"
app.use("/users/api", diagnosisRouter);
app.use("/users/api",nearbyVetsRouter)

app.listen(PORT, () => {
  logger.warn("Hello and welcome to VetMate");
  logger.info(`Running on port ${PORT}`);
});
