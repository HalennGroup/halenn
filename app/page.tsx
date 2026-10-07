"use client";

import { useEffect, useRef, useState } from "react";

function MiniMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="miniLeft" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#65778b" />
          <stop offset="0.52" stopColor="#d8e2ed" />
          <stop offset="1" stopColor="#f6f8fb" />
        </linearGradient>
        <linearGradient id="miniRight" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#51657d" />
          <stop offset="0.5" stopColor="#bdcbd9" />
          <stop offset="1" stopColor="#f5f8fb" />
        </linearGradient>
      </defs>
      <path d="M50 7 11 91h34l5-56V7Z" fill="url(#miniLeft)" />
      <path d="M50 7 89 91H55l-5-56V7Z" fill="url(#miniRight)" />
    </svg>
  );
}

function HeroBrand({ ready }: { ready: boolean }) {
  return (
    <div className={`hero-brand ${ready ? "is-ready" : ""}`} aria-label="Halenn">
      <svg className="hero-half hero-half-left" viewBox="0 0 100 120" aria-hidden="true">
        <defs>
          <linearGradient id="heroLeft" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#52677e" />
            <stop offset="0.46" stopColor="#a8b9ca" />
            <stop offset="0.76" stopColor="#dbe4ed" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path d="M54 5 8 112h39l7-72V5Z" fill="url(#heroLeft)" />
        <path d="M54 5 48 112h-6l6-80Z" fill="rgba(255,255,255,.16)" />
      </svg>

      <span className="hero-wordmark" aria-hidden="true">
        Halenn
      </span>

      <svg className="hero-half hero-half-right" viewBox="0 0 100 120" aria-hidden="true">
        <defs>
          <linearGradient id="heroRight" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#425971" />
            <stop offset="0.42" stopColor="#91a5b9" />
            <stop offset="0.74" stopColor="#d5e0ea" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path d="M46 5 92 112H53l-7-72V5Z" fill="url(#heroRight)" />
        <path d="M46 5 52 112h6l-6-80Z" fill="rgba(255,255,255,.12)" />
      </svg>
    </div>
  );
}

const principles = [
  {
    number: "01",
    title: "Long-term thinking",
    body: "We build with a longer horizon. Durable value matters more than short-term noise.",
  },
  {
    number: "02",
    title: "Extraordinary people",
    body: "Strong companies begin with ambitious people who care deeply about the work.",
  },
  {
    number: "03",
    title: "Meaningful companies",
    body: "We focus on products and businesses that can earn a lasting place in people’s lives.",
  },
];

export default function Home() {
  const [ready, setReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 180);

    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect || !heroRef.current) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const nx = (x / rect.width - 0.5) * 2;
    const ny = (y / rect.height - 0.5) * 2;

    heroRef.current.style.setProperty("--pointer-x", `${x}px`);
    heroRef.current.style.setProperty("--pointer-y", `${y}px`);
    heroRef.current.style.setProperty("--drift-x", `${nx * 5}px`);
    heroRef.current.style.setProperty("--drift-y", `${ny * 3}px`);
  };

  return (
    <main>
      <header className="site-header">
        <a className="nav-brand" href="#top" aria-label="Halenn home">
          <MiniMark className="nav-mark" />
          <span>Halenn</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#companies">Companies</a>
          <a href="#principles">Principles</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section
        id="top"
        ref={heroRef}
        className="hero"
        onPointerMove={handlePointerMove}
      >
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-cursor-light" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />

        <div className="hero-content">
          <p className={`eyebrow intro-copy ${ready ? "is-ready" : ""}`}>
            Parent company · Amsterdam
          </p>

          <HeroBrand ready={ready} />

          <div className={`hero-copy ${ready ? "is-ready" : ""}`}>
            <h1>Building what comes next.</h1>
            <p>
              Halenn creates and grows focused digital companies with a long-term view.
            </p>
          </div>
        </div>

        <a className={`scroll-cue ${ready ? "is-ready" : ""}`} href="#about">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
        </a>
      </section>

      <section id="about" className="statement-section section-grid">
        <div className="section-rail" aria-hidden="true" />
        <div className="statement-wrap" data-reveal>
          <p className="section-kicker">Halenn</p>
          <h2>
            We build <span>companies</span>
            <br />
            designed to <span>last.</span>
          </h2>
          <div className="statement-detail">
            <p>
              Halenn is a parent company for digital businesses with clear products,
              strong identities and room to compound over time.
            </p>
            <p>
              We stay close to the work, from early product decisions to the systems
              that help each company grow.
            </p>
          </div>
        </div>
      </section>

      <section id="companies" className="companies-section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">Our companies</p>
            <h2>Built independently. Stronger together.</h2>
          </div>
          <span className="section-index">01</span>
        </div>

        <a
          className="company-card"
          href="https://aevell.com"
          target="_blank"
          rel="noreferrer"
          data-reveal
        >
          <div className="company-grid" aria-hidden="true" />
          <div className="company-glow" aria-hidden="true" />
          <div className="company-topline">
            <span>01</span>
            <span>Web design · Development · Maintenance</span>
          </div>
          <div className="company-main">
            <div>
              <p className="company-label">A Halenn company</p>
              <h3>Aevell</h3>
            </div>
            <p className="company-description">
              Premium websites built to perform, from the first design system to
              ongoing maintenance and growth.
            </p>
          </div>
          <div className="company-footer">
            <span>aevell.com</span>
            <span className="company-arrow" aria-hidden="true">↗</span>
          </div>
        </a>
      </section>

      <section id="principles" className="principles-section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">How we think</p>
            <h2>Principles that travel across every company.</h2>
          </div>
          <span className="section-index">02</span>
        </div>

        <div className="principles-grid">
          {principles.map((principle) => (
            <article className="principle-card" key={principle.number} data-reveal>
              <span className="principle-number">{principle.number}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
              <span className="principle-plus" aria-hidden="true">+</span>
            </article>
          ))}
        </div>
      </section>

      <section className="structure-section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">Structure</p>
            <h2>One foundation. Multiple focused companies.</h2>
          </div>
          <span className="section-index">03</span>
        </div>

        <div className="structure-map" data-reveal>
          <div className="structure-node structure-parent">
            <MiniMark className="structure-mark" />
            <span>Halenn</span>
            <small>Parent company</small>
          </div>

          <div className="structure-line" aria-hidden="true">
            <span />
          </div>

          <div className="structure-children">
            <a
              className="structure-node structure-child"
              href="https://aevell.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>Aevell</span>
              <small>Web design &amp; technology</small>
            </a>
            <div className="structure-node structure-child structure-future">
              <span>Next</span>
              <small>Built when the opportunity is right</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid" aria-hidden="true" />
        <div className="footer-mark-wrap" data-reveal>
          <MiniMark className="footer-mark" />
        </div>
        <div className="footer-title" data-reveal>
          <p className="section-kicker">Halenn</p>
          <h2>A brighter tomorrow.</h2>
        </div>
        <div className="footer-bottom">
          <div>
            <span>Halenn</span>
            <span>Amsterdam, The Netherlands</span>
          </div>
          <div className="footer-links">
            <a href="#companies">Companies</a>
            <a href="#principles">Principles</a>
            <a href="#about">About</a>
          </div>
          <span>© {new Date().getFullYear()} Halenn</span>
        </div>
      </footer>
    </main>
  );
}
