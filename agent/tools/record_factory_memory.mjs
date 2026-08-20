import { appendFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [topic, ...bodyParts] = process.argv.slice(2);
const body = bodyParts.join(" ");

if (!topic || !body) {
  console.error("Usage: node agent/tools/record_factory_memory.mjs <topic> <memory text>");
  process.exit(1);
}

const path = resolve("factory_memory", `${topic}.md`);
await mkdir(dirname(path), { recursive: true });
await appendFile(path, `\n## ${new Date().toISOString()}\n\n${body}\n`, "utf8");
console.log(`Recorded factory memory: factory_memory/${topic}.md`);

