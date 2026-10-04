import Image from "next/image";

const categories = [
  { icon: "⚙", title: "Machines", description: "Processing, power generation, chemistry, oil and industrial machinery." },
  { icon: "◈", title: "Items", description: "Materials, tools, components, resources and special equipment." },
  { icon: "✦", title: "Weapons", description: "Firearms, explosives, launchers and destructive technology." },
  { icon: "➤", title: "Missiles", description: "Missiles, launch systems, targeting and related infrastructure." },
  { icon: "☢", title: "Nuclear Systems", description: "Reactors, fuels, radiation, nuclear processing and power." },
  { icon: "◆", title: "Fluids", description: "Industrial fluids, fuels, chemicals and fluid processing." },
];

const quickLinks = [
  { title: "Getting Started", text: "Start here if you are new to the mod." },
  { title: "Progression", text: "A rough path through the main technology tiers." },
  { title: "Recipes", text: "Crafting and machine recipes used throughout the mod." },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="HBM Wiki home">
          <Image className="brand-logo" src="/logo.png" alt="HBM logo" width={44} height={44} priority />
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
          <Image className="hero-logo" src="/logo.png" alt="HBM logo" width={96} height={96} priority />
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
          {categories.map((category) => (
            <article className="category-card" key={category.title}>
              <div className="card-icon">{category.icon}</div>
              <h4>{category.title}</h4>
              <p>{category.description}</p>
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
          {quickLinks.map((item) => (
            <article className="guide-card" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
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
          <Image src="/logo.png" alt="" width={28} height={28} />
          <span>HBM&apos;s Nuclear Tech Mod: Unofficial NeoForge Edition</span>
        </div>
        <p>Original mod by <strong>HbmMods</strong> · NeoForge edition developed by <strong>YellowYotu</strong></p>
      </footer>
    </main>
  );
}
