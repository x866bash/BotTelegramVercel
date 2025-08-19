import { z } from "zod";


const Env = z.object({
TELEGRAM_BOT_TOKEN: z.string(),
TELEGRAM_WEBHOOK_SECRET: z.string().optional(),
APP_BASE_URL: z.string().url().optional(),
OPENWEATHER_KEY: z.string().optional(),
NEWSAPI_KEY: z.string().optional(),
SERPAPI_KEY: z.string().optional(),
VERCEL_KV_REST_URL: z.string().optional(),
VERCEL_KV_REST_TOKEN: z.string().optional(),
});


export const env = Env.parse({
TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
APP_BASE_URL: process.env.APP_BASE_URL,
OPENWEATHER_KEY: process.env.OPENWEATHER_KEY,
NEWSAPI_KEY: process.env.NEWSAPI_KEY,
SERPAPI_KEY: process.env.SERPAPI_KEY,
VERCEL_KV_REST_URL: process.env.VERCEL_KV_REST_URL,
VERCEL_KV_REST_TOKEN: process.env.VERCEL_KV_REST_TOKEN,
});
