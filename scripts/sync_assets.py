#!/usr/bin/env python3
"""Synchronize wiki assets and registries from the mod repository."""
import io
import json
import re
import shutil
import urllib.request
import zipfile
from pathlib import Path

SOURCE = "https://codeload.github.com/YellowYotu/hbm_neoforge-1.21.1/zip/refs/heads/master"
ROOT = "src/main/resources/assets/hbm_neoforge/"
DEST = Path("public/wiki/assets")
DATA = Path("app/wiki/catalog.generated.json")
KINDS = ("machine_", "heater_", "anvil_", "assembly_machine", "foundry_", "fluid_", "battery_", "oil_", "wood_burner", "red_cable", "geiger", "mixer", "arc_welder", "air_intake", "blast_furnace", "shredder", "soldering_station", "press", "crucible", "firebox", "oven", "tank", "pipe", "valve")

def main():
    req = urllib.request.Request(SOURCE, headers={"User-Agent": "HBM-Wiki-Asset-Sync"})
    with urllib.request.urlopen(req, timeout=120) as response:
        archive = zipfile.ZipFile(io.BytesIO(response.read()))
    root = next(n.split(ROOT)[0] + ROOT for n in archive.namelist() if ROOT in n)
    names = set(archive.namelist())
    index = {"machines": [], "items": [], "models": {}, "textures": {}}
    if DEST.exists():
        shutil.rmtree(DEST)
    for member in archive.namelist():
        if not member.startswith(root):
            continue
        relative = member[len(root):]
        if relative.startswith("textures/item/") and relative.endswith(".png"):
            stem = Path(relative).stem
            index["items"].append({"id": stem, "name": stem.replace("_", " ").title(), "group": "Items"})
            target = DEST / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(archive.read(member))
            index["textures"][stem] = "/wiki/assets/" + relative
        elif relative.startswith("textures/block/") and relative.endswith(".png"):
            target = DEST / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(archive.read(member))
        elif relative.startswith("models/block/") and relative.endswith((".obj", ".mtl")):
            target = DEST / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(archive.read(member))
        elif relative.startswith("models/item/") and relative.endswith(".json"):
            pass
    blockstate_dir = root + "blockstates/"
    blocknames = sorted(Path(n).stem for n in names if n.startswith(blockstate_dir) and n.endswith(".json"))
    for stem in blocknames:
        if not stem.startswith(KINDS):
            continue
        model = root + "models/block/" + stem + ".obj"
        if model not in names:
            alternatives = [n for n in names if n.startswith(root + "models/block/" + stem + "_") and n.endswith(".obj")]
            model = sorted(alternatives)[0] if alternatives else ""
        textures = sorted(n for n in names if n.startswith(root + "textures/block/" + stem) and n.endswith(".png"))
        texture = ("/wiki/assets/textures/block/" + Path(textures[0]).name) if textures else None
        entry = {"id": stem, "name": stem.replace("_", " ").title(), "group": "Machines", "model": ("/wiki/assets/models/block/" + Path(model).name) if model else None, "texture": texture}
        index["machines"].append(entry)
        if entry["model"]:
            index["models"][stem] = entry["model"]
        if texture:
            index["textures"][stem] = texture
    DATA.parent.mkdir(parents=True, exist_ok=True)
    DATA.write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Indexed {len(index['machines'])} machinery and infrastructure blocks, {len(index['items'])} item textures, {len(index['models'])} OBJ previews")

if __name__ == "__main__":
    main()
