# Enterprise Validation Plan

## Goal

Prove that the RFP workflow is repeatable, governable, recoverable, secure, and operable when many users trigger it through local, Slack, Teams, or API channels.

Do not present a control-plane dry run as a production validation. Promote the factory through the following gates with retained evidence.

## Validation Gates

| Gate | Test | Pass criteria | Evidence |
| --- | --- | --- | --- |
| 1. Deterministic core | Run the same frozen inputs twice. | Cleanfile, item master, transformation log, and review queue hashes match. | Two evidence bundles and comparison report. |
| 2. Live agents | Run all five LLM stations with a pinned model and prompt versions. | Every call completes; response IDs and usage are recorded; outputs pass artifact checks. | Model-call ledger and generated artifacts. |
| 3. Human governance | Use `require_human` policy and approve/reject each gate through a signed callback. | No gated step proceeds without authorization; actor and decision are auditable. | Gate events and identity record. |
| 4. Quality | Render summary and diagrams and review them independently. | Four-page/font constraint passes; SV-2, DIV-1, and DIV-2 are present and traceable; no unsupported claims. | Rendered files, visual QA, reviewer verdict. |
| 5. Failure recovery | Inject provider timeout/429, worker termination, malformed input, and storage interruption. | Retry policy is bounded; no duplicate artifacts; run resumes or fails clearly. | Fault-injection report and final run state. |
| 6. Idempotency | Submit the same external event repeatedly and concurrently. | One logical run is created per idempotency key; callers receive the same run ID. | Trigger log and run registry. |
| 7. Security | Test document prompt injection, path traversal, secret leakage, oversized files, and forbidden network access. | Attacks are rejected or contained; no secret appears in prompts, outputs, or logs. | Security test report and redacted traces. |
| 8. Load | Exercise representative concurrent runs and attachment sizes. | Meets agreed queue wait, completion time, error rate, and cost-per-run limits. | Load report, traces, and cost dashboard. |
| 9. Channel parity | Trigger the same request through CLI, Slack, Teams, and API. | All channels normalize to the same request contract and return equivalent status/artifact links. | Request samples and channel transcripts. |
| 10. Operations | Exercise cancel, retry, approval timeout, retention expiry, and incident investigation. | Operators can explain and control every run without editing storage directly. | Runbook exercise and audit export. |

## RFP Golden Dataset

Freeze the following as the first regression fixture:

- Source workbook SHA-256 from `input_inventory.json`.
- Expected source rows: 5,000.
- Expected cleanfile rows: 5,000.
- Expected cleanfile columns: 26.
- Expected item-master rows: 10.
- Expected human-review records: 3,549.
- Expected deterministic hashes from `reviews/production_rehearsal_result.json`.

Any intentional rule change must update the fixture through a reviewed change record that explains why the expected output changed.

## Initial Service Objectives

Use these as starting targets and revise after observing real workloads:

- Trigger acknowledgment: p95 under 2 seconds.
- Run-state event durability: 100 percent after acknowledgment.
- Deterministic stage success: at least 99.5 percent excluding invalid input.
- Duplicate logical runs from repeated trigger events: zero.
- Trace completeness: 100 percent of runs have input hashes, step events, model-call records, gate decisions, output hashes, and final status.
- Secret leakage in stored prompts, outputs, or logs: zero.
- Unbounded provider retry loops: zero.

Do not set a final end-to-end latency or cost objective until live model and document-rendering measurements exist.

## Showcase Sequence

1. Kick off the frozen RFP request from a chat channel or CLI.
2. Show the run ID and input fingerprints immediately.
3. Follow the ledger through profiling, governed rules, deterministic transformation, specialist drafting, and independent review.
4. Pause on a human gate and show the decision returning to the same run.
5. Open the cleanfile, item master, summary, and diagrams from the isolated run workspace.
6. Trace one dirty source record through its transformation log, national item mapping, quality flags, and review disposition.
7. Open the second-run comparison and show matching deterministic hashes.
8. End with the audit bundle and the operational dashboard: duration, model usage, cost, failures, and outstanding human decisions.

## Production Exit Criteria

The factory is ready for a limited production pilot when Gates 1 through 7 and 9 pass, the customer-facing artifacts pass Gate 4, and ownership exists for approvals, incidents, retention, and model/prompt changes. Gate 8 establishes the permitted pilot concurrency and attachment limits.
