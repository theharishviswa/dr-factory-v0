import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const requestPath = process.argv[2];

if (!requestPath) {
  console.error("Usage: node agent/tools/kickoff_factory_run.mjs <request.json>");
  process.exit(2);
}

const request = JSON.parse(await BunOrNodeReadText(requestPath));
const factoryRunId = `run_${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`;
const runDir = resolve("work/runs", factoryRunId);

await mkdir(runDir, { recursive: true });
await writeFile(resolve(runDir, "request.json"), `${JSON.stringify(request, null, 2)}\n`, "utf8");
await writeFile(
  resolve(runDir, "status.json"),
  `${JSON.stringify(
    {
      factory_run_id: factoryRunId,
      status: "accepted",
      created_at: new Date().toISOString(),
      trigger_source: request.trigger_source ?? "cli",
      requested_by: request.requested_by ?? "unknown",
      next_step: "Run deterministic workflow or autonomous subagent calls."
    },
    null,
    2
  )}\n`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      factory_run_id: factoryRunId,
      status: "accepted",
      run_dir: `work/runs/${factoryRunId}`
    },
    null,
    2
  )
);

async function BunOrNodeReadText(path) {
  const { readFile } = await import("node:fs/promises");
  return readFile(path, "utf8");
}

