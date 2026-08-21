# Data Profile

Created by: `data_profiler`

Source workbook: `raw/Excel-data.xlsx`
Dataset rows: 5,000
Dataset columns: 23
Hospitals: 10
Data dictionary fields: 23

## Sheet Names

- `Hosptual A-J`
- `Data Dictionay`

## Column Inventory

| Column | Non-null | Null | Example |
| --- | ---: | ---: | --- |
| `SBRN` | 5,000 | 0 | SBRN0001; SBRN0002; SBRN0003 |
| `Hospital` | 5,000 | 0 | Hospital A; Hospital A; Hospital A |
| `FieldItemMasterNumber` | 5,000 | 0 | ZD7018VO; UW1644DT; UW1644DT |
| `Part Name` | 4,994 | 6 | Antiseptc Wipes; Antiseptic Wipes; Antiseptic Wipes |
| `Part Description` | 5,000 | 0 | Antiseptic Wipes - Generic; Antiseptic Wipes - Generic; Antiseptic Wipes - Generic |
| `Unit of Measure` | 4,999 | 1 | Box; BAG; BAG |
| `Classification` | 5,000 | 0 | Surgical; Surgical; Surgical |
| `Manufacturer Name` | 5,000 | 0 | SurgiTech LLC; MedSupply; MedSupply |
| `Vendor Name` | 5,000 | 0 | GlobalMed; MedLogix; MedLogix |
| `Vendor Contact Info` | 5,000 | 0 | 110236; 735684; 735684 |
| `Vendor Part Number` | 5,000 | 0 | VP-59191; VP-7857; VP-7857 |
| `Catalog Number` | 4,997 | 3 | CAT-21948; CAT-87155; CAT-87155 |
| `Price` | 5,000 | 0 | 244.22; 999.02; 999.02 |
| `Lot Number` | 5,000 | 0 | LOT-78189; LOT-92447; LOT-92447 |
| `Batch Number` | 5,000 | 0 | BATCH-4053; BATCH-2576; BATCH-2576 |
| `Expiration Date` | 5,000 | 0 | 2027-10-07 00:00:00; 2024-07-29 00:00:00; 2024-07-29 00:00:00 |
| `Recall Status` | 3,408 | 1,592 | Active Recall; Active Recall; Active Recall |
| `Purchase Order Number` | 5,000 | 0 | PO-211712; PO-318362; PO-318362 |
| `Purchase Date` | 5,000 | 0 | 2025-01-03 00:00:00; 2024-02-01 00:00:00; 2024-02-01 00:00:00 |
| `Order Status` | 5,000 | 0 | Received; Backordered; Backordered |
| `QtyOnOrder` | 5,000 | 0 | 102; 126; 126 |
| `OnHandQty` | 5,000 | 0 | 154; 10; 10 |
| `Location` | 5,000 | 0 | Main Warehouse; Pharmacy Storage; Pharmacy Storage |

## Key Findings

- Unique SBRN values: 5,000; duplicate SBRN count: 0.
- `Recall Status` is missing in 1,592 rows.
- `Part Name` is missing in 6 rows.
- `Purchase Date` has 1,320 future dates relative to 2026-08-21.
- `Expiration Date` is before `Purchase Date` in 2,490 rows.
- `Expiration Date` is already past in 3,616 rows.
- Unit of measure has variants such as `Box`/`BX`, `Each`/`EA`, `BAG`/`BG`/`bag`, and `PK`/`Pack`/`PKG`.
- Manufacturer names include aliases and typos across MedSupply, SurgiTech, and HealthCorp families.
- Vendor names include small alias/formatting variants for GlobalMed and HealthEquip Direct.
