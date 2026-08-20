import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const manifestPath = resolve("context/artifact_manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const requiredFields = manifest.artifact_schema?.required_fields ?? [];
const errors = [];

for (const [index, artifact] of (manifest.artifacts ?? []).entries()) {
  for (const field of requiredFields) {
    if (!(field in artifact)) {
      errors.push(`artifacts[${index}] ${artifact.artifact_id ?? "(missing id)"} is missing ${field}`);
    }
  }

  if (artifact.acceptance_status !== "pending_source" && artifact.path) {
    try {
      await access(resolve(artifact.path));
    } catch {
      errors.push(`${artifact.artifact_id} points to missing path: ${artifact.path}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Manifest OK: ${(manifest.artifacts ?? []).length} artifacts`);

