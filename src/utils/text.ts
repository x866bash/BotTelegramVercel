export function truncate(s: string, max = 350) {
return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
