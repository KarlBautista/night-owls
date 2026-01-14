import axios from 'axios'
import type { Request, Response } from 'express'

const youtubeApiKey: string | undefined = process.env.NODE_YOUTUBE_API_KEY;

export const getAllVideos = async (req: Request, res: Response) => {
    try {
        if (!youtubeApiKey) {
            return res.status(500).json({
                success: false,
                error: "Missing NODE_YOUTUBE_API_KEY in backend environment",
            });
        }

        const pageToken = typeof req.query.pageToken === 'string' ? req.query.pageToken : undefined;
        const maxResultsRaw = typeof req.query.maxResults === 'string' ? req.query.maxResults : undefined;
        const maxResultsParsed = maxResultsRaw ? Number.parseInt(maxResultsRaw, 10) : NaN;
        const maxResults = Number.isFinite(maxResultsParsed) && maxResultsParsed > 0 && maxResultsParsed <= 50 ? maxResultsParsed : 12;

        const searchRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: "Javascript tutorials",
                type: "video",
                order: "viewCount",
                maxResults,
                publishedAfter: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
                ...(pageToken ? { pageToken } : {}),
                key: youtubeApiKey
            }
        });

        const nextPageToken: string | null = typeof searchRes.data?.nextPageToken === 'string' ? searchRes.data.nextPageToken : null;
        
        const items: any[] = Array.isArray(searchRes.data?.items) ? searchRes.data.items : [];
        if (items.length === 0) {
            return res.status(200).json({ success: true, data: [], nextPageToken: null });
        }

        const videoIds = items.map((item: any) => item.id.videoId).join(",");

        const statsRes = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
            params: {
                part: "snippet,statistics,contentDetails",
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
            duration: formatDuration(video.contentDetails.duration)
        }))

    res.status(200).json({ success: true, data: videos, nextPageToken });


        
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


const formatDuration = (isoDuration: string) => {
      const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    const totalMinutes = hours * 60 + minutes;
    const secString = seconds < 10 ? `0${seconds}` : seconds;
    return hours > 0 ? `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${secString}` : `${totalMinutes}:${secString}`;
};
