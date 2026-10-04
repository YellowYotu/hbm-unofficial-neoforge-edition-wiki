const categories = [
  { icon: "⚙", title: "Machines", description: "Processing, power generation, chemistry, oil and industrial machinery." },
  { icon: "◈", title: "Items", description: "Materials, tools, components, resources and special equipment." },
  { icon: "✦", title: "Weapons", description: "Firearms, explosives, launchers and destructive technology." },
  { icon: "➤", title: "Missiles", description: "Missiles, launch systems, targeting and related infrastructure." },
  { icon: "☢", title: "Nuclear Systems", description: "Reactors, fuels, radiation, nuclear processing and power." },
  { icon: "◆", title: "Fluids", description: "Industrial fluids, fuels, chemicals and fluid processing." },
];

const quickLinks = [
  { title: "Getting Started", text: "Learn the basics and begin your progression through HBM." },
  { title: "Progression", text: "Follow the main technology path from early industry to nuclear systems." },
  { title: "Recipes", text: "Find crafting and machine recipes used throughout the mod." },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="HBM Wiki home">
          <span className="brand-mark">☢</span>
          <span>
            <strong>HBM</strong>
            <small>NEOFORGE WIKI</small>
          </span>
        </a>

        <nav className="nav">
          <a href="#wiki">Wiki</a>
          <a href="#guides">Guides</a>
          <a href="https://github.com/YellowYotu/hbm_neoforge-1.21.1" target="_blank" rel="noreferrer">GitHub</a>
          <a className="discord-link" href="https://discord.gg/A9NK8xypwU" target="_blank" rel="noreferrer">Discord</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hazard hazard-left" />
        <div className="hazard hazard-right" />

        <div className="hero-content">
          <div className="eyebrow"><span /> OFFICIAL WIKI <span /></div>
          <div className="hero-symbol">☢</div>
          <h1>HBM&apos;s Nuclear Tech Mod</h1>
          <h2>Unofficial NeoForge Edition</h2>
          <p>
            The official documentation hub for the Minecraft 1.21.1 NeoForge port.
            Explore machines, weapons, nuclear technology, resources and progression.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#wiki">Explore the Wiki <span>→</span></a>
            <a className="secondary-button" href="https://github.com/YellowYotu/hbm_neoforge-1.21.1" target="_blank" rel="noreferrer">View Source</a>
          </div>

          <div className="version-row">
            <span className="status-dot" />
            <span>Minecraft 1.21.1</span>
            <i />
            <span>NeoForge</span>
            <i />
            <span>Wiki in development</span>
          </div>
        </div>
      </section>

      <section className="section" id="wiki">
        <div className="section-heading">
          <div>
            <span className="section-kicker">DATABASE</span>
            <h3>Explore the Wiki</h3>
          </div>
          <p>Everything you need to understand the systems, machines and content added by the mod.</p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.title}>
              <div className="card-icon">{category.icon}</div>
              <div>
                <h4>{category.title}</h4>
                <p>{category.description}</p>
              </div>
              <span className="coming-soon">COMING SOON</span>
            </article>
          ))}
        </div>
      </section>

      <section className="guides-section" id="guides">
        <div className="section-heading compact">
          <div>
            <span className="section-kicker">FIELD MANUAL</span>
            <h3>Guides & Progression</h3>
          </div>
        </div>

        <div className="guide-grid">
          {quickLinks.map((item, index) => (
            <article className="guide-card" key={item.title}>
              <span className="guide-index">0{index + 1}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
              <span className="guide-arrow">→</span>
            </article>
          ))}
        </div>
      </section>

      <section className="community-section">
        <div>
          <span className="section-kicker">COMMUNITY</span>
          <h3>Need help or found a bug?</h3>
          <p>Join the community on Discord or report issues directly in the mod repository.</p>
        </div>
        <div className="community-actions">
          <a className="primary-button" href="https://discord.gg/A9NK8xypwU" target="_blank" rel="noreferrer">Join Discord</a>
          <a className="secondary-button" href="https://github.com/YellowYotu/hbm_neoforge-1.21.1/issues" target="_blank" rel="noreferrer">Report a Bug</a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span>☢</span> HBM&apos;s Nuclear Tech Mod: Unofficial NeoForge Edition</div>
        <p>Original mod by <strong>HbmMods</strong> · NeoForge edition developed by <strong>YellowYotu</strong></p>
        <p className="footer-note">This wiki is maintained for the unofficial NeoForge port.</p>
      </footer>
    </main>
  );
}
