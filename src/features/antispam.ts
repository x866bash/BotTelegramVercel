import { Composer } from "grammy";


antispam.command("antispam", async (ctx) => {
const arg = (ctx.match || "").trim().toLowerCase();
const cfg = await getAntiSpam(ctx.chat.id);
if (arg === "on" || arg === "off") {
await setAntiSpam(ctx.chat.id, { enabled: arg === "on" });
return ctx.reply(`✅ Anti-spam ${arg}.`);
}
return ctx.reply(`Anti-spam: ${cfg.enabled ? "ON" : "OFF"}\nLimit: ${cfg.perWindow} pesan / ${cfg.windowSec}s\nBlock link: ${cfg.blockLinks}\nBad words: ${cfg.badWords.join(", ")}`);
});


antispam.command("setrate", async (ctx) => {
const [n, sec] = (ctx.match || "").trim().split(/\s+/).map(Number);
if (!n || !sec) return ctx.reply("Format: /setrate <jumlah> <detik>");
await setAntiSpam(ctx.chat.id, { perWindow: n, windowSec: sec });
await ctx.reply(`✅ Limit diubah: ${n}/${sec}s`);
});


antispam.command("badwords", async (ctx) => {
const [cmd, ...rest] = (ctx.match || "").trim().split(/\s+/);
const cfg = await getAntiSpam(ctx.chat.id);
if (!cmd || cmd === "list") return ctx.reply(`Bad words: ${cfg.badWords.join(", ") || "(kosong)"}`);
if (cmd === "add") {
const words = rest.filter(Boolean);
const set = new Set(cfg.badWords.concat(words));
await setAntiSpam(ctx.chat.id, { badWords: Array.from(set) });
return ctx.reply("✅ Ditambahkan.");
}
if (cmd === "remove") {
const words = new Set(rest);
await setAntiSpam(ctx.chat.id, { badWords: cfg.badWords.filter(w => !words.has(w)) });
return ctx.reply("✅ Dihapus.");
}
if (cmd === "blocklinks") {
await setAntiSpam(ctx.chat.id, { blockLinks: true });
return ctx.reply("✅ Pemblokiran link diaktifkan.");
}
if (cmd === "allowlinks") {
await setAntiSpam(ctx.chat.id, { blockLinks: false });
return ctx.reply("✅ Pemblokiran link dimatikan.");
}
return ctx.reply("Perintah: /badwords list | add <kata…> | remove <kata…> | blocklinks | allowlinks");
});
