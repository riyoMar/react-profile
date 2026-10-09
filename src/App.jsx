import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Code2, Github, Linkedin, Mail, Moon, Sun, X } from 'lucide-react';

function readStoredTheme() {
  try {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
  } catch {
    return null;
  }
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const projects = [
  {
    number: '01',
    name: 'Portfolio Platform',
    type: 'A considered home for selected work',
    category: 'Frontend',
    year: '2026',
    image: 'photo-1498050108023-c5249f4df085',
    imageAlt: 'A developer working at a laptop in a bright workspace',
    className: 'project--book',
    description: 'A responsive React portfolio featuring reusable project cards, client-side filtering, and keyboard-accessible case-study dialogs. Designed to make projects easy to explore across screen sizes, with care for semantic markup, reduced motion, and clear interactions.',
    services: 'React · JavaScript · Responsive UI · GitHub Actions',
  },
  {
    number: '02',
    name: 'Good Neighbor',
    type: 'A neighborhood directory concept',
    category: 'Web applications',
    year: '2025',
    image: 'photo-1517248135467-4c7edcad34c4',
    imageAlt: 'Warmly lit neighborhood restaurant in the evening',
    className: 'project--neighbor',
    description: 'A neighborhood business directory concept focused on helping people find independent local places. The project explores scannable listings, useful place details, and a straightforward browsing experience on mobile.',
    services: 'Product concept · Clear information · Responsive UI',
  },
  {
    number: '03',
    name: 'Trailbook',
    type: 'An approachable trail-planning concept',
    category: 'Web applications',
    year: '2024',
    image: 'photo-1470770841072-f978cf4d019e',
    imageAlt: 'Quiet mountain lake surrounded by evergreen forest',
    className: 'project--field',
    description: 'An outdoor-planning concept centered on helping people prepare for a day on the trail. The experience explores readable trip details, clear route information, and a welcoming path from inspiration to planning.',
    services: 'Information design · Responsive layouts · Accessibility',
  },
  {
    number: '04',
    name: 'Daybreak',
    type: 'A calmer daily-planning concept',
    category: 'Frontend',
    year: '2024',
    image: 'photo-1470252649378-9c29740c9fa8',
    imageAlt: 'Early morning sunlight falling across an open meadow',
    className: 'project--daybreak',
    description: 'A daily-planning concept designed to make the first moments of the day feel less rushed. It explores a calm mobile layout, accessible controls, and a clear presentation of useful information.',
    services: 'Interaction design · Mobile UI · Accessible controls',
  },
];

const filters = ['All', 'Frontend', 'Web applications'];

const socials = [
  { label: 'GitHub', href: 'https://github.com/riyoMar', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: Linkedin },
  { label: 'Email', href: 'mailto:riyo.here11@gmail.com', Icon: Mail },
];

function ProjectCard({ project, onOpen }) {
  return (
    <button className={`project-card ${project.className}`} onClick={onOpen} aria-label={`View ${project.name} case study`}>
      <span className="project-card__image">
        <img src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1100&q=85`} alt={project.imageAlt} loading="lazy" />
        <span className="project-card__number">{project.number}</span>
        <span className="project-card__open" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </span>
      <span className="project-card__details">
        <span className="project-card__title">{project.name}</span>
        <span className="project-card__subtitle">{project.type}</span>
      </span>
      <span className="project-card__meta"><span>{project.category}</span><span>{project.year}</span></span>
    </button>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [theme, setTheme] = useState(() => readStoredTheme() ?? getSystemTheme());
  const [followsSystem, setFollowsSystem] = useState(() => readStoredTheme() === null);
  const dialogRef = useRef(null);
  const visibleProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeProject && !dialog.open) dialog.showModal();
    if (!activeProject && dialog.open) dialog.close();
  }, [activeProject]);

  useEffect(() => {
    if (!followsSystem) return undefined;
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = () => setTheme(preference.matches ? 'dark' : 'light');
    preference.addEventListener('change', syncTheme);
    return () => preference.removeEventListener('change', syncTheme);
  }, [followsSystem]);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171b17' : '#f7f6f2');
    try {
      if (followsSystem) {
        window.localStorage.removeItem('portfolio-theme');
      } else {
        window.localStorage.setItem('portfolio-theme', theme);
      }
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }, [theme, followsSystem]);

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Riyo Maryadi home"><span className="wordmark__symbol">rm<span>.</span></span></a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a className="site-nav__contact" href="#contact">Say hello <ArrowUpRight size={15} /></a>
          <button className="theme-toggle" type="button" onClick={() => { setFollowsSystem(false); setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light'); }} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'dark'}>
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </nav>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <div className="availability"><span className="availability__dot" /> Open to software engineering roles</div>
            <p className="hero__eyebrow">Software engineer &middot; React and JavaScript</p>
            <h1 id="hero-title">Software,<br /><span>made human.</span></h1>
            <p className="hero__description">I’m Riyo Maryadi, a software engineer focused on building clear, accessible interfaces and thoughtful frontend systems.</p>
            <a className="hero__link" href="#work">Explore selected projects <ArrowDown size={16} /></a>
          </div>
          <div className="hero__visual" role="img" aria-label="JavaScript code sample for Riyo Maryadi's software engineering portfolio">
            <div className="code-window" aria-hidden="true">
              <div className="code-window__bar">
                <span className="code-window__lights"><i /><i /><i /></span>
                <span className="code-window__title">src / riyo.js</span>
                <Code2 size={15} />
              </div>
              <div className="code-window__lines">
                <div><span>01</span><code><b>const</b> <strong>riyo</strong> = {'{'}</code></div>
                <div><span>02</span><code>&nbsp; name: <em>'Riyo Maryadi'</em>,</code></div>
                <div><span>03</span><code>&nbsp; role: <em>'Software Engineer'</em>,</code></div>
                <div><span>04</span><code>&nbsp; stack: [<em>'React'</em>, <em>'JavaScript'</em>],</code></div>
                <div><span>05</span><code>&nbsp; focus: <em>'Frontend systems'</em>,</code></div>
                <div><span>06</span><code>{'}'};</code></div>
                <div><span>07</span><code><b>export default</b> riyo;</code></div>
              </div>
            </div>
            <div className="hero__caption"><span>React components.</span><span>Accessible by default.</span></div>
            <div className="hero__stamp" aria-hidden="true"><span>SOFTWARE</span><Code2 className="hero__stamp-star" size={21} strokeWidth={1.6} /><span>ENGINEERING</span></div>
            <span className="hero__index" aria-hidden="true">React&nbsp; | &nbsp;JavaScript</span>
          </div>
          <div className="hero__scroll" aria-hidden="true"><span /> Scroll a little</div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-heading">
          <div className="section-heading">
            <div><p className="section-kicker">Projects &amp; engineering explorations</p><h2 id="work-heading">Selected work<span className="heading-period">.</span></h2></div>
            <span className="section-count">2024 - 2026</span>
          </div>
          <div className="filter-row" role="group" aria-label="Filter projects by discipline">
            {filters.map((filter) => (
              <button key={filter} className={`filter-chip${activeFilter === filter ? ' filter-chip--active' : ''}`} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>
                {filter}<span>{filter === 'All' ? projects.length.toString().padStart(2, '0') : projects.filter((project) => project.category === filter).length.toString().padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div className="project-grid" aria-live="polite">
            {visibleProjects.map((project) => <ProjectCard key={project.number} project={project} onOpen={() => setActiveProject(project)} />)}
          </div>
          <div className="work-footnote"><span>Small teams, clear thinking, details that matter.</span><span>01 - {visibleProjects.length.toString().padStart(2, '0')}</span></div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-heading">
          <div className="about__aside"><Code2 className="about__asterisk" size={23} aria-hidden="true" /><p className="section-kicker">A little about me</p></div>
          <div className="about__body">
            <h2 id="about-heading">Frontend systems.<br /><span>Thoughtfully built.</span></h2>
            <p>I build component-driven interfaces with React and JavaScript, using semantic HTML and accessible interactions as a foundation.</p>
            <p>I focus on reusable UI, responsive behavior, and clear implementation details that make software easier to use and maintain.</p>
            <a className="about__link" href="#contact">Get in touch <ArrowRight size={16} /></a>
          </div>
          <div className="about__details">
            <div><span className="detail-label">Core strengths</span><span>React development<br />Responsive interfaces<br />Accessible UI</span></div>
            <div><span className="detail-label">Engineering tools</span><span>JavaScript, HTML, CSS<br />Git, Vite, GitHub Actions</span></div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact__top"><p className="section-kicker">Looking for my next opportunity</p><span>OPEN TO SOFTWARE ROLES <ArrowUpRight size={12} aria-hidden="true" /></span></div>
          <h2 id="contact-heading">Let’s build<br />something <span>great.</span></h2>
          <a className="contact__email" href="mailto:riyo.here11@gmail.com">riyo.here11@gmail.com <ArrowUpRight size={22} /></a>
          <div className="contact__footer">
            <span>Thoughtful engineering. Clear communication.</span>
            <nav className="social-links" aria-label="Social links">
              {socials.map(({ label, href, Icon }) => <a key={label} href={href} aria-label={label} title={label} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer"><Icon size={17} /></a>)}
            </nav>
            <a className="back-to-top" href="#home">Back to the top <ArrowUp size={13} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <dialog className="project-dialog" ref={dialogRef} onClose={() => setActiveProject(null)} onClick={(event) => { if (event.target === dialogRef.current) setActiveProject(null); }} aria-labelledby="dialog-title">
        {activeProject && (
          <div className="project-dialog__content">
            <div className={`project-dialog__image ${activeProject.className}`}><img src={`https://images.unsplash.com/${activeProject.image}?auto=format&fit=crop&w=1300&q=85`} alt={activeProject.imageAlt} /></div>
            <div className="project-dialog__body">
              <div className="project-dialog__top"><span className="section-kicker">{activeProject.category} · {activeProject.year}</span><button className="dialog-close" onClick={() => setActiveProject(null)} aria-label="Close case study"><X size={19} /></button></div>
              <h2 id="dialog-title">{activeProject.name}<span className="heading-period">.</span></h2>
              <p>{activeProject.description}</p>
              <span className="detail-label">TECHNICAL FOCUS</span><p className="project-dialog__services">{activeProject.services}</p>
              <a className="about__link" href="mailto:riyo.here11@gmail.com">Have a project in mind? <ArrowRight size={16} /></a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}