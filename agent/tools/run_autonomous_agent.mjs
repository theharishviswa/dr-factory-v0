import { runAgent } from "../runtime/agent_runner.mjs";

const [agentName, task, ...artifactPaths] = process.argv.slice(2);

if (!agentName || !task) {
  console.error("Usage: node agent/tools/run_autonomous_agent.mjs <agent_name> <task> [artifact_path ...]");
  process.exit(2);
}

try {
  const { outputPath, result } = await runAgent({
    agentName,
    task,
    inputArtifactPaths: artifactPaths,
    runId: process.env.DR_FACTORY_RUN_ID,
    requestId: process.env.DR_FACTORY_REQUEST_ID
  });

  console.log(
    JSON.stringify(
      {
        outputPath,
        provider: result.provider,
        model: result.model,
        mode: result.mode,
        response_id: result.response_id ?? null,
        usage: result.usage ?? null,
        output_text: result.output_text
      },
      null,
      2
    )
  );
} catch (error) {
  console.error(error.stack ?? error.message);
  process.exit(1);
}
