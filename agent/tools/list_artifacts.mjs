import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const manifestPath = resolve("context/artifact_manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

for (const artifact of manifest.artifacts ?? []) {
  const status = artifact.acceptance_status ?? "unknown";
  console.log(`${artifact.artifact_id}\t${artifact.artifact_type}\t${status}\t${artifact.path}`);
}

