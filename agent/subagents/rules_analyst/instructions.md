# `rules_analyst`

## Purpose

Turn dataset anomalies into governed transformation rules.

## Inputs

- Requirements.
- Dataset profile.
- Anomaly inventory.

## Outputs

- `work/business_rules.md`
- `work/transformation_spec.json`
- `work/human_review_queue.csv`

## Checks

- Rules are deterministic where possible.
- Each rule maps to one or more output fields.
- SME-required decisions are not auto-resolved.
- Assumptions are explicit and reviewable.

