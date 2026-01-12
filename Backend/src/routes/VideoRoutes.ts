import { Router } from "express";
import { getTrendingVideos } from "../controllers/VideoController.js"
const router = Router();


router.get('/trending', getTrendingVideos);

export const youtubeRoutes = router;

export default router;