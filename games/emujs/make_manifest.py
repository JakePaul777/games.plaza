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
import sys
from pathlib import Path

MANIFEST_NAME = "manifest.json"


def build_tree(directory: Path, exts):
    """Return a list of entries (dirs first, then files, both sorted A-Z)."""
    entries = []
    try:
        children = sorted(directory.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
    except PermissionError:
        return entries

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
