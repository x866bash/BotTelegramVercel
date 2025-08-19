import { Composer } from "grammy";


export const admin = new Composer();


async function requireAdmin(ctx: any) {
const me = await ctx.getChatMember(ctx.from!.id);
if (!["creator", "administrator"].includes(me.status)) {
await ctx.reply("❌ Butuh hak admin.");
return false;
}
return true;
}


admin.command("kick", async (ctx) => {
if (!(await requireAdmin(ctx))) return;
const arg = ctx.match?.trim();
const target = arg?.startsWith("@") ? arg.slice(1) : arg;
if (!target) return ctx.reply("Format: /kick <@username|userId>");


try {
let userId: number | undefined;
if (/^\d+$/.test(target)) userId = Number(target);
else {
// Try to resolve via chat member mentions (best-effort)
await ctx.reply("🔎 Mencari pengguna… Balas /kick pada pesan user juga bisa.");
}
if (!userId && ctx.message?.reply_to_message?.from?.id) userId = ctx.message.reply_to_message.from.id;
if (!userId) return ctx.reply("Tidak bisa menemukan userId.");


await ctx.banChatMember(userId);
await ctx.reply(`✅ Pengguna ${userId} dikeluarkan.`);
} catch (e: any) {
await ctx.reply(`⚠️ Gagal kick: ${e.message}`);
}
});


admin.command("invite", async (ctx) => {
if (!(await requireAdmin(ctx))) return;
try {
const link = await ctx.api.createChatInviteLink(ctx.chat.id, { creates_join_request: true, name: "Bot Invite" });
await ctx.reply(`🔗 Undang pengguna pakai link ini:\n${link.invite_link}`);
} catch (e: any) {
await ctx.reply(`⚠️ Gagal membuat link: ${e.message}`);
}
});


admin.command("approveall", async (ctx) => {
if (!(await requireAdmin(ctx))) return;
try {
// grammY lacks bulk approve method; approve one-by-one is not available via API either.
// Admins must approve via client UI. Inform limitation:
await ctx.reply("ℹ️ Telegram belum menyediakan API untuk approve massal. Silakan gunakan UI Telegram untuk menyetujui permintaan bergabung.");
} catch (e: any) {
await ctx.reply(`⚠️ ${e.message}`);
}
});
