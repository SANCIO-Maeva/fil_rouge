import express from "express";
import cors from "cors";
import V1Router from "./routes/v1.js";

export const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

app.use("/v1", V1Router);

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});
