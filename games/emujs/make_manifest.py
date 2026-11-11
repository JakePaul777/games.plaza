#!/usr/bin/env python3
"""Build roms/manifest.json describing the folder tree of /roms/.

Usage:
    python make_manifest.py                 # scans ./roms, writes ./roms/manifest.json
    python make_manifest.py --roms path/to/roms
    python make_manifest.py --ext nes,sfc,gba   # only include these extensions

Re-run it whenever you add, remove or rename ROMs.
"""
import argparse
import json
import re
import sys
from pathlib import Path

MANIFEST_NAME = "manifest.json"
# Regex to match split parts like .part001, .part002, etc.
PART_PATTERN = re.compile(r"^(.*?)\.part(\d{3})$", re.IGNORECASE)


def build_tree(directory: Path, exts):
    """Return a list of entries (dirs first, then files, both sorted A-Z)."""
    entries = []
    try:
        children = sorted(directory.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
    except PermissionError:
        return entries

    # Keep track of processed split bases in this directory to avoid duplicates
    processed_split_bases = set()

    for child in children:
        if child.name.startswith("."):
            continue
        if child.is_dir():
            sub = build_tree(child, exts)
            # skip folders that end up empty after filtering
            if sub or exts is None:
                entries.append({"name": child.name, "type": "dir", "children": sub})
        elif child.is_file():
            if child.name == MANIFEST_NAME:
                continue

            # Check if this file is part of a split sequence (e.g. filename.ext.part001)
            match = PART_PATTERN.match(child.name)
            if match:
                base_name = match.group(1)
                part_num = match.group(2)

                # Only process the group when we hit the first part (.part001)
                if part_num == "001":
                    if base_name in processed_split_bases:
                        continue
                    processed_split_bases.add(base_name)

                    # Check extension filter against the base file name if provided
                    if exts is not None:
                        base_suffix = Path(base_name).suffix.lower().lstrip(".")
                        if base_suffix not in exts:
                            continue

                    # Scan directory to find all parts and sum their total sizes
                    total_size = 0
                    current_part = 1
                    while True:
                        part_str = f"{base_name}.part{str(current_part).zfill(3)}"
                        part_path = directory / part_str
                        if part_path.is_file():
                            total_size += part_path.stat().st_size
                            current_part += 1
                        else:
                            break

                    entries.append({"name": base_name, "type": "file", "size": total_size})
                else:
                    # Skip .part002, .part003+ since they are bundled into the .part001 entry
                    continue
            else:
                # Handle regular unsplit files normally
                if exts is not None and child.suffix.lower().lstrip(".") not in exts:
                    continue
                entries.append({"name": child.name, "type": "file", "size": child.stat().st_size})
    return entries


def count_files(entries):
    return sum(1 if e["type"] == "file" else count_files(e["children"]) for e in entries)


def main():
    default_roms = Path(__file__).resolve().parent / "roms"
    parser = argparse.ArgumentParser(description="Generate roms/manifest.json")
    parser.add_argument("--roms", type=Path, default=default_roms, help="ROMs directory (default: ./roms)")
    parser.add_argument("--ext", type=str, default=None,
                        help="comma-separated extensions to include (default: all files)")
    args = parser.parse_args()

    roms = args.roms.resolve()
    if not roms.is_dir():
        sys.exit(f"ROMs directory not found: {roms}")

    exts = None
    if args.ext:
        exts = {e.strip().lower().lstrip(".") for e in args.ext.split(",") if e.strip()}

    tree = {"name": "roms", "type": "dir", "children": build_tree(roms, exts)}
    out = roms / MANIFEST_NAME
    out.write_text(json.dumps(tree, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {out} ({count_files(tree['children'])} files)")


if __name__ == "__main__":
    main()