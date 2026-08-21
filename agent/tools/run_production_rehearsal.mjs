import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runFactory } from "../runtime/factory_orchestrator.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const baseRequest = JSON.parse(await readFile(resolve(ROOT, "examples/kickoff_request.production-rehearsal.json"), "utf8"));
const rehearsalId = `rehearsal_${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`;

const first = await runFactory({ ...baseRequest, request_id: `${baseRequest.request_id}-a` });
const second = await runFactory({ ...baseRequest, request_id: `${baseRequest.request_id}-b` });

const firstInventory = JSON.parse(await readFile(resolve(first.runDir, "artifact_inventory.json"), "utf8"));
const secondInventory = JSON.parse(await readFile(resolve(second.runDir, "artifact_inventory.json"), "utf8"));
const secondByPath = new Map(secondInventory.map((item) => [item.path, item]));
const comparisons = firstInventory
  .filter((item) => item.deterministic)
  .map((item) => ({
    path: item.path,
    first_sha256: item.sha256,
    second_sha256: secondByPath.get(item.path)?.sha256 ?? null,
    identical: item.sha256 === secondByPath.get(item.path)?.sha256
  }));

const report = {
  schema_version: "1.0",
  rehearsal_id: rehearsalId,
  mode: baseRequest.mode,
  first_run_id: first.runId,
  second_run_id: second.runId,
  both_completed: first.success && second.success,
  deterministic_outputs_identical: comparisons.every((item) => item.identical),
  comparisons,
  governance_evidence_present: [first, second].every((run) => Boolean(run.status?.factory_run_id)),
  note: "LLM-authored prose is quality-checked and traced, not required to be byte-identical."
};

const outputPath = resolve(ROOT, "work/rehearsals", `${rehearsalId}.json`);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ output_path: outputPath, ...report }, null, 2));
