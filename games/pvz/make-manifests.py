#!/usr/bin/env python3
"""Run from the folder containing index.html. Writes properties/manifest.json and
saves/manifest.json so the page can find files on hosts without directory listings."""
import os, json
for d in ("properties", "saves"):
    if not os.path.isdir(d): continue
    files = sorted(os.path.relpath(os.path.join(r, f), d).replace(os.sep, "/")
                   for r, _, fs in os.walk(d) for f in fs if f != "manifest.json")
    json.dump(files, open(os.path.join(d, "manifest.json"), "w"), indent=1)
    print(d, len(files), "files")
