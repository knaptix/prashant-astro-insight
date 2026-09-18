import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { NAV, SITE, waLink } from "@/data/site";

export const PRASHANT_PHOTO =
  "/__l5e/assets-v1/34644233-3f0a-4aa5-bbec-ec228b512fed/prashant.jpg";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/50 font-display text-lg text-primary">
            ॐ
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-wide gold-text">
              Prashant Shrivastava
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Vedic Astrology · 22 Years
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${SITE.phone}`} className="btn-outline hidden text-sm sm:inline-flex">
            <Phone className="h-4 w-4" /> Call
          </a>
          <Link to="/kundli" className="btn-gold text-sm">
            Free Kundli
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-card px-5 py-3 xl:hidden">
          <div className="grid gap-1 sm:grid-cols-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl gold-text">Prashant Shrivastava</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {SITE.experience}. Traditional Vedic analysis of Kundli, Dasha, Yogas and Doshas,
            explained in plain language — with modern chart technology doing the calculation.
          </p>
          <p className="mt-4 font-display text-lg text-primary">{SITE.tagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-primary">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-primary">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={waLink("Namaste, I would like to discuss my Kundli.")} className="hover:text-primary">
                WhatsApp
              </a>
            </li>
            <li>{SITE.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Prashant Shrivastava Astrology. Astrological guidance is
        traditional and interpretive; it is not a substitute for medical, legal or financial advice.
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={waLink("Namaste Prashant ji, I would like to discuss my Kundli.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="hero-bg border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-16 text-center md:py-20">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
        ) : null}
        {children ? <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  title,
  intro,
  children,
  id,
}: {
  title?: string;
  intro?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-14">
      {title ? <h2 className="font-display text-3xl md:text-4xl">{title}</h2> : null}
      {intro ? <p className="mt-3 max-w-3xl text-muted-foreground">{intro}</p> : null}
      <div className={title || intro ? "mt-8" : ""}>{children}</div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`surface p-6 ${className}`}>{children}</div>;
}
