import Link from "next/link";
import { notFound } from "next/navigation";
import WikiIcon from "../../WikiIcon";
import { WIKI_VERSION, entrySlug, iconPath, wikiSections } from "../../wiki-data";
import { machineDetails } from "../../machine-details";
type Props = { params: Promise<{ category: string; slug: string }>; };
export default async function WikiEntryPage({ params }: Props) {
  const { category, slug } = await params;
  if (category !== "machines" && category !== "items" && category !== "fluids") notFound();
  const section = wikiSections[category];
  const entry = section.entries.find(value => entrySlug(value) === slug);
  if (!entry) notFound();
  const image = iconPath(category, entry);
  const machine = category === "machines" ? machineDetails[slug] : undefined;
  return <main className="wiki-page">
    <header className="wiki-page-header"><div className="wiki-page-header-inner">
      <Link className="wiki-back" href={`/wiki/${category}`}>← {section.title}</Link>
      <div className="wiki-detail-head"><WikiIcon src={image} alt={entry.name} variant={category === "fluids" ? "fluid" : "normal"} /><div><span className="section-kicker">{entry.group} · {WIKI_VERSION}</span><h1>{entry.name}</h1><code>{entry.id}</code></div></div>
    </div></header>
    <section className="wiki-detail-content">
      <article className="wiki-detail-card wiki-detail-wide">
        <h2>Overview</h2>
        <p>{machine?.description ?? entry.summary ?? `${entry.name} is part of HBM's Nuclear Tech Mod: Unofficial NeoForge Edition ${WIKI_VERSION}.`}</p>
      </article>

      {machine?.requires?.length ? <article className="wiki-detail-card">
        <h2>Requirements</h2>
        <ul className="wiki-detail-list">{machine.requires.map(value => <li key={value}>{value}</li>)}</ul>
      </article> : null}

      {machine?.stats?.length ? <article className="wiki-detail-card">
        <h2>Stats</h2>
        <div className="wiki-stat-list">{machine.stats.map(stat => <div className="wiki-stat-row" key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></div>)}</div>
      </article> : null}

      {machine?.construction?.length ? <article className="wiki-detail-card wiki-detail-wide">
        <h2>How to make it</h2>
        <div className="wiki-construction-list">
          {machine.construction.map((recipe, index) => <div className="wiki-construction" key={`${recipe.method}-${index}`}>
            <div className="wiki-construction-head"><strong>{recipe.method}</strong>{recipe.duration ? <span>{recipe.duration}</span> : null}{recipe.energy ? <span>{recipe.energy}</span> : null}</div>
            {recipe.pattern ? <div className="wiki-crafting-grid">{recipe.pattern.join("").split("").map((symbol, slot) => <span key={slot}>{symbol === " " ? "" : symbol}</span>)}</div> : null}
            <div className="wiki-ingredient-list">{recipe.ingredients.map(ingredient => <span key={ingredient.name}>{ingredient.count}× {ingredient.name}</span>)}</div>
          </div>)}
        </div>
      </article> : null}

      {machine?.recipes?.length ? <article className="wiki-detail-card wiki-detail-wide">
        <h2>Recipes / Produces</h2>
        <p className="wiki-detail-subtitle">Recipes available on this machine in {WIKI_VERSION}.</p>
        <div className="wiki-recipe-tags">{machine.recipes.map(recipe => <span key={recipe}>{recipe}</span>)}</div>
      </article> : null}

      {machine?.notes?.length ? <article className="wiki-detail-card wiki-detail-wide">
        <h2>How it works</h2>
        <ul className="wiki-detail-list">{machine.notes.map(note => <li key={note}>{note}</li>)}</ul>
      </article> : null}

      <article className="wiki-detail-card">
        <h2>Icon file</h2>
        <p>Add or replace the PNG at:</p>
        <code className="wiki-path">public{image}</code>
      </article>

      <article className="wiki-detail-card">
        <h2>Version</h2>
        <p>This page is scoped to {WIKI_VERSION}. Unreleased 0.0.6-B content is intentionally excluded.</p>
      </article>
    </section>
  </main>;
}
