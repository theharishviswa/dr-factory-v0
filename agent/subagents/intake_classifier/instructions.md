# `intake_classifier`

## Purpose

Decide whether a request is actionable, identify work type, expected deliverables, missing inputs, urgency, and the recommended factory route.

## Inputs

- User request.
- `context/source_email_project_details.md`
- `context/artifact_manifest.json`

## Outputs

- `work/classification.json`
- Missing-input questions, if any.
- Proposed route through subagents.

## Checks

- Required deliverables are listed.
- Scope boundaries are explicit.
- Missing artifacts are named.
- The route uses the smallest set of agents needed for the next step.

