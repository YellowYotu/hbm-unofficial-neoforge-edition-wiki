import Link from "next/link";
import WikiList from "./WikiList";
import { WIKI_VERSION, wikiSections } from "./wiki-data";
type Props = { category: "machines" | "items" | "fluids"; };
export default function WikiCategoryPage({ category }: Props) {
  const section = wikiSections[category];
  return <main className="wiki-page">
    <header className="wiki-page-header"><div className="wiki-page-header-inner">
      <Link className="wiki-back" href="/">← HBM Wiki</Link>
      <div className="wiki-title-row"><div><span className="section-kicker">Version {WIKI_VERSION}</span><h1>{section.title}</h1><p>{section.description}</p></div><div className="wiki-count">{section.entries.length}<span>entries</span></div></div>
    </div></header>
    <section className="wiki-page-content">
      <div className="wiki-upload-note"><strong>Artwork folder:</strong><code>public/wiki/{category}/icons/</code><span>Drop PNG files there. Missing artwork automatically shows a question mark.</span></div>
      <WikiList category={category} entries={[...section.entries]} />
    </section>
  </main>;
}
