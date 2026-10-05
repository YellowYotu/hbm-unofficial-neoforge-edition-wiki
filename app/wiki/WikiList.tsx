"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import WikiIcon from "./WikiIcon";
import type { WikiEntry } from "./wiki-data";
import { entrySlug, iconPath } from "./wiki-data";
type Props = { category: "machines" | "items" | "fluids"; entries: WikiEntry[]; };
export default function WikiList({ category, entries }: Props) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const groups = useMemo(() => ["All", ...Array.from(new Set(entries.map(entry => entry.group)))], [entries]);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return entries.filter(entry => (group === "All" || entry.group === group) && (!value || entry.name.toLowerCase().includes(value) || entry.id.toLowerCase().includes(value)));
  }, [entries, group, query]);
  return <>
    <div className="wiki-toolbar">
      <input value={query} onChange={event => setQuery(event.target.value)} placeholder={`Search ${category}...`} aria-label={`Search ${category}`} />
      <div className="wiki-filter-row">{groups.map(value => <button className={group === value ? "active" : ""} key={value} onClick={() => setGroup(value)}>{value}</button>)}</div>
    </div>
    <div className="wiki-entry-grid">{filtered.map(entry =>
      <Link className="wiki-entry-card" href={`/wiki/${category}/${entrySlug(entry)}`} key={entry.id}>
        <WikiIcon src={iconPath(category, entry)} alt={entry.name} variant={category === "fluids" ? "fluid" : "normal"} />
        <div className="wiki-entry-copy"><span className="wiki-entry-group">{entry.group}</span><h2>{entry.name}</h2><code>{entry.id}</code>{entry.summary ? <p>{entry.summary}</p> : null}</div>
      </Link>)}</div>
    {filtered.length === 0 ? <div className="wiki-empty">Nothing found.</div> : null}
  </>;
}
