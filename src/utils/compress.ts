export async function strToGzipBuffer(name: string, content: string) {
const stream = new CompressionStream("gzip");
const writer = (new Blob([content]).stream()).pipeThrough(stream);
const buf = await new Response(writer).arrayBuffer();
return { filename: name.endsWith(".gz") ? name : `${name}.gz`, data: Buffer.from(buf) } as const;
}
