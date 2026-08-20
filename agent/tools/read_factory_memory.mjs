import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const topic = process.argv[2];

if (topic) {
  console.log(await readFile(resolve("factory_memory", `${topic}.md`), "utf8"));
} else {
  const files = await readdir(resolve("factory_memory"));
  for (const file of files.filter((name) => name.endsWith(".md"))) {
    console.log(file);
  }
}

