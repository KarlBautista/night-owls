import { create } from "zustand";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  channel: string;
  url: string;
  duration: string;
}
interface VideoState {
    category: string;
    videos: Video[];
    nextPageToken: string | null;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
    loadInitialVideos: (maxResults?: number) => Promise<void>;
    loadMoreVideos: (maxResults?: number) => Promise<void>;
    
}

const API_BASE_URL = "http://localhost:4000/api";

export const useVideoStore = create<VideoState>((set, get) => ({
    category: "",
    videos: [],
    nextPageToken: null,
    hasMore: true,
    loading: false,
    error: null,

    loadInitialVideos: async (maxResults = 10) => {
        try {
            set({ loading: true, error: null, videos: [], nextPageToken: null, hasMore: true });

            const res = await axios.get(`${API_BASE_URL}/all`, {
                params: { maxResults },
            });
            if (!res.data?.success) throw new Error(res.data?.error ?? "Failed to fetch videos");

            const nextPageToken = typeof res.data?.nextPageToken === 'string' ? res.data.nextPageToken : null;
            set({
                videos: Array.isArray(res.data?.data) ? res.data.data : [],
                nextPageToken,
                hasMore: Boolean(nextPageToken),
                loading: false,
            });
        } catch (err: unknown) {
            const message = axios.isAxiosError(err) ? (err.response?.data?.error ?? err.message) : (err instanceof Error ? err.message : "Unexpected Error");
            set({ loading: false, error: message });
        }
    },

    loadMoreVideos: async (maxResults = 10) => {
        const { loading, hasMore, nextPageToken } = get();
        if (loading || !hasMore || !nextPageToken) return;

        try {
            set({ loading: true, error: null });
            const res = await axios.get(`${API_BASE_URL}/all`, {
                params: { pageToken: nextPageToken, maxResults },
            });
            if (!res.data?.success) throw new Error(res.data?.error ?? "Failed to fetch more videos");

            const newVideos: Video[] = Array.isArray(res.data?.data) ? res.data.data : [];
            const newNextPageToken = typeof res.data?.nextPageToken === 'string' ? res.data.nextPageToken : null;

            set((state) => ({
                videos: [...state.videos, ...newVideos],
                nextPageToken: newNextPageToken,
                hasMore: Boolean(newNextPageToken),
                loading: false,
            }));
        } catch (err: unknown) {
            const message = axios.isAxiosError(err) ? (err.response?.data?.error ?? err.message) : (err instanceof Error ? err.message : "Unexpected Error");
            set({ loading: false, error: message });
        }
    },

}))