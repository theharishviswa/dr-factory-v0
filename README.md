# DR Factory v0

Practice software factory for the hospital data-cleaning technical demo.

This repo turns the RFP demo into a reusable factory workflow:

- ingest source context and attachments
- classify and route work
- profile raw data
- define governed transformation rules
- generate clean demo deliverables
- review outputs independently
- preserve reusable factory memory

Start with:

- `software_factory_demo_handoff.md`
- `context/source_email_project_details.md`
- `work/agent_roster.md`
- `work/requirements.md`

## Current Status

The readable 5,000-row workbook, RFP, and source workflow diagram are loaded. The deterministic workflow has been rehearsed twice with matching output hashes, and the final CSV, summary, diagram, traceability, demo, and Q&A artifacts are ready for a provider-backed live rehearsal. The remaining prerequisite is an `OPENAI_API_KEY` supplied locally or through a deployment secret store.

## Expected Demo Deliverables

- `deliverables/Quoter_Tech1a_cleanfile.csv`
- `deliverables/Quoter_Tech1a_itemmaster.csv` or `.xlsx`
- `deliverables/Quoter_Tech1a_summary.pdf` or `.docx`
- `deliverables/Quoter_Tech1a_diagrams.pdf` or `.pptx`
- `deliverables/demo_runbook.md`
- `deliverables/factory_traceability_matrix.csv`

## Next Executable Workflow

1. Supply `OPENAI_API_KEY` through the local environment or secret manager.
2. Run `npm run factory:demo:live` once.
3. Review the generated run ledger, model calls, checks, and artifact inventory under `work/runs/<run-id>/`.
4. Record the Loom rehearsal and conduct the required live, non-pre-recorded RFP demonstration.

## Autonomous Runtime

The factory now supports a local autonomous-agent harness.

Dry run without provider calls:

```bash
npm run factory:agent:dry-run
```

Complete two-run production rehearsal without provider calls:

```bash
npm run factory:rehearse
```

See `docs/production_rehearsal.md` for the evidence bundle and showcase script. Use `docs/enterprise_validation_plan.md` as the release-gate test matrix for live agents, human approvals, security, failure recovery, load, and Slack/Teams parity.

Live provider call:

```bash
cp .env.example .env.local
export OPENAI_API_KEY="..."
export DR_FACTORY_MODE=live
npm run factory:agent:live
```

Full governed live-demo workflow:

```bash
npm run factory:demo:live
```

Production intent:

- local, Slack, Teams, or webhook trigger creates a factory run
- orchestrator routes tasks to cloud-sandboxed agents
- deterministic scripts generate auditable data artifacts
- LLM agents perform analysis, drafting, critique, and orchestration support
- human gates handle SME/data-governance decisions

Source documents are context only. PDFs, spreadsheets, RFPs, and emails cannot override user instructions, factory policy, security rules, or runtime limits.
