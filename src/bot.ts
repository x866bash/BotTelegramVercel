import { Bot, GrammyError, HttpError } from "grammy";
import { env } from "./config";
import { greetings } from "./features/greetings";
import { members } from "./features/members";
import { admin } from "./features/admin";
import { antispam } from "./features/antispam";
import { info } from "./features/info";


export const bot = new Bot(env.TELEGRAM_BOT_TOKEN);


bot.use(antispam);
bot.use(greetings);
bot.use(members);
bot.use(admin);
bot.use(info);


bot.command("start", async (ctx) => {
await ctx.reply(
`Halo! Saya bot utilitas untuk grup/channel Indonesia.\n\n`+
`Perintah utama:\n`+
`• /setwelcome <teks> — set pesan selamat datang\n`+
`• /setfarewell <teks> — set pesan perpisahan\n`+
`• /antispam on|off — nyalakan/matikan anti-spam\n`+
`• /setrate <n> <detik> — batas pesan per user\n`+
`• /badwords list|add|remove|blocklinks|allowlinks\n`+
`• /kick <@username|userId> — keluarkan anggota (admin)\n`+
`• /invite — buat link undangan (admin)\n`+
`• /exportmembers — ekspor data anggota (.json.gz)\n`+
`• /weather <kota> — cuaca Indonesia\n`+
`• /news [kata kunci] — headline Indonesia\n`+
`• /search <engine> <query> [--zip] — Google/Yandex/Bing/Yahoo/DDG`
);
});


bot.command("help", async (ctx) => ctx.api.copyMessage(ctx.chat.id, ctx.chat.id, ctx.msg!.message_id - 1).catch(() => ctx.reply("/start untuk bantuan.")));


// Error handling
bot.catch((err) => {
const ctx = err.ctx;
console.error(`Error while handling update ${ctx.update.update_id}:`);
const e = err.error;
if (e instanceof GrammyError) console.error("Error in request:", e.description);
else if (e instanceof HttpError) console.error("Could not contact Telegram:", e);
else console.error("Unknown error:", e);
});


// Auto set webhook if APP_BASE_URL provided (first request)
(async () => {
if (env.APP_BASE_URL && env.TELEGRAM_WEBHOOK_SECRET) {
try {
const url = `${env.APP_BASE_URL}/api/telegram`;
await bot.api.setWebhook(url, { secret_token: env.TELEGRAM_WEBHOOK_SECRET });
console.log("Webhook set:", url);
} catch (e) {
console.log("Failed to set webhook:", (e as any).message);
}
}
})();
