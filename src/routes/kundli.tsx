import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { computeKundli, formatDeg, type BirthInput } from "@/lib/astro";
import { KundliChart } from "@/components/KundliChart";
import { Card, PageHero, Section } from "@/components/site-chrome";
import { SITE, waLink } from "@/data/site";

export const Route = createFileRoute("/kundli")({
  head: () => ({
    meta: [
      { title: "Free Kundli Online — Janam Kundli with Chart, Dasha & Doshas" },
      {
        name: "description",
        content:
          "Generate your free online Janam Kundli instantly — Lagna chart, Navamsa, planetary positions, Nakshatra, Vimshottari Dasha, Yogas and Doshas, calculated with sidereal Lahiri ayanamsa.",
      },
      { property: "og:title", content: "Free Kundli Online — Janam Kundli with Chart & Dasha" },
      {
        property: "og:description",
        content:
          "Instant Vedic birth chart with planetary positions, Nakshatra, Dasha, Yogas and Doshas. Then discuss it with Prashant Shrivastava.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kundli" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/kundli" }],
  }),
  component: KundliPage,
});

const CITIES: Record<string, { lat: number; lon: number; tz: number }> = {
  "Kota, Rajasthan": { lat: 25.18, lon: 75.83, tz: 5.5 },
  "Delhi": { lat: 28.61, lon: 77.21, tz: 5.5 },
  "Mumbai": { lat: 19.08, lon: 72.88, tz: 5.5 },
  "Jaipur": { lat: 26.91, lon: 75.79, tz: 5.5 },
  "Kolkata": { lat: 22.57, lon: 88.36, tz: 5.5 },
  "Chennai": { lat: 13.08, lon: 80.27, tz: 5.5 },
  "Bengaluru": { lat: 12.97, lon: 77.59, tz: 5.5 },
  "Hyderabad": { lat: 17.39, lon: 78.49, tz: 5.5 },
  "Lucknow": { lat: 26.85, lon: 80.95, tz: 5.5 },
  "Indore": { lat: 22.72, lon: 75.86, tz: 5.5 },
  "Other / Custom": { lat: 25.18, lon: 75.83, tz: 5.5 },
};

const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

function KundliPage() {
  const [form, setForm] = useState({
    name: "",
    date: "1995-01-01",
    time: "12:00",
    place: "Kota, Rajasthan",
    lat: "25.18",
    lon: "75.83",
    tz: "5.5",
    gender: "",
  });
  const [submitted, setSubmitted] = useState<BirthInput | null>(null);

  const kundli = useMemo(() => (submitted ? computeKundli(submitted) : null), [submitted]);

  const set = (k: string, v: string) =>
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "place" && CITIES[v]) {
        next.lat = String(CITIES[v]!.lat);
        next.lon = String(CITIES[v]!.lon);
        next.tz = String(CITIES[v]!.tz);
      }
      return next;
    });

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <>
      <PageHero
        eyebrow="Free Kundli"
        title="Generate Your Janam Kundli"
        subtitle="Enter your birth details to get your Lagna chart, Navamsa, planetary positions, Nakshatra, Vimshottari Dasha, Yogas and Doshas — calculated with sidereal (Lahiri) ayanamsa."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <Card className="h-fit">
            <h2 className="font-display text-2xl">Birth Details</h2>
            <form
              className="mt-5 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted({
                  name: form.name || "Native",
                  date: form.date,
                  time: form.time,
                  place: form.place,
                  lat: Number(form.lat),
                  lon: Number(form.lon),
                  tz: Number(form.tz),
                  gender: form.gender,
                });
              }}
            >
              <label className="grid gap-1 text-sm">
                <span className="text-muted-foreground">Full Name</span>
                <input
                  className={field}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1 text-sm">
                  <span className="text-muted-foreground">Date of Birth</span>
                  <input
                    type="date"
                    required
                    className={field}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-muted-foreground">Time of Birth</span>
                  <input
                    type="time"
                    required
                    className={field}
                    value={form.time}
                    onChange={(e) => set("time", e.target.value)}
                  />
                </label>
              </div>
              <label className="grid gap-1 text-sm">
                <span className="text-muted-foreground">Place of Birth</span>
                <select
                  className={field}
                  value={form.place}
                  onChange={(e) => set("place", e.target.value)}
                >
                  {Object.keys(CITIES).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="grid gap-1 text-xs">
                  <span className="text-muted-foreground">Latitude</span>
                  <input className={field} value={form.lat} onChange={(e) => set("lat", e.target.value)} />
                </label>
                <label className="grid gap-1 text-xs">
                  <span className="text-muted-foreground">Longitude</span>
                  <input className={field} value={form.lon} onChange={(e) => set("lon", e.target.value)} />
                </label>
                <label className="grid gap-1 text-xs">
                  <span className="text-muted-foreground">Time Zone</span>
                  <input className={field} value={form.tz} onChange={(e) => set("tz", e.target.value)} />
                </label>
              </div>
              <button type="submit" className="btn-gold mt-2 w-full">
                Generate Kundli
              </button>
              <p className="text-xs text-muted-foreground">
                Accurate birth time matters — the Lagna changes roughly every two hours.
              </p>
            </form>
          </Card>

          <div>
            {!kundli ? (
              <Card className="grid h-full min-h-72 place-items-center text-center">
                <div>
                  <p className="font-display text-2xl text-primary">Your chart appears here</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Technology calculates the chart instantly. Interpretation comes from{" "}
                    {SITE.experience.toLowerCase()} — discuss it personally once it is generated.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid gap-8">
                <div className="grid gap-4 sm:grid-cols-4">
                  {[
                    ["Lagna", kundli.lagna],
                    ["Moon Sign", kundli.moonSign],
                    ["Sun Sign", kundli.sunSign],
                    ["Nakshatra", `${kundli.janmaNakshatra} (Pada ${kundli.janmaPada})`],
                  ].map(([k, v]) => (
                    <Card key={k as string} className="p-4">
                      <p className="text-xs uppercase tracking-widest text-primary">{k}</p>
                      <p className="mt-1 font-display text-lg">{v}</p>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <KundliChart
                    lagnaSign={kundli.lagnaSign}
                    items={kundli.planets.map((p) => ({ name: p.name, signIndex: p.signIndex }))}
                    title="Lagna Chart (D1)"
                  />
                  <KundliChart
                    lagnaSign={kundli.ascNavamsa}
                    items={kundli.navamsa}
                    title="Navamsa Chart (D9)"
                  />
                </div>

                <Card className="overflow-x-auto">
                  <h3 className="font-display text-2xl">Planetary Positions</h3>
                  <table className="mt-4 w-full min-w-[520px] text-left text-sm">
                    <thead className="text-xs uppercase tracking-widest text-primary">
                      <tr>
                        {["Planet", "Sign", "Degree", "House", "Nakshatra", "Pada", "Motion"].map((h) => (
                          <th key={h} className="pb-2 pr-3 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {kundli.planets.map((p) => (
                        <tr key={p.name} className="border-t border-border">
                          <td className="py-2 pr-3 text-foreground">{p.name}</td>
                          <td className="py-2 pr-3">{p.sign}</td>
                          <td className="py-2 pr-3">{formatDeg(p.degInSign)}</td>
                          <td className="py-2 pr-3">{p.house}</td>
                          <td className="py-2 pr-3">{p.nakshatra}</td>
                          <td className="py-2 pr-3">{p.pada}</td>
                          <td className="py-2 pr-3">{p.retrograde ? "Retrograde" : "Direct"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>

                <Card>
                  <h3 className="font-display text-2xl">Vimshottari Dasha</h3>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {kundli.dashas.map((d) => (
                      <div key={d.lord} className="rounded-lg border border-border p-3 text-sm">
                        <p className="text-foreground">
                          {d.lord} Mahadasha{" "}
                          <span className="text-xs text-muted-foreground">({d.years} yrs)</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {fmt(d.start)} — {fmt(d.end)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <h3 className="font-display text-2xl">Yogas Detected</h3>
                    {kundli.yogas.length === 0 ? (
                      <p className="mt-3 text-sm text-muted-foreground">
                        No yogas from this rule set are present. A complete reading considers many
                        more combinations.
                      </p>
                    ) : (
                      <ul className="mt-3 space-y-4 text-sm">
                        {kundli.yogas.map((y) => (
                          <li key={y.name}>
                            <p className="text-primary">{y.name}</p>
                            <p className="text-muted-foreground">{y.formation}</p>
                            <p className="text-muted-foreground">{y.meaning}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                  <Card>
                    <h3 className="font-display text-2xl">Dosha Analysis</h3>
                    <ul className="mt-3 space-y-4 text-sm">
                      {kundli.doshas.map((d) => (
                        <li key={d.name}>
                          <p className="text-primary">
                            {d.name} — {d.present ? "Indicated" : "Not indicated"}
                          </p>
                          <p className="text-muted-foreground">{d.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <Card className="text-center">
                  <h3 className="font-display text-2xl">A chart is data. A reading is judgement.</h3>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
                    Software cannot weigh your Dasha against your life situation. Discuss this chart
                    directly with Prashant Shrivastava.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <a
                      className="btn-gold"
                      target="_blank"
                      rel="noreferrer"
                      href={waLink(
                        `Namaste, I generated my Kundli. Lagna: ${kundli.lagna}, Moon: ${kundli.moonSign}, Nakshatra: ${kundli.janmaNakshatra}. I would like to discuss it.`,
                      )}
                    >
                      Discuss on WhatsApp
                    </a>
                    <Link to="/discuss-your-kundli" className="btn-outline">
                      Discuss Your Kundli
                    </Link>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
