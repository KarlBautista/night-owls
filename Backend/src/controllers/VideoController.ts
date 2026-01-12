import axios from 'axios'
import type { Request, Response } from 'express'

const youtubeApiKey: string | undefined = process.env.NODE_YOUTUBE_API_KEY;

export const getTrendingVideos = async (req: Request, res: Response) => {
    try {
        if (!youtubeApiKey) {
            return res.status(500).json({
                success: false,
                error: "Missing NODE_YOUTUBE_API_KEY in backend environment",
            });
        }

        const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
            params: {
                part: "snippet,statistics",
                chart: "mostPopular",
                regionCode: "PH",
                maxResults: 10,
                key: youtubeApiKey
            }
        });

        if (response.status === 200) {
            console.log("youtube data fetched")
            res.status(200).json({ success: true, data: response.data })
        }
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status ?? 500;
            const details = err.response?.data ?? err.message;
            console.error("Error getting videos:", status, details);
            return res.status(status).json({ success: false, error: details });
        }

        if (err instanceof Error) {
            console.error("Error getting videos:", err.message);
            return res.status(500).json({ success: false, error: err.message });
        }

        console.error("Error getting videos: Unknown error", err);
        return res.status(500).json({ success: false, error: "Unknown Error" })
    }
}