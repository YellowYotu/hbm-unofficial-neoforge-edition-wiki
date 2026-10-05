import Link from "next/link";
import { notFound } from "next/navigation";
import WikiIcon from "../../WikiIcon";
import { WIKI_VERSION, entrySlug, iconPath, wikiSections } from "../../wiki-data";
type Props = { params: Promise<{ category: string; slug: string }>; };
export default async function WikiEntryPage({ params }: Props) {
  const { category, slug } = await params;
  if (category !== "machines" && category !== "items" && category !== "fluids") notFound();
  const section = wikiSections[category];
  const entry = section.entries.find(value => entrySlug(value) === slug);
  if (!entry) notFound();
  const image = iconPath(category, entry);
  return <main className="wiki-page">
    <header className="wiki-page-header"><div className="wiki-page-header-inner">
      <Link className="wiki-back" href={`/wiki/${category}`}>← {section.title}</Link>
      <div className="wiki-detail-head"><WikiIcon src={image} alt={entry.name} variant={category === "fluids" ? "fluid" : "normal"} /><div><span className="section-kicker">{entry.group} · {WIKI_VERSION}</span><h1>{entry.name}</h1><code>{entry.id}</code></div></div>
    </div></header>
    <section className="wiki-detail-content">
      <article className="wiki-detail-card"><h2>Overview</h2><p>{entry.summary ?? `${entry.name} is part of HBM's Nuclear Tech Mod: Unofficial NeoForge Edition ${WIKI_VERSION}.`}</p></article>
      <article className="wiki-detail-card"><h2>Icon file</h2><p>Add or replace the PNG at:</p><code className="wiki-path">public{image}</code></article>
      <article className="wiki-detail-card"><h2>Version</h2><p>This page is scoped to {WIKI_VERSION}. Unreleased 0.0.6-B content is intentionally excluded.</p></article>
    </section>
  </main>;
}
