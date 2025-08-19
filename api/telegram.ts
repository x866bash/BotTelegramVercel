import { handle } from "@grammyjs/adapter-vercel";
import "dotenv/config";
import { bot } from "../src/bot";


export const config = {
runtime: "edge"
};


export default handle(bot, {
secretToken: process.env.TELEGRAM_WEBHOOK_SECRET,
});
