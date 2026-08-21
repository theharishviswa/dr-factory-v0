import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function loadProviderConfig() {
  const config = JSON.parse(await readFile(resolve("config/model_providers.json"), "utf8"));
  const providerName = process.env.DR_FACTORY_PROVIDER ?? config.default_provider;
  const provider = config.providers[providerName];

  if (!provider) {
    throw new Error(`Unknown model provider: ${providerName}`);
  }

  return { providerName, provider };
}

export async function callModel({ instructions, input, metadata = {} }) {
  const mode = process.env.DR_FACTORY_MODE ?? "dry-run";
  const { providerName, provider } = await loadProviderConfig();
  const model = process.env[provider.default_model_env] ?? provider.default_model;

  if (mode === "dry-run") {
    return {
      provider: providerName,
      model,
      mode,
      output_text: [
        "DRY RUN: no provider call was made.",
        `Agent: ${metadata.agent_name ?? "unknown"}`,
        "The runtime assembled instructions and input successfully."
      ].join("\n")
    };
  }

  if (mode !== "live") {
    throw new Error(`Unsupported DR_FACTORY_MODE: ${mode}`);
  }

  const apiKey = process.env[provider.api_key_env];
  if (!apiKey) {
    throw new Error(`Missing ${provider.api_key_env}. Set it for live provider calls.`);
  }

  const response = await fetch(`${provider.base_url}${provider.responses_path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: instructions
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: input
            }
          ]
        }
      ],
      metadata,
      store: false,
      max_output_tokens: Number(process.env.DR_FACTORY_MAX_OUTPUT_TOKENS ?? provider.max_output_tokens ?? 6000)
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Provider call failed: ${response.status} ${body.slice(0, 1000)}`);
  }

  const payload = await response.json();
  const result = {
    provider: providerName,
    model,
    mode,
    response_id: payload.id,
    output_text: payload.output_text ?? extractOutputText(payload),
    usage: payload.usage ?? null,
    service_tier: payload.service_tier ?? null
  };

  if (process.env.DR_FACTORY_CAPTURE_RAW_MODEL_RESPONSE === "true") {
    result.raw = payload;
  }

  return result;
}

function extractOutputText(payload) {
  const parts = [];
  for (const item of payload.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.text) {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n");
}
