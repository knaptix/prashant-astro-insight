// Sidereal (Lahiri) Vedic astrology calculation engine.
// Astronomical positions use JPL low-precision Keplerian elements (planets),
// standard solar theory (Sun) and an abridged Meeus lunar series (Moon).
// Accuracy is within a few arc-minutes — suitable for signs, nakshatras and dashas.

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const norm = (x: number) => ((x % 360) + 360) % 360;

export const SIGNS = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
];

export const SIGN_SHORT = [
  "Ari",
  "Tau",
  "Gem",
  "Can",
  "Leo",
  "Vir",
  "Lib",
  "Sco",
  "Sag",
  "Cap",
  "Aqu",
  "Pis",
];

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

const DASHA_LORDS = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

export const PLANET_ORDER = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
] as const;
export type PlanetName = (typeof PLANET_ORDER)[number];

export const PLANET_SHORT: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

function julianDay(y: number, m: number, d: number, hoursUT: number) {
  let yy = y;
  let mm = m;
  if (mm <= 2) {
    yy -= 1;
    mm += 12;
  }
  const A = Math.floor(yy / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (yy + 4716)) +
    Math.floor(30.6001 * (mm + 1)) +
    d +
    B -
    1524.5 +
    hoursUT / 24
  );
}

type Elem = [number, number, number, number, number, number];
const ELEMENTS: Record<string, { e: Elem; r: Elem }> = {
  Mercury: {
    e: [0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593],
    r: [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
  },
  Venus: {
    e: [0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255],
    r: [0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418],
  },
  Earth: {
    e: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0],
    r: [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0],
  },
  Mars: {
    e: [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
    r: [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
  },
  Jupiter: {
    e: [5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909],
    r: [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
  },
  Saturn: {
    e: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448],
    r: [-0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
  },
};

function heliocentric(name: string, T: number) {
  const { e: E, r: R } = ELEMENTS[name]!;
  const a = E[0] + R[0] * T;
  const ec = E[1] + R[1] * T;
  const I = (E[2] + R[2] * T) * D2R;
  const L = E[3] + R[3] * T;
  const wbar = E[4] + R[4] * T;
  const O = (E[5] + R[5] * T) * D2R;
  const w = (wbar - (E[5] + R[5] * T)) * D2R;
  let M = norm(L - wbar);
  if (M > 180) M -= 360;
  const Mr = M * D2R;
  let Ecc = Mr + ec * Math.sin(Mr);
  for (let i = 0; i < 8; i++) {
    Ecc -= (Ecc - ec * Math.sin(Ecc) - Mr) / (1 - ec * Math.cos(Ecc));
  }
  const xv = a * (Math.cos(Ecc) - ec);
  const yv = a * Math.sqrt(1 - ec * ec) * Math.sin(Ecc);
  const x =
    xv * (Math.cos(w) * Math.cos(O) - Math.sin(w) * Math.sin(O) * Math.cos(I)) +
    yv * (-Math.sin(w) * Math.cos(O) - Math.cos(w) * Math.sin(O) * Math.cos(I));
  const y =
    xv * (Math.cos(w) * Math.sin(O) + Math.sin(w) * Math.cos(O) * Math.cos(I)) +
    yv * (-Math.sin(w) * Math.sin(O) + Math.cos(w) * Math.cos(O) * Math.cos(I));
  const z = xv * Math.sin(w) * Math.sin(I) + yv * Math.cos(w) * Math.sin(I);
  return { x, y, z };
}

function moonLongitude(T: number) {
  const Lp = 218.3164477 + 481267.88123421 * T;
  const D = 297.8501921 + 445267.1114034 * T;
  const M = 357.5291092 + 35999.0502909 * T;
  const Mp = 134.9633964 + 477198.8675055 * T;
  const F = 93.272095 + 483202.0175233 * T;
  const d = D * D2R,
    m = M * D2R,
    mp = Mp * D2R,
    f = F * D2R;
  const s =
    6.288774 * Math.sin(mp) +
    1.274027 * Math.sin(2 * d - mp) +
    0.658314 * Math.sin(2 * d) +
    0.213618 * Math.sin(2 * mp) -
    0.185116 * Math.sin(m) -
    0.114332 * Math.sin(2 * f) +
    0.058793 * Math.sin(2 * d - 2 * mp) +
    0.057066 * Math.sin(2 * d - m - mp) +
    0.053322 * Math.sin(2 * d + mp) +
    0.045758 * Math.sin(2 * d - m) -
    0.040923 * Math.sin(m - mp) -
    0.034720 * Math.sin(d) -
    0.030383 * Math.sin(m + mp) +
    0.015327 * Math.sin(2 * d - 2 * f) -
    0.012528 * Math.sin(mp + 2 * f) +
    0.010980 * Math.sin(mp - 2 * f);
  return norm(Lp + s);
}

function ayanamsa(jd: number) {
  // Lahiri (Chitrapaksha), linear approximation ~50.29"/yr around J2000 (23.853°).
  const years = (jd - 2451545.0) / 365.25;
  return 23.853 + 0.0139722 * years;
}

export type BirthInput = {
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  place: string;
  lat: number;
  lon: number;
  tz: number; // hours offset
  gender?: string;
};

export type PlanetPosition = {
  name: PlanetName;
  lon: number;
  signIndex: number;
  sign: string;
  degInSign: number;
  nakshatra: string;
  pada: number;
  house: number;
  retrograde: boolean;
};

export type Kundli = ReturnType<typeof computeKundli>;

function nakInfo(lon: number) {
  const span = 360 / 27;
  const idx = Math.floor(lon / span);
  const within = lon - idx * span;
  return { index: idx, name: NAKSHATRAS[idx]!, pada: Math.floor(within / (span / 4)) + 1 };
}

export function formatDeg(d: number) {
  const deg = Math.floor(d);
  const mFloat = (d - deg) * 60;
  const min = Math.floor(mFloat);
  const sec = Math.round((mFloat - min) * 60);
  return `${deg}° ${String(min).padStart(2, "0")}' ${String(sec).padStart(2, "0")}"`;
}

function tropicalLongitudes(jd: number) {
  const T = (jd - 2451545.0) / 36525;
  const earth = heliocentric("Earth", T);
  const out: Record<string, number> = {};
  out["Sun"] = norm(Math.atan2(-earth.y, -earth.x) * R2D);
  out["Moon"] = moonLongitude(T);
  for (const p of ["Mercury", "Venus", "Mars", "Jupiter", "Saturn"]) {
    const h = heliocentric(p, T);
    out[p] = norm(Math.atan2(h.y - earth.y, h.x - earth.x) * R2D);
  }
  // Mean lunar node (Rahu)
  const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;
  out["Rahu"] = norm(omega);
  out["Ketu"] = norm(omega + 180);
  return out;
}

export function computeKundli(input: BirthInput) {
  const [y, m, d] = input.date.split("-").map(Number) as [number, number, number];
  const [hh, mi] = input.time.split(":").map(Number) as [number, number];
  const localHours = hh + mi / 60;
  const utHours = localHours - input.tz;
  const jd = julianDay(y, m, d, utHours);
  const ayan = ayanamsa(jd);

  const trop = tropicalLongitudes(jd);
  const tropPrev = tropicalLongitudes(jd - 1);

  // Ascendant
  const T = (jd - 2451545.0) / 36525;
  let gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  gmst = norm(gmst);
  const lst = norm(gmst + input.lon);
  const eps = (23.439291 - 0.0130042 * T) * D2R;
  const ramc = lst * D2R;
  const latR = input.lat * D2R;
  let asc =
    Math.atan2(
      Math.cos(ramc),
      -(Math.sin(ramc) * Math.cos(eps) + Math.tan(latR) * Math.sin(eps)),
    ) * R2D;
  asc = norm(asc);
  const ascSid = norm(asc - ayan);
  const lagnaSign = Math.floor(ascSid / 30);

  const planets: PlanetPosition[] = PLANET_ORDER.map((p) => {
    const sid = norm(trop[p]! - ayan);
    const sidPrev = norm(tropPrev[p]! - ayan);
    let diff = sid - sidPrev;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const signIndex = Math.floor(sid / 30);
    const nk = nakInfo(sid);
    return {
      name: p,
      lon: sid,
      signIndex,
      sign: SIGNS[signIndex]!,
      degInSign: sid - signIndex * 30,
      nakshatra: nk.name,
      pada: nk.pada,
      house: ((signIndex - lagnaSign + 12) % 12) + 1,
      retrograde: p === "Rahu" || p === "Ketu" ? true : diff < 0,
    };
  });

  const moon = planets[1]!;
  const sun = planets[0]!;
  const moonNak = nakInfo(moon.lon);

  // Vimshottari Dasha
  const span = 360 / 27;
  const elapsedFraction = (moon.lon - moonNak.index * span) / span;
  const startLordIdx = moonNak.index % 9;
  const birth = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
  const YEAR_MS = 365.2425 * 24 * 3600 * 1000;
  let cursor = birth.getTime() - elapsedFraction * DASHA_YEARS[DASHA_LORDS[startLordIdx]!]! * YEAR_MS;
  const dashas: {
    lord: string;
    start: Date;
    end: Date;
    years: number;
    antar: { lord: string; start: Date; end: Date }[];
  }[] = [];
  for (let i = 0; i < 9; i++) {
    const lord = DASHA_LORDS[(startLordIdx + i) % 9]!;
    const years = DASHA_YEARS[lord]!;
    const start = new Date(cursor);
    const end = new Date(cursor + years * YEAR_MS);
    const antar: { lord: string; start: Date; end: Date }[] = [];
    let ac = cursor;
    for (let j = 0; j < 9; j++) {
      const al = DASHA_LORDS[(DASHA_LORDS.indexOf(lord) + j) % 9]!;
      const ay = (years * DASHA_YEARS[al]!) / 120;
      antar.push({ lord: al, start: new Date(ac), end: new Date(ac + ay * YEAR_MS) });
      ac += ay * YEAR_MS;
    }
    dashas.push({ lord, start, end, years, antar });
    cursor += years * YEAR_MS;
  }

  // Navamsa (D9)
  const navamsa = planets.map((p) => {
    const n = Math.floor((p.lon % 30) / (30 / 9));
    const base = [0, 9, 6, 3][p.signIndex % 4]!;
    return { name: p.name, signIndex: (base + n) % 12 };
  });
  const ascNavamsa =
    ([0, 9, 6, 3][lagnaSign % 4]! + Math.floor((ascSid % 30) / (30 / 9))) % 12;

  const yogas = detectYogas(planets, lagnaSign);
  const doshas = detectDoshas(planets, lagnaSign);

  return {
    input,
    jd,
    ayanamsa: ayan,
    lagnaSign,
    lagnaDeg: ascSid - lagnaSign * 30,
    lagna: SIGNS[lagnaSign]!,
    moonSign: moon.sign,
    sunSign: sun.sign,
    janmaNakshatra: moonNak.name,
    janmaPada: moonNak.pada,
    planets,
    dashas,
    navamsa,
    ascNavamsa,
    yogas,
    doshas,
  };
}

function house(p: PlanetPosition) {
  return p.house;
}

function detectYogas(planets: PlanetPosition[], _lagnaSign: number) {
  const by = Object.fromEntries(planets.map((p) => [p.name, p])) as Record<
    PlanetName,
    PlanetPosition
  >;
  const res: { name: string; planets: string; houses: string; formation: string; meaning: string }[] =
    [];
  const kendra = [1, 4, 7, 10];

  // Gajakesari
  const diff = Math.abs(by.Jupiter.signIndex - by.Moon.signIndex);
  const rel = ((by.Jupiter.signIndex - by.Moon.signIndex + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(rel) || diff === 0) {
    res.push({
      name: "Gajakesari Yoga",
      planets: "Jupiter, Moon",
      houses: `${house(by.Jupiter)} & ${house(by.Moon)}`,
      formation: "Jupiter is placed in a kendra (1st, 4th, 7th or 10th) from the Moon.",
      meaning:
        "Traditionally associated with clarity of thought, learning and respect. Its actual expression is read alongside the strength of both planets and the running Dasha.",
    });
  }
  // Budhaditya
  if (by.Sun.signIndex === by.Mercury.signIndex) {
    res.push({
      name: "Budhaditya Yoga",
      planets: "Sun, Mercury",
      houses: `${house(by.Sun)}`,
      formation: "Sun and Mercury occupy the same sign.",
      meaning:
        "Traditionally linked with intelligence, communication and analytical ability. Combustion and house placement are considered before interpretation.",
    });
  }
  // Chandra-Mangal
  if (by.Moon.signIndex === by.Mars.signIndex) {
    res.push({
      name: "Chandra-Mangal Yoga",
      planets: "Moon, Mars",
      houses: `${house(by.Moon)}`,
      formation: "Moon and Mars are conjunct in the same sign.",
      meaning:
        "Traditionally associated with enterprise and resourcefulness in financial matters, read in context of the whole chart.",
    });
  }
  // Panch Mahapurusha
  const mp: Record<string, { own: number[]; exalt: number; name: string }> = {
    Mars: { own: [0, 7], exalt: 9, name: "Ruchaka Yoga" },
    Mercury: { own: [2, 5], exalt: 5, name: "Bhadra Yoga" },
    Jupiter: { own: [8, 11], exalt: 3, name: "Hamsa Yoga" },
    Venus: { own: [1, 6], exalt: 11, name: "Malavya Yoga" },
    Saturn: { own: [9, 10], exalt: 6, name: "Shasha Yoga" },
  };
  for (const [pl, cfg] of Object.entries(mp)) {
    const p = by[pl as PlanetName];
    if (kendra.includes(p.house) && (cfg.own.includes(p.signIndex) || p.signIndex === cfg.exalt)) {
      res.push({
        name: `${cfg.name} (Panch Mahapurusha)`,
        planets: pl,
        houses: `${p.house}`,
        formation: `${pl} is in its own or exaltation sign while occupying a kendra house.`,
        meaning:
          "One of the five Mahapurusha Yogas, traditionally associated with the qualities of that planet expressing strongly in the personality.",
      });
    }
  }
  // Dhana yoga (simplified): 2nd & 11th house occupation
  const dhana = planets.filter((p) => [2, 11].includes(p.house) && !["Rahu", "Ketu"].includes(p.name));
  if (dhana.length >= 2) {
    res.push({
      name: "Dhana Yoga (indicative)",
      planets: dhana.map((p) => p.name).join(", "),
      houses: dhana.map((p) => p.house).join(", "),
      formation: "Benefic occupation of the 2nd and 11th houses of accumulation and gains.",
      meaning:
        "Traditionally studied in relation to resources and income. A complete reading requires lordship analysis, which is best discussed personally.",
    });
  }
  return res;
}

function detectDoshas(planets: PlanetPosition[], _lagnaSign: number) {
  const by = Object.fromEntries(planets.map((p) => [p.name, p])) as Record<
    PlanetName,
    PlanetPosition
  >;
  const out: { name: string; present: boolean; detail: string }[] = [];

  const marsHouse = by.Mars.house;
  const manglik = [1, 2, 4, 7, 8, 12].includes(marsHouse);
  out.push({
    name: "Manglik (Mangal) Dosha",
    present: manglik,
    detail: manglik
      ? `Mars is placed in house ${marsHouse} from the Lagna, one of the placements traditionally counted for Manglik Dosha. Many classical texts also apply cancellation rules, so this should be evaluated individually.`
      : `Mars is in house ${marsHouse} from the Lagna, which is not among the placements traditionally counted for Manglik Dosha in this rule set.`,
  });

  const rahu = by.Rahu.lon;
  const ketu = by.Ketu.lon;
  const between = (l: number) => {
    const a = norm(l - rahu);
    return a > 0 && a < 180;
  };
  const others = planets.filter((p) => !["Rahu", "Ketu"].includes(p.name));
  const allOneSide = others.every((p) => between(p.lon)) || others.every((p) => !between(p.lon));
  out.push({
    name: "Kaal Sarp Dosha",
    present: allOneSide,
    detail: allOneSide
      ? "All seven planets fall on one side of the Rahu–Ketu axis, the condition traditionally described as Kaal Sarp Yoga/Dosha. Partial and full forms are distinguished in practice."
      : "The seven planets are distributed on both sides of the Rahu–Ketu axis, so this chart does not meet the traditional Kaal Sarp condition.",
  });

  const pitru = [by.Sun, by.Moon].some((p) => p.signIndex === by.Rahu.signIndex || p.signIndex === by.Ketu.signIndex) || by.Sun.house === 9;
  out.push({
    name: "Pitru Dosha (indicative)",
    present: pitru,
    detail: pitru
      ? "Luminary–node associations or a 9th house Sun placement are present, factors some traditions consider while discussing Pitru Dosha. This is an indicative reading only."
      : "The commonly cited indicators used here are not present in this chart.",
  });

  void ketu;
  return out;
}
