import axios from "axios";

const baseURL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export const api = axios.create({ baseURL, timeout: 15000 });

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const clerkWindow = window as typeof window & {
      Clerk?: { session?: { getToken?: () => Promise<string | null> } };
    };
    const token = await clerkWindow.Clerk?.session?.getToken?.();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
