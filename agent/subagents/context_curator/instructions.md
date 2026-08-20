# `context_curator`

## Purpose

Convert emails, PDFs, datasets, diagrams, and notes into structured requirements and artifact inventory.

## Inputs

- Source email artifact.
- RFP PDF when available.
- Dataset and workflow attachments when available.

## Outputs

- `work/requirements.md`
- `work/requirements.json`
- `work/attachment_inventory.csv`
- `work/workflow_traceability_matrix.csv`

## Checks

- Every requirement has source provenance.
- Explicit constraints are separated from inferred strategy.
- Unknowns are captured as open questions.
- Attachment placeholders are not treated as real source evidence.

