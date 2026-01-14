import { Router } from "express";
import { getAllVideos } from "../controllers/VideoController.js"
const router = Router();


router.get('/all', getAllVideos);

export const youtubeRoutes = router;

export default router;