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

        const searchRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: "programming tutorials",
                type: "video",
                order: "viewCount",
                maxResults: 10,
                publishedAfter: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
                key: youtubeApiKey
            }
        });
        
        const videoIds = searchRes.data.items.map((item: any) => item.id.videoId).join(",");

        const statsRes = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
            params: {
                part: "snippet,statistics",
                id: videoIds,
                key: youtubeApiKey,
            }
        });

        const videos = statsRes.data.items.map((video: any) => ({
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium.url,
            views: video.statistics.viewCount,
            channel: video.snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${video.id}`,
        }))

    

       res.status(200).json({ success: true, data: videos });


        
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