import { Composer } from "grammy";
import { getWelcomeFarewell, setWelcome, setFarewell } from "../storage";


export const greetings = new Composer();


// Handle new members
greetings.on("message:new_chat_members", async (ctx) => {
const wf = await getWelcomeFarewell(ctx.chat.id);
for (const m of ctx.message!.new_chat_members!) {
const name = [m.first_name, m.last_name].filter(Boolean).join(" ") || m.username || m.id;
const text = wf.welcome ?? `Selamat datang, ${name}! 🎉`;
await ctx.reply(text, { reply_to_message_id: ctx.msg!.message_id });
}
});


// Handle left member
greetings.on("message:left_chat_member", async (ctx) => {
const wf = await getWelcomeFarewell(ctx.chat.id);
const m = ctx.message!.left_chat_member!;
const name = [m.first_name, m.last_name].filter(Boolean).join(" ") || m.username || m.id;
const text = wf.farewell ?? `Sampai jumpa, ${name}. 👋`;
await ctx.reply(text);
});


// Commands to set templates
greetings.command("setwelcome", async (ctx) => {
const t = ctx.match?.trim();
if (!t) return ctx.reply("Format: /setwelcome <teks>");
await setWelcome(ctx.chat.id, t);
await ctx.reply("✅ Pesan welcome disimpan.");
});


greetings.command("setfarewell", async (ctx) => {
const t = ctx.match?.trim();
if (!t) return ctx.reply("Format: /setfarewell <teks>");
await setFarewell(ctx.chat.id, t);
await ctx.reply("✅ Pesan farewell disimpan.");
});
