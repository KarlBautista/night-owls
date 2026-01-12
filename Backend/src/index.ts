import "dotenv/config";
import express from "express";
import cors from "cors";
import { youtubeRoutes } from "./routes/VideoRoutes.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/api", youtubeRoutes);

app.listen(PORT, () => {
    console.log('Server is running on ', PORT)
})