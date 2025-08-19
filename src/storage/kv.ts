import { env } from "../config";


type Store = {
set: (k: string, v: unknown) => Promise<void>;
get: <T>(k: string) => Promise<T | null>;
del: (k: string) => Promise<void>;
};


// Minimal REST KV client (Vercel KV-compatible)
async function kvFetch(path: string, init?: RequestInit) {
if (!env.VERCEL_KV_REST_URL || !env.VERCEL_KV_REST_TOKEN) return null;
const url = `${env.VERCEL_KV_REST_URL}${path}`;
const res = await fetch(url, {
...init,
headers: {
Authorization: `Bearer ${env.VERCEL_KV_REST_TOKEN}`,
"Content-Type": "application/json",
...(init?.headers || {}),
},
});
if (!res.ok) throw new Error(`KV error ${res.status}`);
return res;
}


const memory = new Map<string, unknown>();


export const store: Store = {
async set(k, v) {
// Try KV
if (env.VERCEL_KV_REST_URL && env.VERCEL_KV_REST_TOKEN) {
await kvFetch(`/set/${encodeURIComponent(k)}`, {
method: "POST",
body: JSON.stringify({ value: v }),
});
} else {
memory.set(k, v);
}
},
async get(k) {
if (env.VERCEL_KV_REST_URL && env.VERCEL_KV_REST_TOKEN) {
const res = await kvFetch(`/get/${encodeURIComponent(k)}`);
if (!res) return null;
const data = await res.json();
return (data?.result ?? null) as any;
} else {
return (memory.get(k) as any) ?? null;
}
},
async del(k) {
if (env.VERCEL_KV_REST_URL && env.VERCEL_KV_REST_TOKEN) {
await kvFetch(`/del/${encodeURIComponent(k)}`, { method: "POST" });
} else {
memory.delete(k);
}
},
};
```
