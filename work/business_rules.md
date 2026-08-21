# Business Rules

Created by: `rules_analyst`

## Deterministic Rules Applied

- Trim leading/trailing whitespace and collapse repeated spaces in text fields.
- Preserve `SBRN` unchanged.
- Normalize unit of measure variants to `BOX`, `EA`, `UNIT`, `BAG`, or `PACK`.
- Normalize known manufacturer aliases into canonical MedSupply, SurgiTech, and HealthCorp families.
- Normalize known vendor aliases including `GlobalMed Inc` to `GlobalMed` and `Health Equip DirecT` to `HealthEquip Direct`.
- Normalize part-name typo/abbreviation variants such as `Antiseptc Wipes`, `IV BG 500ml`, `Scalpel Sz10`, `Therm Digital`, and `Surg Gloves`.
- Derive missing part names from the prefix of `Part Description` when available.
- Normalize order statuses to data-dictionary vocabulary: `Pending`, `Delivered`, `Shipped`, `Canceled`.
- Normalize missing recall status to `None`; normalize `Active Recall` to `Active`.
- Convert purchase and expiration dates to ISO `YYYY-MM-DD`.
- Add `NationalItemMasterId` for item-master traceability.
- Add `DataQualityFlags` and `HumanReviewRequired` rather than hiding unresolved issues.

## Governance Rules

- Future purchase dates require SME/data-governance review.
- Expiration dates before purchase dates require SME/data-governance review.
- `Monitoring` recall status requires governance because the data dictionary allows only `None`, `Active`, and `Cleared`.
- Expired items are flagged so operational stakeholders can decide whether they remain in item-master scope.
