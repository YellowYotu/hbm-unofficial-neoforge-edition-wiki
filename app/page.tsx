import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

type Category = {
  title: string;
  description: string;
  Icon: ComponentType<IconProps>;
};

type Guide = {
  title: string;
  text: string;
  Icon: ComponentType<IconProps>;
};

function MachinesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="4" y="7" width="16" height="10" rx="2" />
      <path d="M9 3v4M15 3v4M4 10h16M7 17v4M17 17v4" />
      <circle cx="9" cy="13" r="1.2" />
      <circle cx="15" cy="13" r="1.2" />
    </svg>
  );
}

function ItemsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3 20 7 12 11 4 7 12 3ZM20 7v10l-8 4-8-4V7M12 11v10" />
    </svg>
  );
}

function WeaponsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 14h7l7-7 2 2-7 7v4h-2l-1.5-2H8l-1 1H4zM15 8l1.5-1.5" />
    </svg>
  );
}

function MissilesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M8 16c-1.8-4.7 2.7-9.2 7-9 0 4.3-4.3 8.8-9 7ZM14 10l4-4M8 16l-3 3M7 19H4v-3" />
    </svg>
  );
}

function NuclearIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="1.8" />
      <path d="M13.4 10.6 17.8 8a7.5 7.5 0 0 0-10.6 0l4.4 2.6M10.6 13.4 8 17.8a7.5 7.5 0 0 0 8 0l-2.6-4.4M10.6 10.6 8 6.2a7.5 7.5 0 0 0 0 8l4.4-2.6" />
    </svg>
  );
}

function FluidsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3c3 4 5 6.7 5 10a5 5 0 1 1-10 0c0-3.3 2-6 5-10ZM9.5 13.5c.6 1.2 1.5 2 2.5 2.5" />
    </svg>
  );
}

function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21ZM5 5.5V21M9 7h6" />
    </svg>
  );
}

function ProgressIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 18h16M7 18V9M12 18V6M17 18v-4" />
    </svg>
  );
}

function RecipeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

const categories: Category[] = [
  { Icon: MachinesIcon, title: "Machines", description: "Processing, power generation, chemistry, oil and industrial machinery." },
  { Icon: ItemsIcon, title: "Items", description: "Materials, tools, components, resources and special equipment." },
  { Icon: WeaponsIcon, title: "Weapons", description: "Firearms, explosives, launchers and destructive technology." },
  { Icon: MissilesIcon, title: "Missiles", description: "Missiles, launch systems, targeting and related infrastructure." },
  { Icon: NuclearIcon, title: "Nuclear Systems", description: "Reactors, fuels, radiation, nuclear processing and power." },
  { Icon: FluidsIcon, title: "Fluids", description: "Industrial fluids, fuels, chemicals and fluid processing." },
];

const quickLinks: Guide[] = [
  { Icon: BookIcon, title: "Getting Started", text: "Start here if you are new to the mod." },
  { Icon: ProgressIcon, title: "Progression", text: "A rough path through the main technology tiers." },
  { Icon: RecipeIcon, title: "Recipes", text: "Crafting and machine recipes used throughout the mod." },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="HBM Wiki home">
          <Image className="brand-logo" src="/logo.webp" alt="HBM's NTM NeoForge Edition logo" width={96} height={72} priority />
          <span>
            <strong>HBM&apos;s Nuclear Tech Mod</strong>
            <small>Unofficial NeoForge Edition Wiki</small>
          </span>
        </a>

        <nav className="nav">
          <a href="#wiki">Wiki</a>
          <a href="#guides">Guides</a>
          <a href="https://github.com/YellowYotu/hbm_neoforge-1.21.1" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://discord.gg/A9NK8xypwU" target="_blank" rel="noreferrer">Discord</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <Image className="hero-logo" src="/logo.webp" alt="HBM's NTM NeoForge Edition logo" width={768} height={579} priority />
          <div>
            <span className="eyebrow">Official Wiki</span>
            <h1>HBM&apos;s Nuclear Tech Mod</h1>
            <h2>Unofficial NeoForge Edition</h2>
            <p>
              Documentation for the Minecraft 1.21.1 NeoForge port. The wiki is still being built,
              so some sections are incomplete for now.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#wiki">Browse Wiki</a>
              <a className="secondary-button" href="https://github.com/YellowYotu/hbm_neoforge-1.21.1" target="_blank" rel="noreferrer">Source Code</a>
            </div>
            <div className="version-row">
              <span>Minecraft 1.21.1</span>
              <span>NeoForge</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="wiki">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Wiki</span>
            <h3>Categories</h3>
          </div>
          <p>Pages will be added as the documentation catches up with the mod.</p>
        </div>

        <div className="category-grid">
          {categories.map(({ Icon, title, description }) => (
            <article className="category-card" key={title}>
              <div className="card-icon"><Icon /></div>
              <h4>{title}</h4>
              <p>{description}</p>
              <span className="coming-soon">Coming soon</span>
            </article>
          ))}
        </div>
      </section>

      <section className="guides-section" id="guides">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Guides</span>
            <h3>Useful pages</h3>
          </div>
        </div>

        <div className="guide-grid">
          {quickLinks.map(({ Icon, title, text }) => (
            <article className="guide-card" key={title}>
              <div className="guide-icon"><Icon /></div>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="community-section">
        <div>
          <h3>Community & support</h3>
          <p>Questions belong on Discord. Bugs can be reported in the GitHub repository.</p>
        </div>
        <div className="community-actions">
          <a className="primary-button" href="https://discord.gg/A9NK8xypwU" target="_blank" rel="noreferrer">Discord</a>
          <a className="secondary-button" href="https://github.com/YellowYotu/hbm_neoforge-1.21.1/issues" target="_blank" rel="noreferrer">Bug Reports</a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Image src="/logo.webp" alt="HBM's NTM NeoForge Edition logo" width={64} height={48} />
          <span>HBM&apos;s Nuclear Tech Mod: Unofficial NeoForge Edition</span>
        </div>
        <p>Original mod by <strong>HbmMods</strong> · NeoForge edition developed by <strong>YellowYotu</strong></p>
      </footer>
    </main>
  );
}
