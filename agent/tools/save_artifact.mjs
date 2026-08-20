import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [artifactId, artifactType, artifactPath, source, summary] = process.argv.slice(2);

if (!artifactId || !artifactType || !artifactPath || !source || !summary) {
  console.error("Usage: node agent/tools/save_artifact.mjs <artifact_id> <artifact_type> <path> <source> <summary>");
  process.exit(1);
}

const manifestPath = resolve("context/artifact_manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const existingIndex = (manifest.artifacts ?? []).findIndex((entry) => entry.artifact_id === artifactId);
const now = new Date().toISOString();
const entry = {
  artifact_id: artifactId,
  artifact_type: artifactType,
  path: artifactPath,
  source,
  created_at: now,
  created_by_agent: "factory_orchestrator",
  version: "0.1.0",
  dependencies: [],
  summary,
  acceptance_status: "draft"
};

if (existingIndex >= 0) {
  manifest.artifacts[existingIndex] = {
    ...manifest.artifacts[existingIndex],
    ...entry
  };
} else {
  manifest.artifacts.push(entry);
}

await mkdir(dirname(resolve(artifactPath)), { recursive: true });
await writeFile(resolve(artifactPath), `# ${artifactId}\n\n${summary}\n`, "utf8");
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Saved artifact ${artifactId} at ${artifactPath}`);

