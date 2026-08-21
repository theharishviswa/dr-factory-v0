import io
import json
import sys
from pathlib import Path

sys.path.insert(0, "/tmp/drfactory_py")

import msoffcrypto
import pandas as pd


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: inspect_encrypted_workbook.py <workbook_path> [password ...]", file=sys.stderr)
        return 2

    workbook_path = Path(sys.argv[1])
    passwords = sys.argv[2:] or ["", "VelvetSweatshop"]

    for password in passwords:
        with workbook_path.open("rb") as stream:
            office_file = msoffcrypto.OfficeFile(stream)
            encrypted = office_file.is_encrypted()
            output = io.BytesIO()

            try:
                office_file.load_key(password=password)
                office_file.decrypt(output)
                output.seek(0)
                excel = pd.ExcelFile(output)
                result = {
                    "workbook_path": str(workbook_path),
                    "encrypted": encrypted,
                    "password_label": "blank" if password == "" else password,
                    "sheets": []
                }

                for sheet_name in excel.sheet_names:
                    frame = pd.read_excel(excel, sheet_name=sheet_name)
                    result["sheets"].append(
                        {
                            "sheet_name": sheet_name,
                            "rows": int(len(frame)),
                            "columns": [str(column) for column in frame.columns],
                            "sample_rows": json.loads(frame.head(5).fillna("").to_json(orient="records"))
                        }
                    )

                print(json.dumps(result, indent=2))
                return 0
            except Exception as exc:
                print(
                    json.dumps(
                        {
                            "password_label": "blank" if password == "" else password,
                            "status": "failed",
                            "error_type": type(exc).__name__,
                            "error": str(exc),
                        }
                    )
                )

    return 1


if __name__ == "__main__":
    raise SystemExit(main())

