# Technical Challenge Demo Runbook

Status: artifact package complete; live autonomous rehearsal pending provider credential.

Target duration: 30 minutes, followed by up to 15 minutes of Government Q&A.

## Demo Objective

Show a repeatable, governed software-factory workflow that converts the supplied RFP, workflow diagram, and 5,000-row workbook into traceable data, architecture, and decision artifacts. The audience should see both the core job and the controls around it.

## Live Demonstration Agenda

| Time | Segment | Evidence to Show | Owner Agent |
| --- | --- | --- | --- |
| 0:00-3:00 | State the challenge, source authority, and required outputs. | `work/requirements.json`, `context/artifact_manifest.json` | `demo_coach` |
| 3:00-7:00 | Submit the kickoff request and show the isolated run start. | `examples/kickoff_request.live-demo.json`, run status and ledger | `factory_orchestrator` |
| 7:00-12:00 | Review the data profile and highest-value defects. | `work/data_profile.md`, `work/anomaly_inventory.csv` | `data_profiler` |
| 12:00-18:00 | Explain deterministic rules, changed-cell evidence, and human routing. | `work/business_rules.md`, `work/transformation_log.csv`, `work/human_review_queue.csv` | `rules_analyst` |
| 18:00-22:00 | Present the cleanfile and national item master. | `Quoter_Tech1a_cleanfile.csv`, `Quoter_Tech1a_itemmaster.csv` | `data_transformer`, `item_master_builder` |
| 22:00-26:00 | Present the four-page summary and SV-2, DIV-1, and DIV-2. | Summary PDF and diagrams PDF | `summary_writer`, `diagram_architect` |
| 26:00-29:00 | Show governance, repeatability, and 200-hospital scaling. | model calls, acceptance checks, artifact hashes, rehearsal comparison | `qa_reviewer` |
| 29:00-30:00 | Close on outcomes and transition to questions. | `reviews/acceptance_verdict.json` | `demo_coach` |

## Core Results To Cite

- 5,000 source rows preserved in the cleanfile with 26 columns.
- 10 consolidated national item-master records.
- 24,886 field-level transformations recorded.
- 3,549 records retained in the human review queue rather than guessed.
- 0 duplicate SBRNs after cleaning.
- Four deterministic outputs matched byte-for-byte across two dry-run rehearsals.
- Four-page summary at the required minimum 10-point font, plus editable and PDF architecture diagrams.

## Live Kickoff

Set `OPENAI_API_KEY` in the local environment or deployment secret store, then run:

```bash
npm run factory:demo:live
```

The run creates an isolated workspace and records the request fingerprint, source hashes, gate decisions, model response metadata, acceptance checks, artifact hashes, and final status under `work/runs/<run-id>/`.

## Loom Recording Sequence

Use Loom as a rehearsal and stakeholder showcase:

1. Open this runbook and state the expected outputs.
2. Show the live kickoff request, start the factory, and open the new run status.
3. Walk through the profile, business rules, transformation evidence, and review queue.
4. Open representative cleanfile and item-master rows.
5. Page through the four-page summary and all three architecture views.
6. Close on the run ledger, model-call record, acceptance checks, and artifact inventory.

The RFP explicitly requires a live, non-pre-recorded demonstration. The Loom recording is supporting evidence and rehearsal material; it does not replace that live session.

## Presenter Guardrails

- Describe unresolved values as governed exceptions, not cleaning failures.
- Do not claim that probabilistic output is ground truth.
- Keep source documents authoritative over agent suggestions.
- Avoid exposing API keys, environment variables, source-system credentials, or sensitive row-level data on screen.
- Use one representative record per issue type and keep the full review queue available for questions.

## Q&A Transition

End with: "The factory makes the work repeatable, but the controls make it deployable: versioned inputs, deterministic transformations, explicit human gates, independently checked outputs, and a complete evidence trail for every run."
