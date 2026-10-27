"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

export type Recipe = { id: string; name: string; method: string; inputs: { id: string; count: number }[]; outputs: { id: string; count: number }[]; source: string; duration?: number; time?: number; energy_per_tick?: number; energy?: number; tier?: number; cookingtime?: number; };
const label = (id: string) => id.split(":").at(-1)?.replaceAll("_", " ") ?? id;
export function RecipePanel({ recipes, itemId }: { recipes: Recipe[]; itemId?: string }) {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All");
  const methods = useMemo(() => ["All", ...new Set(recipes.map(recipe => recipe.method))], [recipes]);
  const filtered = useMemo(() => recipes.filter(recipe => {
    const matchesItem = !itemId || [...recipe.inputs, ...recipe.outputs].some(value => value.id === itemId || value.id.endsWith(":" + itemId));
    const matchesText = [recipe.name, recipe.method, ...recipe.inputs.map(value => value.id), ...recipe.outputs.map(value => value.id)].join(" ").toLowerCase().includes(search.toLowerCase());
    return matchesItem && matchesText && (method === "All" || recipe.method === method);
  }), [recipes, itemId, search, method]);
  return <div className="recipe-explorer">
    <div className="recipe-controls"><input aria-label="Search recipes" placeholder="Search recipes, ingredients, products..." value={search} onChange={event => setSearch(event.target.value)} /><select aria-label="Recipe type" value={method} onChange={event => setMethod(event.target.value)}>{methods.map(value => <option key={value} value={value}>{value}</option>)}</select></div>
    <div className="recipe-results">{filtered.length} recipes found · {recipes.length} indexed from mod source</div>
    <div className="recipe-grid">{filtered.map(recipe => <article className="recipe-card" key={recipe.id}>
      <div className="recipe-card-heading"><div><span className="recipe-kind">{recipe.method}</span><h3>{recipe.name}</h3></div><span className="recipe-number">{recipe.tier ? "Tier " + recipe.tier : ""}</span></div>
      <div className="recipe-flow"><div><strong>INPUT</strong>{recipe.inputs.length ? recipe.inputs.map((item, index) => <span key={index}>{item.count}× {label(item.id)}</span>) : <em>No item input documented</em>}</div><b aria-hidden="true">→</b><div><strong>OUTPUT</strong>{recipe.outputs.length ? recipe.outputs.map((item, index) => <span key={index}>{item.count}× {label(item.id)}</span>) : <em>See source</em>}</div></div>
      <div className="recipe-metrics">{recipe.energy_per_tick != null && <span>⚡ {recipe.energy_per_tick} HE/t</span>}{recipe.duration != null && <span>◷ {recipe.duration} ticks ({(recipe.duration / 20).toFixed(1)} s)</span>}{recipe.cookingtime != null && <span>◷ {recipe.cookingtime} ticks</span>}{recipe.energy != null && <span>⚡ {recipe.energy} HE</span>}</div>
      <a className="recipe-source" target="_blank" rel="noreferrer" href={"https://github.com/YellowYotu/hbm_neoforge-1.21.1/blob/master/src/main/resources/data/hbm_neoforge/" + recipe.source}>View exact recipe source ↗</a>
    </article>)}</div>
    {!filtered.length && <div className="recipe-empty">{recipes.length === 0 ? "Recipe synchronization has not finished yet. Run the Synchronize mod recipes workflow in GitHub Actions." : "No recipes match your filters."}</div>}
    <p className="recipe-disclaimer">Values are read from the mod JSON definitions. Machine energy usage can change with upgrades; unspecified values are intentionally not estimated.</p>
    {!itemId && <p className="recipe-directory"><Link href="/wiki/machines">Machines</Link> · <Link href="/wiki/items">Items</Link> · <Link href="/wiki/fluids">Fluids</Link></p>}
  </div>;
}
