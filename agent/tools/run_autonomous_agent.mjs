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
    inputArtifactPaths: artifactPaths
  });

  console.log(
    JSON.stringify(
      {
        outputPath,
        provider: result.provider,
        model: result.model,
        mode: result.mode,
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

