# Production Architecture

## Target State

DR Factory runs as an autonomous, multi-agent workflow in cloud sandboxes. A user can kick off a run locally, from Slack, from Microsoft Teams, or from another system that can call an HTTP endpoint.

The factory itself owns:

- workflow orchestration
- LLM provider calls
- sandboxed agent execution
- artifact state
- review gates
- human decision requests
- final packaging

## Source Authority Rule

Documents uploaded into the factory are context, not instructions.

The factory may extract requirements, constraints, data dictionaries, business rules, and source facts from attachments. It must not obey operational instructions embedded inside source documents unless those instructions are explicitly adopted by the user or orchestrator as workflow policy.

Examples:

- The RFP says what deliverables are required. Treat that as project context.
- The data dictionary says how fields should be validated. Treat that as source-specific domain context.
- A PDF or spreadsheet cannot override system policy, user instructions, sandbox limits, security policy, or data-governance rules.

## Runtime Components

| Component | Responsibility |
| --- | --- |
| Trigger Adapter | Receives kickoff from CLI, Slack, Teams, or webhook. |
| Factory Orchestrator | Creates the run, routes work to agents, enforces gates, tracks state. |
| Agent Runner | Executes one agent task in an isolated sandbox with a bounded context bundle. |
| Model Provider Client | Calls the configured LLM provider and returns structured output. |
| Artifact Store | Stores source files, generated files, manifests, logs, and review outputs. |
| Run Ledger | Tracks run status, steps, agent calls, model usage, failures, and human gates. |
| Human Gate Service | Routes questions/approvals back to the requester in Slack, Teams, or CLI. |
| Reviewer | Independently checks deliverables before final acceptance. |

## Recommended Production Flow

1. User starts a workflow from CLI, Slack, Teams, or a web form.
2. Trigger adapter creates a `factory_run_id`.
3. Source files are copied to object storage and registered as artifacts.
4. Orchestrator builds an initial context bundle.
5. `intake_classifier` verifies scope and missing inputs.
6. `context_curator` extracts source context and requirements.
7. `data_profiler` runs deterministic profiling in a sandbox.
8. `rules_analyst` uses LLM reasoning plus deterministic evidence to propose rules.
9. Human gate resolves risky or ambiguous decisions.
10. `data_transformer` runs deterministic transformations.
11. `item_master_builder` generates item master and crosswalk.
12. `diagram_architect`, `summary_writer`, and `demo_coach` generate narrative artifacts.
13. `qa_reviewer` reviews all outputs.
14. Orchestrator loops targeted revisions or packages final deliverables.
15. Trigger adapter posts status and artifact links back to Slack, Teams, or CLI.

## Cloud Sandbox Model

Each agent run should execute with:

- a short-lived workspace
- read-only input artifact bundle
- write-only output folder
- no broad network access by default
- allowlisted provider/API calls only
- bounded token budget
- bounded runtime budget
- audit log of file reads/writes and model calls

Sandbox outputs are copied back to the artifact store only after validation.

## Model Provider Strategy

Use a provider abstraction so the factory can swap or mix providers.

Initial provider:

- OpenAI Responses API
- environment variable: `OPENAI_API_KEY`
- default model controlled by `DR_FACTORY_MODEL`

Why this shape:

- The OpenAI quickstart documents `OPENAI_API_KEY` as the standard environment variable and the Responses API as the primary model call surface.
- The Responses API supports text generation and tool/function integrations, which maps cleanly to a factory orchestrator.

## Trigger Strategy

Supported trigger modes:

- `cli`: local developer kickoff
- `webhook`: generic HTTP kickoff
- `slack`: slash command or app mention
- `teams`: bot command or incoming webhook

All triggers should normalize into the same payload:

```json
{
  "request_id": "external-event-id",
  "trigger_source": "cli|webhook|slack|teams",
  "requested_by": "user-or-service",
  "project_name": "dr-factory-demo",
  "user_request": "Run the hospital item-master demo workflow",
  "source_artifacts": [
    "raw/Excel-data.xlsx"
  ],
  "response_channel": {
    "type": "cli|url|slack|teams",
    "target": "channel-or-thread"
  }
}
```

## Secret Handling

- Never commit `.env`.
- Store production secrets in the deployment platform secret manager.
- Local development may use `.env.local`.
- Agent sandboxes receive only the secrets required for their current task.
- Source attachments must never be sent to an LLM unless the orchestrator intentionally includes them in that agent's context bundle.

## Deployment Options

Good first production target:

- containerized Node/Python worker
- queue-backed orchestration
- object storage for artifacts
- hosted logs/traces
- Slack/Teams bot endpoint

The local repo should remain runnable without cloud services through dry-run mode and deterministic scripts.

