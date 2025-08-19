import { Composer } from "grammy";
const res = await fetch(base, { headers: { "X-Api-Key": env.NEWSAPI_KEY! } });
const data = await res.json();
if (data.status !== "ok") return ctx.reply(`Gagal: ${data.message || data.status}`);


const lines = data.articles.map((a: any, i: number) => `*${i+1}. ${truncate(a.title, 120)}*\n${a.url}`);
const text = lines.join("\n\n");
await ctx.reply(text || "(Kosong)", { parse_mode: "Markdown" });
});


// SEARCH via SerpAPI (supports google, yandex, bing, yahoo, duckduckgo)
info.command("search", async (ctx) => {
const raw = (ctx.match || "").trim();
if (!raw) return ctx.reply("Format: /search <engine> <query> [--zip]\nEngine: google | yandex | bing | yahoo | duckduckgo");
const parts = raw.split(/\s+/);
const engine = parts.shift()!.toLowerCase();
const zipped = parts[parts.length - 1] === "--zip";
const q = parts.filter(p => p !== "--zip").join(" ");
if (!env.SERPAPI_KEY) return ctx.reply("Tambahkan SERPAPI_KEY di env.");
const supported = new Set(["google", "yandex", "bing", "yahoo", "duckduckgo"]);
if (!supported.has(engine)) return ctx.reply("Engine tidak dikenal.");


const endpoint = `https://serpapi.com/search.json?engine=${engine}&q=${encodeURIComponent(q)}&hl=id&location=Indonesia&google_domain=google.co.id&gl=id&api_key=${env.SERPAPI_KEY}`;
const res = await fetch(endpoint);
const data = await res.json();


// Normalize results (top 5)
const results: { title: string; link: string; snippet?: string }[] = [];
const push = (arr?: any[], titleKey = "title", linkKey = "link", snippetKey = "snippet") => {
if (!Array.isArray(arr)) return;
for (const it of arr.slice(0, 5)) {
if (it?.[titleKey] && it?.[linkKey]) results.push({ title: it[titleKey], link: it[linkKey], snippet: it[snippetKey] });
}
};
push(data.organic_results);
push(data.news_results, "title", "link", "snippet");


if (zipped) {
const payload = JSON.stringify({ engine, q, results }, null, 2);
const file = await strToGzipBuffer(`search_${engine}.json`, payload);
return ctx.replyWithDocument({ filename: file.filename, source: file.data });
}


if (!results.length) return ctx.reply("(Tidak ada hasil)");
const lines = results.map((r, i) => `*${i+1}. ${truncate(r.title, 140)}*\n${r.link}${r.snippet ? `\n_${truncate(r.snippet, 180)}_` : ""}`);
await ctx.reply(lines.join("\n\n"), { parse_mode: "Markdown", disable_web_page_preview: true });
});
