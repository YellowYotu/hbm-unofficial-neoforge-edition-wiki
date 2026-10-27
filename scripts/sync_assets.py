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
    index = {"machines": [], "items": [], "models": {}, "textures": {}, "previews": {}}
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
        elif (relative.startswith("models/block/") or relative.startswith("models/obj/")) and relative.endswith((".obj", ".mtl")):
            target = DEST / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(archive.read(member))
        elif relative.startswith("models/item/") and relative.endswith(".json"):
            pass
    blockstate_dir = root + "blockstates/"
    blocknames = sorted(Path(n).stem for n in names if n.startswith(blockstate_dir) and n.endswith(".json"))
    for stem in blocknames:
        if not stem.startswith(KINDS) or stem.endswith(("_dummy", "_renderer", "_head_render")):
            continue
        model_json = None
        for candidate in (stem, stem + "_off", stem + "_on"):
            key = root + "models/block/" + candidate + ".json"
            if key in names:
                try:
                    model_json = json.loads(archive.read(key))
                    break
                except (ValueError, UnicodeDecodeError):
                    pass
        if not model_json or model_json.get("loader") != "neoforge:obj":
            item_key = root + "models/item/" + stem + ".json"
            if item_key in names:
                try:
                    item_json = json.loads(archive.read(item_key))
                    if item_json.get("loader") == "neoforge:obj":
                        model_json = item_json
                except (ValueError, UnicodeDecodeError):
                    pass
        model = root + "models/block/" + stem + ".obj"
        if model_json and model_json.get("loader") == "neoforge:obj":
            model = root + model_json.get("model", "").split(":", 1)[-1]
        if model not in names:
            alternatives = [n for n in names if n.startswith(root + "models/block/" + stem + "_") and n.endswith(".obj")]
            model = sorted(alternatives)[0] if alternatives else ""
        textures = sorted(n for n in names if n.startswith(root + "textures/block/" + stem) and n.endswith(".png"))
        texture = ("/wiki/assets/textures/block/" + Path(textures[0]).name) if textures else None
        faces = {}
        if model_json:
            tex = model_json.get("textures", {})
            shape_faces = {}
            elements = model_json.get("elements", [])
            if elements:
                shape_faces = {face: info.get("texture", "") for face, info in elements[0].get("faces", {}).items()}
            for face in ("up", "down", "north", "south", "east", "west"):
                face_key = shape_faces.get(face, "")
                if face_key.startswith("#"):
                    face_key = tex.get(face_key[1:], "")
                elif not face_key:
                    face_key = tex.get(face) or tex.get("top" if face == "up" else "bottom" if face == "down" else "side") or tex.get("all") or tex.get("texture") or ""
                if face_key.startswith("hbm_neoforge:block/"):
                    filename = root + "textures/block/" + face_key.split("block/", 1)[1] + ".png"
                    if filename in names:
                        faces[face] = "/wiki/assets/textures/block/" + Path(filename).name
            selected = tex.get("texture0") or tex.get("particle") or ""
            if selected.startswith("hbm_neoforge:block/"):
                filename = root + "textures/block/" + selected.split("block/", 1)[1] + ".png"
                if filename in names:
                    texture = "/wiki/assets/textures/block/" + Path(filename).name
        if not faces and texture:
            faces = {face: texture for face in ("up", "down", "north", "south", "east", "west")}
        definition = None
        if model_json and model_json.get("elements"):
            definition = model_json
        elif model_json and model_json.get("parent", "").startswith("minecraft:block/"):
            definition = model_json
        if definition:
            index.setdefault("definitions", {})[stem] = definition
        entry = {"id": stem, "name": stem.replace("_", " ").title(), "group": "Machines", "model": ("/wiki/assets/" + model.split(ROOT, 1)[1]) if model else None, "texture": texture}
        index["machines"].append(entry)
        index["previews"][stem] = {"model": entry["model"], "texture": texture, "faces": faces, "flipV": bool(model_json and model_json.get("flip_v", False)), "definition": definition}
        if entry["model"]:
            index["models"][stem] = entry["model"]
        if texture:
            index["textures"][stem] = texture
    DATA.parent.mkdir(parents=True, exist_ok=True)
    DATA.write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Indexed {len(index['machines'])} machinery and infrastructure blocks, {len(index['items'])} item textures, {len(index['models'])} OBJ previews")

if __name__ == "__main__":
    main()
