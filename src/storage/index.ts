import { store } from "./kv";


// Namespaced keys
const K = (ns: string, id: string) => `${ns}:${id}`;


export type WelcomeFarewell = { welcome?: string; farewell?: string };
export type AntiSpamConfig = { enabled: boolean; perWindow: number; windowSec: number; badWords: string[]; blockLinks: boolean };


export async function getWelcomeFarewell(chatId: number): Promise<WelcomeFarewell> {
return (await store.get<WelcomeFarewell>(K("wf", String(chatId)))) ?? {};
}
export async function setWelcome(chatId: number, text: string) {
const cur = await getWelcomeFarewell(chatId);
cur.welcome = text;
await store.set(K("wf", String(chatId)), cur);
}
export async function setFarewell(chatId: number, text: string) {
const cur = await getWelcomeFarewell(chatId);
cur.farewell = text;
await store.set(K("wf", String(chatId)), cur);
}


export type Member = { id: number; username?: string; first_name?: string; last_name?: string; joined_at: number };
export type MembersState = { [userId: string]: Member };


export async function addMember(chatId: number, m: Member) {
const key = K("members", String(chatId));
const cur = (await store.get<MembersState>(key)) ?? {};
cur[m.id] = m;
await store.set(key, cur);
}


export async function removeMember(chatId: number, userId: number) {
const key = K("members", String(chatId));
const cur = (await store.get<MembersState>(key)) ?? {};
delete cur[userId];
await store.set(key, cur);
}


export async function exportMembers(chatId: number) {
const key = K("members", String(chatId));
return (await store.get<MembersState>(key)) ?? {};
}


export async function getAntiSpam(chatId: number): Promise<AntiSpamConfig> {
return (await store.get<AntiSpamConfig>(K("antispam", String(chatId)))) ?? { enabled: true, perWindow: 5, windowSec: 10, badWords: ["spam", "scam"], blockLinks: true };
}
export async function setAntiSpam(chatId: number, cfg: Partial<AntiSpamConfig>) {
const cur = await getAntiSpam(chatId);
await store.set(K("antispam", String(chatId)), { ...cur, ...cfg });
}
