import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const artifactId = process.argv[2];

if (!artifactId) {
  console.error("Usage: node agent/tools/read_artifact.mjs <artifact_id>");
  process.exit(1);
}

const manifest = JSON.parse(await readFile(resolve("context/artifact_manifest.json"), "utf8"));
const artifact = (manifest.artifacts ?? []).find((entry) => entry.artifact_id === artifactId);

if (!artifact) {
  console.error(`Artifact not found: ${artifactId}`);
  process.exit(1);
}

console.log(await readFile(resolve(artifact.path), "utf8"));

