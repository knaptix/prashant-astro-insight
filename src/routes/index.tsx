import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Star, Gem, Flame, BookOpen, MessageCircle } from "lucide-react";
import { Card, PRASHANT_PHOTO, Section } from "@/components/site-chrome";
import { GEMSTONES, PUJAS, SERVICES, SITE, waLink } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prashant Shrivastava — Vedic Astrologer | Free Kundli & Consultation" },
      {
        name: "description",
        content:
          "22 years of Vedic astrology experience. Generate a free online Kundli with chart, Dasha, Yogas and Doshas, then discuss it personally with astrologer Prashant Shrivastava.",
      },
      { property: "og:title", content: "Prashant Shrivastava — Vedic Astrologer | Free Kundli" },
      {
        property: "og:description",
        content:
          "Technology Calculates. Experience Interprets. Free Janam Kundli, gemstone guidance, Puja remedies and personal consultation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Prashant Shrivastava Astrology",
          description:
            "Vedic astrology consultation, Kundli analysis, gemstone guidance and traditional Puja remedies.",
          telephone: SITE.phone,
          areaServed: "India",
          address: { "@type": "PostalAddress", addressLocality: "Kota", addressRegion: "Rajasthan", addressCountry: "IN" },
        }),
      },
    ],
  }),
  component: Home,
});

const JOURNEY = [
  { icon: Star, title: "Generate Kundli", text: "Instant, accurate sidereal chart from your birth details.", to: "/kundli" as const },
  { icon: BookOpen, title: "Understand It", text: "Learn what Lagna, Dasha, Yogas and Doshas actually mean.", to: "/astrology" as const },
  { icon: MessageCircle, title: "Discuss It", text: "Talk it through with 22 years of interpretive experience.", to: "/discuss-your-kundli" as const },
  { icon: Gem, title: "Gemstones", text: "Traditional stone knowledge, discussed chart-first.", to: "/gemstones" as const },
  { icon: Flame, title: "Puja & Remedies", text: "Graha Puja, Navagraha Puja and Dosha observances.", to: "/puja-remedies" as const },
  { icon: Sparkles, title: "Guidance", text: "Personalised direction for career, marriage and family.", to: "/astrology-services" as const },
];

function Home() {
  return (
    <>
      <section className="hero-bg border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{SITE.experience}</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">
              Technology Calculates.
              <br />
              <span className="gold-text">Experience Interprets.</span>
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Generate your Janam Kundli in seconds with a precise sidereal (Lahiri) engine — then
              understand it through a conversation with Prashant Shrivastava, a practising Vedic
              astrologer from {SITE.city} with 22 years at the chart.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/kundli" className="btn-gold">
                Generate Free Kundli
              </Link>
              <a
                className="btn-outline"
                target="_blank"
                rel="noreferrer"
                href={waLink("Namaste, I would like to discuss my Kundli.")}
              >
                Discuss on WhatsApp
              </a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
              {[
                ["22+", "Years of practice"],
                ["9", "Grahas analysed"],
                ["27", "Nakshatras"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl gold-text">{n}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="animate-slow-spin absolute -inset-6 rounded-full border border-dashed border-primary/25" />
            <img
              src={PRASHANT_PHOTO}
              alt="Astrologer Prashant Shrivastava"
              className="relative w-full rounded-2xl border border-primary/30 object-cover shadow-[var(--shadow-gold)]"
              loading="eager"
            />
            <div className="surface relative -mt-8 mx-6 p-4 text-center">
              <p className="font-display text-xl gold-text">Prashant Shrivastava</p>
              <p className="text-xs text-muted-foreground">Vedic Astrologer · {SITE.city}</p>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="The journey, not just the chart"
        intro="Kundli → Understanding → Discussion → Gemstones & Puja → Personalised guidance. Every step of this site follows that order."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {JOURNEY.map((j) => (
            <Link key={j.title} to={j.to} className="surface block p-6 transition-transform hover:-translate-y-1">
              <j.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-xl">{j.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{j.text}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Astrology Services"
        intro="Traditional analysis across the areas people most often bring to a Jyotishi."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 9).map((s) => (
            <Card key={s.slug} className="p-5">
              <h3 className="font-display text-xl text-primary">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/astrology-services" className="btn-outline">
            View all services
          </Link>
        </div>
      </Section>

      <Section title="Gemstones & Puja Remedies" intro="Studied chart-first — never prescribed by sign alone.">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-display text-2xl">Nine Traditional Gemstones</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {GEMSTONES.map((g) => (
                <Link
                  key={g.slug}
                  to="/gemstones/$slug"
                  params={{ slug: g.slug }}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                >
                  {g.name}
                </Link>
              ))}
            </div>
            <Link to="/gemstones" className="btn-outline mt-6">
              Explore gemstones
            </Link>
          </Card>
          <Card>
            <h3 className="font-display text-2xl">Graha & Dosha Pujas</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {PUJAS.slice(0, 10).map((p) => (
                <Link
                  key={p.slug}
                  to="/puja-remedies/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                >
                  {p.name}
                </Link>
              ))}
            </div>
            <Link to="/puja-remedies" className="btn-outline mt-6">
              Explore Pujas
            </Link>
          </Card>
        </div>
      </Section>

      <Section>
        <Card className="text-center">
          <h2 className="font-display text-3xl md:text-4xl">Your Kundli deserves a conversation</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Software can place nine planets across twelve houses. It cannot weigh them against your
            life. That judgement is what 22 years of practice provides.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/discuss-your-kundli" className="btn-gold">
              Discuss Your Kundli
            </Link>
            <a href={`tel:${SITE.phone}`} className="btn-outline">
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </Card>
      </Section>
    </>
  );
}
