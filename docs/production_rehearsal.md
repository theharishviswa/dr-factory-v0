# Production Rehearsal

## Objective

Demonstrate the core RFP job as a repeatable, governed factory run rather than a collection of manually invoked scripts.

The rehearsal executes the same request twice in separate run workspaces and proves that deterministic data artifacts are byte-identical. LLM-authored artifacts are traced and quality-checked rather than required to be textually identical.

## Run It

No API key is required for the complete control-plane rehearsal:

```bash
python3 -m pip install -r requirements.txt
npm run factory:rehearse
```

Set `DR_FACTORY_PYTHON` when the dependencies are installed in a non-default Python runtime.

For autonomous provider calls, change `mode` to `live` in `examples/kickoff_request.production-rehearsal.json`, set `OPENAI_API_KEY`, and run the same command.

## Evidence Produced Per Run

Each run is isolated under `work/runs/<factory_run_id>/` and contains:

- `request.json`: normalized request from CLI, Slack, Teams, or webhook.
- `input_inventory.json`: input paths, sizes, and SHA-256 hashes.
- `status.json`: current state and acceptance result.
- `run_ledger.jsonl`: ordered events for steps, agents, gates, and quality checks.
- `model_calls.json`: agent, provider, model, response ID, usage, and output path.
- `acceptance_checks.json`: machine-readable quality checks.
- `artifact_inventory.json`: output sizes and hashes.
- `evidence_bundle.json`: top-level audit index.
- `sandbox/`: isolated working copy containing generated artifacts.

The two-run comparison is written to `work/rehearsals/<rehearsal_id>.json`.

The checked-in result from the initial successful rehearsal is `reviews/production_rehearsal_result.json`. It is explicitly labeled as a control-plane proof, not a submission-ready live run.

## Demonstration Script

1. Show the kickoff request and explain that every channel normalizes to the same contract.
2. Start `npm run factory:rehearse`.
3. Open the first run ledger to show deterministic and LLM stations executing in order.
4. Show the four recorded gates and explain that rehearsal policy auto-approves them while production policy pauses for named approvers.
5. Open the human review queue to show unresolved dates and recall states remain visible.
6. Open the model-call record to show model, response ID, token usage, and output lineage.
7. Open the rehearsal comparison to prove deterministic output hashes match across independent runs.
8. Open the sandbox deliverables to walk from source data to cleanfile, item master, summary, and reviewer findings.

## Enterprise Controls Demonstrated

| Control | Rehearsal proof |
| --- | --- |
| Repeatability | Two isolated runs and SHA-256 comparison of deterministic outputs. |
| Traceability | Request, input, step, agent, model-call, gate, and artifact records share one run ID. |
| Human accountability | Named gates and an explicit human-review queue. |
| Source safety | Attachments are registered as context and cannot override factory instructions. |
| Data minimization | Agents receive bounded artifact lists; provider response storage is disabled by default. |
| Independent review | `qa_reviewer` runs after builders and produces a separate review artifact. |
| Bounded execution | Model output tokens are capped; cloud deployment adds time, cost, and network limits. |

## Remaining Productionization Work

The rehearsal proves the workflow contract and evidence model. An enterprise deployment still needs a queue-backed orchestrator, object storage with retention policies, secret-manager integration, identity/RBAC, signed approval callbacks, tenant isolation, observability, budget enforcement, and Slack/Teams adapters.

Before a customer-facing RFP submission, the summary must be rendered and checked as a four-page PDF or DOCX, and the SV-2/DIV-1/DIV-2 package must be generated and visually reviewed.
