import Link from "next/link";
import recipes from "../recipes.generated.json";
import { RecipePanel, type Recipe } from "../RecipePanel";
export default function RecipesPage() {
  return <main className="wiki-page"><header className="wiki-page-header"><div className="wiki-page-header-inner"><Link className="wiki-back" href="/">← HBM Wiki</Link><span className="section-kicker">Source-verified crafting encyclopedia</span><h1 className="recipe-page-title">Recipe Database</h1><p className="recipe-page-subtitle">Crafting table, furnaces, anvils, powered machines and other production chains. Each recipe links to its definition in the mod repository.</p></div></header><section className="wiki-page-content"><RecipePanel recipes={recipes as Recipe[]} /></section></main>;
}
