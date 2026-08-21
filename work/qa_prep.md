# Technical Challenge Q&A Prep

Status: ready for the 15-minute Government Q&A period.

## How did you decide what to automate versus route to SME review?

We automated changes supported by the data dictionary, deterministic normalization rules, and repeatable evidence. We did not guess on ambiguous clinical, supply-chain, or financial meanings. Those cases remain traceable in the 3,549-record human review queue with the triggering rule and source identifier.

## What did the factory actually change?

It preserved all 5,000 source rows, produced a 26-column cleanfile, logged 24,886 field-level transformations, eliminated duplicate SBRNs, and consolidated the data into a 10-record national item master. The transformation log provides before/after evidence for each changed field.

## Why is the review queue so large?

The queue counts records requiring at least one governance decision; it is not a discarded-record count. Multiple ambiguity classes are intentionally preserved, including unsupported recall status, future purchase dates, and expiration-before-purchase dates. The production pattern is to resolve exception classes in batches, version the approved rule, and replay the affected records.

## How would this scale from 10 hospitals to approximately 200?

Use a versioned canonical schema and rules registry, onboard hospitals in waves, profile every feed, and measure exceptions by facility. Deterministic work runs in parallel containers; ambiguous mappings enter role-based review queues. Regression tests and acceptance gates run before rules are promoted, while run-level hashes and lineage support audit and replay.

## How did AI affect the work?

AI supports context synthesis, rule critique, architecture drafting, summary generation, and independent review. Deterministic code performs the record-level transformation. Each agent receives bounded source artifacts, and the factory records provider/model metadata and outputs. Human gates remain responsible for source acceptance, business-rule approval, SME decisions, and final package acceptance.

## How do you prevent hallucinated rules?

Source artifacts are explicitly authoritative. Agents cannot silently promote a suggestion into a transformation rule. A new rule requires evidence, versioning, review, and regression checks; uncertain values are preserved and routed rather than fabricated.

## How do the diagrams connect to the cleaned data?

SV-2 maps the resource exchanges among EHR, EIMS, and FMS. DIV-1 defines the business concepts and relationships. DIV-2 maps those concepts to the actual cleanfile and item-master fields. The traceability matrix connects each required view to its source and final artifact.

## How do you prove repeatability?

Two complete dry-run rehearsals produced four deterministic outputs with identical SHA-256 hashes. A live run adds model-call metadata, source hashes, gate decisions, acceptance checks, and output hashes to the same evidence structure. LLM prose is governed by review criteria rather than required to be byte-identical.

## What remains before the formal demonstration?

Run one full live rehearsal with the provider key supplied through a local environment variable or secret manager, review the evidence bundle, and rehearse the 30-minute presentation. The Loom recording supports preparation, but the RFP demonstration itself must be live and non-pre-recorded.
