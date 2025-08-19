import { Composer } from "grammy";
import { addMember, removeMember, exportMembers } from "../storage";
import { strToGzipBuffer } from "../utils/compress";


export const members = new Composer();


// Track via chat_member updates
members.on("chat_member", async (ctx) => {
const u = ctx.chatMember.new_chat_member?.user;
const status = ctx.chatMember.new_chat_member?.status;
if (!u || !status) return;
if (["member", "administrator"].includes(status)) {
await addMember(ctx.chat.id, {
id: u.id,
username: u.username,
first_name: u.first_name,
last_name: u.last_name,
joined_at: Date.now(),
});
}
if (["left", "kicked"].includes(status)) {
await removeMember(ctx.chat.id, u.id);
}
});


// Also track message-based joins/leaves for redundancy
members.on("message:new_chat_members", async (ctx) => {
for (const m of ctx.message!.new_chat_members!) {
await addMember(ctx.chat.id, {
id: m.id,
username: m.username,
first_name: m.first_name,
last_name: m.last_name,
joined_at: Date.now(),
});
}
});


members.on("message:left_chat_member", async (ctx) => {
await removeMember(ctx.chat.id, ctx.message!.left_chat_member!.id);
});


members.command("exportmembers", async (ctx) => {
const data = await exportMembers(ctx.chat.id);
const payload = JSON.stringify({ chat: ctx.chat, members: data }, null, 2);
const file = await strToGzipBuffer(`members_${ctx.chat.id}.json`, payload);
await ctx.replyWithDocument({ filename: file.filename, source: file.data });
});
