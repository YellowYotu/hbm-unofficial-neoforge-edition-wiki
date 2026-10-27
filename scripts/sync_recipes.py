#!/usr/bin/env python3
"""Extract recipe facts from the mod sources without inventing game statistics."""
import io
import json
import os
import urllib.request
import zipfile
from pathlib import Path

SOURCE = "https://codeload.github.com/YellowYotu/hbm_neoforge-1.21.1/zip/refs/heads/master"
OUTPUT = Path("app/wiki/recipes.generated.json")

def display(value):
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return ", ".join(display(v) for v in value)
    if isinstance(value, dict):
        return display(value.get("item") or value.get("id") or value.get("tag") or value.get("fluid") or value.get("items") or value.get("ingredient") or value.get("name") or "unknown")
    return str(value)

def stack(value):
    if isinstance(value, str):
        return {"id": value, "count": 1}
    if not isinstance(value, dict):
        return {"id": display(value), "count": 1}
    return {"id": display(value), "count": value.get("count", value.get("amount", 1))}

def inputs(data):
    found = []
    if isinstance(data.get("pattern"), list) and isinstance(data.get("key"), dict):
        counts = {}
        for character in "".join(data["pattern"]):
            if character != " ":
                counts[character] = counts.get(character, 0) + 1
        for character, count in counts.items():
            ingredient = stack(data["key"].get(character, character))
            ingredient["count"] = count
            found.append(ingredient)
    for key in ("ingredients", "inputs", "input", "ingredient", "primary", "secondary", "extra_inputs", "item_inputs", "fluid_inputs", "fluids"):
        value = data.get(key)
        if value is None:
            continue
        if isinstance(value, dict) and not any(k in value for k in ("item", "id", "tag", "items", "fluid", "ingredient")):
            continue
        for entry in value if isinstance(value, list) else [value]:
            found.append(stack(entry))
    return found

def outputs(data):
    for key in ("result", "results", "output", "outputs", "item_outputs", "fluid_outputs"):
        value = data.get(key)
        if value is not None:
            return [stack(item) for item in value] if isinstance(value, list) else [stack(value)]
    return []

def main():
    request = urllib.request.Request(SOURCE, headers={"User-Agent": "HBM-Wiki-Sync"})
    with urllib.request.urlopen(request, timeout=120) as response:
        archive = zipfile.ZipFile(io.BytesIO(response.read()))
    recipes = []
    for filename in archive.namelist():
        if not filename.endswith(".json") or "/src/main/resources/data/hbm_neoforge/" not in filename:
            continue
        if "/recipe/" not in filename and "/machine_recipe/" not in filename:
            continue
        if filename.endswith("/index.json"):
            continue
        try:
            data = json.loads(archive.read(filename))
        except (ValueError, UnicodeDecodeError):
            continue
        if not isinstance(data, dict):
            continue
        path = filename.split("/data/hbm_neoforge/", 1)[1]
        group = path.split("/")[1] if "/" in path else "other"
        kind = "Machine: " + group.replace("_", " ").title() if path.startswith("machine_recipe/") else data.get("type", "Crafting").split(":")[-1].replace("_", " ").title()
        output = outputs(data)
        ingredients = inputs(data)
        if not output and not ingredients:
            continue
        name = Path(filename).stem.replace("_", " ").title()
        entry = {"id": path.removesuffix(".json").replace("/", ":"), "name": name, "method": kind, "inputs": ingredients, "outputs": output, "source": path}
        for key in ("duration", "time", "energy_per_tick", "energy", "tier", "fluid", "heat", "temperature", "experience", "cookingtime", "operation", "overlay"):
            if key in data and isinstance(data[key], (int, float, str, bool)):
                entry[key] = data[key]
        recipes.append(entry)
    recipes.sort(key=lambda recipe: (recipe["method"], recipe["name"]))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(recipes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Exported {len(recipes)} recipes to {OUTPUT}")

if __name__ == "__main__":
    main()
