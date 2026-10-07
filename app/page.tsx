"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 112"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="halenn-left" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#53677d" />
          <stop offset="0.48" stopColor="#a9b8c7" />
          <stop offset="0.76" stopColor="#dce4ec" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="halenn-right" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#425972" />
          <stop offset="0.48" stopColor="#91a5b9" />
          <stop offset="0.76" stopColor="#d4dee8" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      <g className="mark-left">
        <path d="M56 7 13 105h36l7-64V7Z" fill="url(#halenn-left)" />
        <path
          d="M55.9 7 49 105h-4L52 41Z"
          fill="rgba(255,255,255,.14)"
        />
      </g>

      <g className="mark-right">
        <path d="M64 7 107 105H71l-7-64V7Z" fill="url(#halenn-right)" />
        <path
          d="M64.1 7 71 105h4L68 41Z"
          fill="rgba(255,255,255,.1)"
        />
      </g>
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}

const principles = [
  {
    number: "01",
    title: "Long-term thinking",
    body: "We optimize for enduring value, not short-lived momentum.",
  },
  {
    number: "02",
    title: "Extraordinary people",
    body: "The right people create the standards, energy and taste that compound.",
  },
  {
    number: "03",
    title: "Meaningful companies",
    body: "We build focused businesses that earn a lasting place in their category.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const companyRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const moveLight = (
    event: ReactPointerEvent<HTMLElement>,
    target: HTMLElement | null
  ) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;

    target.style.setProperty("--mx", `${x}px`);
    target.style.setProperty("--my", `${y}px`);
    target.style.setProperty("--rx", `${ny * -3.5}deg`);
    target.style.setProperty("--ry", `${nx * 4.5}deg`);
  };

  return (
    <main>
      <header className="site-header">
        <a className="nav-logo" href="#top" aria-label="Halenn home">
          <Mark className="nav-mark" />
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
        onPointerMove={(event) => moveLight(event, heroRef.current)}
      >
        <div className="hero-ambient" aria-hidden="true" />
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-logo-wrap">
            <div className="hero-logo-aura" aria-hidden="true" />
            <div className="hero-logo-glint" aria-hidden="true" />
            <Mark className="hero-mark" />
          </div>

          <p className="hero-kicker">Halenn · Parent company · Amsterdam</p>

          <h1>
            A parent company
            <br />
            for what comes next.
          </h1>

          <p className="hero-sub">
            We create and grow focused digital companies with strong products,
            distinct identities and a long-term view.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#companies">
              Explore companies
              <Arrow />
            </a>
            <a className="button button-ghost" href="#about">
              About Halenn
            </a>
          </div>
        </div>

        <div className="hero-foot">
          <span>Building enduring digital businesses</span>
          <a href="#about">
            Scroll
            <span className="hero-foot-line" />
          </a>
        </div>
      </section>

      <section id="about" className="editorial-section">
        <div className="editorial-intro" data-reveal>
          <p className="section-label">01 · Halenn</p>
          <h2>
            Built to compound.
            <br />
            <span>Designed to endure.</span>
          </h2>
        </div>

        <div className="editorial-copy" data-reveal>
          <p>
            Halenn is the foundation behind a growing group of focused digital
            businesses. We stay close to the details that shape each company:
            positioning, product, design, systems and long-term direction.
          </p>
          <p>
            Each company keeps its own identity. Halenn provides the structure,
            standards and patience that help good ideas become durable businesses.
          </p>
        </div>
      </section>

      <section id="companies" className="companies-section">
        <div className="section-head" data-reveal>
          <div>
            <p className="section-label">02 · Companies</p>
            <h2>Focused companies. One foundation.</h2>
          </div>
          <p>
            Independent brands with shared standards for design, technology and
            long-term quality.
          </p>
        </div>

        <a
          ref={companyRef}
          className="company-feature"
          href="https://aevell.com"
          target="_blank"
          rel="noreferrer"
          onPointerMove={(event) => moveLight(event, companyRef.current)}
          data-reveal
        >
          <div className="company-light" aria-hidden="true" />

          <div className="company-content">
            <div className="company-meta">
              <span>01</span>
              <span>Web design · Development · Maintenance</span>
            </div>

            <div>
              <p className="company-eyebrow">A Halenn company</p>
              <h3>Aevell</h3>
              <p className="company-copy">
                Premium websites for established businesses, from strategy and
                design through development and ongoing maintenance.
              </p>
            </div>

            <div className="company-link">
              <span>Visit aevell.com</span>
              <span className="company-link-icon">
                <Arrow />
              </span>
            </div>
          </div>

          <div className="company-visual" aria-hidden="true">
            <div className="visual-orbit visual-orbit-1" />
            <div className="visual-orbit visual-orbit-2" />
            <div className="visual-surface visual-surface-back" />
            <div className="visual-surface visual-surface-mid" />
            <div className="visual-surface visual-surface-front">
              <span>AEVELL</span>
              <small>Digital experiences built to last.</small>
            </div>
          </div>
        </a>
      </section>

      <section id="principles" className="principles-section">
        <div className="section-head" data-reveal>
          <div>
            <p className="section-label">03 · Principles</p>
            <h2>The standards behind the work.</h2>
          </div>
          <p>
            Different companies. The same expectation of clarity, craft and
            durable value.
          </p>
        </div>

        <div className="principles-list">
          {principles.map((item) => (
            <article className="principle-row" key={item.number} data-reveal>
              <span className="principle-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="principle-arrow">
                <Arrow />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="system-section">
        <div className="system-shell" data-reveal>
          <div className="system-glow" aria-hidden="true" />

          <div className="system-left">
            <p className="section-label">04 · Structure</p>
            <h2>
              One foundation.
              <br />
              Multiple directions.
            </h2>
            <p>
              Halenn gives each company room to develop its own identity while
              sharing the systems and standards that make quality repeatable.
            </p>
          </div>

          <div className="system-map">
            <div className="system-root">
              <Mark className="system-mark" />
            </div>
            <span className="system-stem" />
            <div className="system-branches">
              <span />
              <span />
            </div>
            <div className="system-nodes">
              <div className="system-node active">
                <span>Aevell</span>
                <small>Web design & technology</small>
              </div>
              <div className="system-node future">
                <span>Next</span>
                <small>When the opportunity is right</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-light" aria-hidden="true" />
        <div className="closing-inner" data-reveal>
          <Mark className="closing-mark" />
          <p className="section-label">Halenn</p>
          <h2>
            Enduring value
            <br />
            for what’s next.
          </h2>
          <a className="text-link" href="#top">
            Back to top
            <Arrow />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-left">
          <Mark className="footer-mark" />
          <span>© {new Date().getFullYear()} Halenn</span>
        </div>

        <div className="footer-center">
          <a href="#companies">Companies</a>
          <a href="#principles">Principles</a>
          <a href="#about">About</a>
        </div>

        <span className="footer-location">Amsterdam, The Netherlands</span>
      </footer>
    </main>
  );
}
