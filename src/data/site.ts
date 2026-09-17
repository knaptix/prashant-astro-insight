export const SITE = {
  name: "Prashant Shrivastava",
  tagline: "Technology Calculates. Experience Interprets.",
  experience: "22 Years of Experience in Astrology",
  phone: "+919521407763",
  phoneDisplay: "+91 95214 07763",
  city: "Kota, Rajasthan",
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/kundli", label: "Kundli" },
  { to: "/discuss-your-kundli", label: "Discuss Your Kundli" },
  { to: "/astrology-services", label: "Services" },
  { to: "/gemstones", label: "Gemstones" },
  { to: "/puja-remedies", label: "Puja & Remedies" },
  { to: "/astrology", label: "Knowledge" },
  { to: "/about-prashant-shrivastava", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type Gemstone = {
  slug: string;
  name: string;
  planet: string;
  color: string;
  significance: string;
  associations: string;
  quality: string;
  origin: string;
  care: string;
};

export const GEMSTONES: Gemstone[] = [
  {
    slug: "ruby",
    name: "Ruby (Manik)",
    planet: "Sun (Surya)",
    color: "oklch(0.55 0.19 22)",
    significance:
      "Ruby is traditionally associated with the Sun, the karaka of vitality, authority and the self in Vedic astrology.",
    associations:
      "Astrologers traditionally study the Sun's placement, its house lordship, strength and the running Dasha before considering a Ruby.",
    quality:
      "Colour saturation, clarity, cut and absence of visible fractures are the usual quality parameters discussed for Ruby.",
    origin: "Burma, Mozambique, Thailand and Madagascar are commonly cited sources.",
    care: "Clean with mild soapy water and a soft cloth; avoid harsh chemicals and ultrasonic cleaning for treated stones.",
  },
  {
    slug: "pearl",
    name: "Pearl (Moti)",
    planet: "Moon (Chandra)",
    color: "oklch(0.92 0.02 90)",
    significance:
      "Pearl is traditionally linked with the Moon, which signifies the mind, emotions and the mother in classical texts.",
    associations:
      "The Moon's sign, Nakshatra, waxing or waning state and Dasha periods are considered before Pearl is discussed.",
    quality: "Lustre, surface smoothness, shape and nacre thickness are the commonly evaluated factors.",
    origin: "Basra, South Sea and freshwater cultured pearls are the widely traded varieties.",
    care: "Keep away from perfume and acidic substances; wipe with a soft dry cloth after wear.",
  },
  {
    slug: "red-coral",
    name: "Red Coral (Moonga)",
    planet: "Mars (Mangal)",
    color: "oklch(0.6 0.17 32)",
    significance:
      "Red Coral is traditionally associated with Mars, the karaka of courage, energy and property matters.",
    associations:
      "Mars's house placement, aspects and its role in Manglik considerations are studied before Coral is discussed.",
    quality: "Even colour, smooth polish and absence of pits or white patches are usually preferred.",
    origin: "Italian (Mediterranean) and Japanese corals are the most discussed sources.",
    care: "Coral is soft and organic; avoid chemicals, heat and abrasive cleaning.",
  },
  {
    slug: "emerald",
    name: "Emerald (Panna)",
    planet: "Mercury (Budh)",
    color: "oklch(0.62 0.15 158)",
    significance:
      "Emerald is traditionally associated with Mercury, connected with intellect, speech, analysis and commerce.",
    associations:
      "Mercury's combustion, retrogression, sign and Dasha are all reviewed before an Emerald is considered.",
    quality: "Colour, transparency, inclusions (jardin) and oil treatment are key discussion points.",
    origin: "Colombia, Zambia and Brazil are commonly cited origins.",
    care: "Most emeralds are oiled; avoid ultrasonic cleaners, steam and detergents.",
  },
  {
    slug: "yellow-sapphire",
    name: "Yellow Sapphire (Pukhraj)",
    planet: "Jupiter (Guru)",
    color: "oklch(0.85 0.14 90)",
    significance:
      "Yellow Sapphire is traditionally associated with Jupiter, the karaka of wisdom, teachers, children and dharma.",
    associations:
      "Jupiter's strength, lordship for the Lagna and its Dasha timing are traditionally studied first.",
    quality: "Even golden-yellow colour, eye clarity and good cut are commonly preferred.",
    origin: "Sri Lanka (Ceylon), Thailand and Madagascar are common sources.",
    care: "Sapphires are hard and durable; clean with mild soap and water.",
  },
  {
    slug: "diamond",
    name: "Diamond (Heera)",
    planet: "Venus (Shukra)",
    color: "oklch(0.95 0.01 250)",
    significance:
      "Diamond is traditionally associated with Venus, linked with relationships, comfort, art and refinement.",
    associations:
      "Venus's placement, dignity and relationship with the Lagna lord are considered in traditional evaluation.",
    quality: "The 4Cs — cut, colour, clarity and carat — remain the standard reference.",
    origin: "South Africa, Russia, Botswana and India are historic and modern sources.",
    care: "Durable but brittle at the edges; clean with warm soapy water.",
  },
  {
    slug: "blue-sapphire",
    name: "Blue Sapphire (Neelam)",
    planet: "Saturn (Shani)",
    color: "oklch(0.5 0.15 262)",
    significance:
      "Blue Sapphire is traditionally associated with Saturn, the karaka of discipline, longevity, labour and structure.",
    associations:
      "Classical practice is unusually cautious here — Saturn's functional role, Dasha and chart context are examined carefully before any discussion of Neelam.",
    quality: "Uniform blue colour, transparency and absence of milkiness are usually preferred.",
    origin: "Kashmir, Sri Lanka, Myanmar and Madagascar are cited origins.",
    care: "Hard and durable; simple soapy-water cleaning is sufficient.",
  },
  {
    slug: "hessonite",
    name: "Hessonite (Gomed)",
    planet: "Rahu",
    color: "oklch(0.6 0.13 55)",
    significance:
      "Hessonite is traditionally associated with Rahu, linked with unconventional paths, foreign matters and sudden events.",
    associations:
      "Rahu's house, sign, conjunctions and Dasha are traditionally reviewed before Gomed is discussed.",
    quality: "Honey to cinnamon colour with good transparency is typically preferred.",
    origin: "Sri Lanka and India are the commonly referenced sources.",
    care: "Avoid sharp knocks and strong chemicals; clean gently.",
  },
  {
    slug: "cat-eye",
    name: "Cat's Eye (Lehsunia)",
    planet: "Ketu",
    color: "oklch(0.72 0.09 110)",
    significance:
      "Cat's Eye is traditionally associated with Ketu, connected with detachment, research and spiritual inclination.",
    associations:
      "Ketu's placement relative to the Lagna, Moon and the running Dasha is traditionally studied first.",
    quality: "A sharp, centred chatoyant band and good body colour are the usual quality markers.",
    origin: "Sri Lanka and India are common sources.",
    care: "Clean with a soft cloth; avoid ultrasonic cleaning.",
  },
];

export type Puja = {
  slug: string;
  name: string;
  graha: string;
  what: string;
  significance: string;
  when: string;
  how: string;
  concerns: string;
};

export const PUJAS: Puja[] = [
  {
    slug: "navagraha-puja",
    name: "Navagraha Puja",
    graha: "All nine Grahas",
    what: "Navagraha Puja is the traditional worship of the nine planetary deities — Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu and Ketu — together.",
    significance:
      "It is performed as a collective invocation rather than for a single planet, and is one of the most widely observed traditional remedial practices.",
    when: "Often considered at the start of new ventures, during difficult Dasha periods, or when several planetary factors are under discussion in a chart.",
    how: "The Puja typically includes Sankalp, Kalash Sthapana, Navagraha invocation, Mantra Japa for each Graha, Havan and Aarti, performed by qualified priests.",
    concerns: "General planetary concerns, life transitions, family well-being and new beginnings.",
  },
  {
    slug: "surya-puja",
    name: "Surya Puja",
    graha: "Sun (Surya)",
    what: "Surya Puja is the traditional worship of the Sun, the karaka of the self, vitality, authority and the father.",
    significance: "In classical texts the Sun represents Atma, confidence, recognition and government-related matters.",
    when: "Traditionally considered when Sun-related placements, Dasha or house matters are discussed in a chart.",
    how: "Typically includes Surya Arghya, Aditya Hridaya Stotra, Surya Mantra Japa and Havan.",
    concerns: "Confidence, recognition, relations with authority and paternal matters.",
  },
  {
    slug: "chandra-puja",
    name: "Chandra Puja",
    graha: "Moon (Chandra)",
    what: "Chandra Puja is the traditional worship of the Moon, the karaka of mind, emotions and the mother.",
    significance: "The Moon governs Manas — mental steadiness, emotional rhythm and nurturing in classical astrology.",
    when: "Traditionally considered when Moon placements, Chandra Dasha or mental restlessness are being discussed.",
    how: "Typically includes Chandra Mantra Japa, Shiva worship, white offerings and Havan.",
    concerns: "Emotional balance, sleep, maternal matters and mental peace.",
  },
  {
    slug: "mangal-puja",
    name: "Mangal Puja",
    graha: "Mars (Mangal)",
    what: "Mangal Puja is the traditional worship of Mars, associated with energy, courage, siblings and property.",
    significance: "Mars is the karaka of valour and initiative in the classical framework.",
    when: "Often considered when Mars placements, Manglik factors or Mangal Dasha are part of the discussion.",
    how: "Typically includes Mangal Mantra Japa, Hanuman worship on Tuesdays and Havan.",
    concerns: "Disputes, property matters, impatience and marriage-related Manglik discussions.",
  },
  {
    slug: "budh-puja",
    name: "Budh Puja",
    graha: "Mercury (Budh)",
    what: "Budh Puja is the traditional worship of Mercury, associated with intellect, speech, trade and analysis.",
    significance: "Mercury is the karaka of communication and commerce in classical astrology.",
    when: "Considered when Mercury placements, education or business communication matters are discussed.",
    how: "Typically includes Budh Mantra Japa, green offerings and Havan on Wednesdays.",
    concerns: "Studies, speech, business communication and clarity of thinking.",
  },
  {
    slug: "guru-puja",
    name: "Guru Puja",
    graha: "Jupiter (Guru)",
    what: "Guru Puja is the traditional worship of Jupiter, the karaka of wisdom, teachers, children and dharma.",
    significance: "Jupiter is regarded as the great benefic and the significator of guidance and growth.",
    when: "Considered during Guru Dasha, Jupiter transits or discussions about learning, marriage and children.",
    how: "Typically includes Guru Mantra Japa, yellow offerings and Havan on Thursdays.",
    concerns: "Education, guidance, marriage prospects and family growth.",
  },
  {
    slug: "shukra-puja",
    name: "Shukra Puja",
    graha: "Venus (Shukra)",
    what: "Shukra Puja is the traditional worship of Venus, associated with relationships, comfort, art and refinement.",
    significance: "Venus is the karaka of marriage and material comforts in classical texts.",
    when: "Considered when Venus placements, relationship matters or Shukra Dasha are being discussed.",
    how: "Typically includes Shukra Mantra Japa, white and fragrant offerings and Havan on Fridays.",
    concerns: "Relationships, harmony at home, creativity and comforts.",
  },
  {
    slug: "shani-puja",
    name: "Shani Puja",
    graha: "Saturn (Shani)",
    what: "Shani Puja is the traditional worship of Saturn, associated with discipline, labour, delay and longevity.",
    significance: "Saturn is regarded as the karaka of karma, patience and structured effort.",
    when: "Commonly considered during Sade Sati, Shani Dhaiya, Shani Dasha or Saturn-related discussions.",
    how: "Typically includes Shani Mantra Japa, Hanuman Chalisa, sesame oil offerings and Havan on Saturdays.",
    concerns: "Delays, work pressure, chronic concerns and sustained effort.",
  },
  {
    slug: "rahu-puja",
    name: "Rahu Puja",
    graha: "Rahu",
    what: "Rahu Puja is the traditional worship associated with the north lunar node, linked with sudden events and unconventional paths.",
    significance: "Rahu is described as a shadow planet influencing ambition, confusion and foreign connections.",
    when: "Considered during Rahu Dasha, nodal conjunctions or Kaal Sarp discussions.",
    how: "Typically includes Rahu Mantra Japa, Durga worship and Havan.",
    concerns: "Confusion, sudden changes, foreign matters and mental unrest.",
  },
  {
    slug: "ketu-puja",
    name: "Ketu Puja",
    graha: "Ketu",
    what: "Ketu Puja is the traditional worship associated with the south lunar node, linked with detachment and inner enquiry.",
    significance: "Ketu is described as a shadow planet connected with moksha, research and renunciation.",
    when: "Considered during Ketu Dasha or when nodal placements are discussed in a chart.",
    how: "Typically includes Ketu Mantra Japa, Ganesha worship and Havan.",
    concerns: "Detachment, spiritual enquiry and unexplained obstacles.",
  },
  {
    slug: "manglik-dosha-puja",
    name: "Manglik Dosha Puja",
    graha: "Mars",
    what: "A Puja traditionally considered where Mars occupies the 1st, 2nd, 4th, 7th, 8th or 12th house in marriage-related discussions.",
    significance: "Classical texts also describe several cancellation conditions, so individual chart evaluation matters.",
    when: "Usually discussed before or during marriage matching.",
    how: "Typically includes Mangal Shanti Japa, Hanuman worship and Havan.",
    concerns: "Marriage matching, Manglik compatibility questions.",
  },
  {
    slug: "kaal-sarp-dosha-puja",
    name: "Kaal Sarp Dosha Puja",
    graha: "Rahu–Ketu axis",
    what: "A Puja traditionally associated with charts where all planets fall between Rahu and Ketu.",
    significance: "Traditionally discussed in relation to effort-heavy phases; interpretation varies widely between schools.",
    when: "Considered after the chart condition is confirmed and the Dasha context examined.",
    how: "Typically includes Naga worship, Rudrabhishek and Mantra Japa, often at recognised Kshetras.",
    concerns: "Repeated obstacles and effort-outcome gaps as traditionally described.",
  },
  {
    slug: "pitru-dosha-puja",
    name: "Pitru Dosha Puja",
    graha: "Sun, Rahu and the 9th house",
    what: "A traditional observance connected with ancestral remembrance and Shraddha practices.",
    significance: "Rooted in the Vedic tradition of honouring ancestors rather than in fear-based interpretation.",
    when: "Commonly observed during Pitru Paksha or when 9th house and nodal factors are discussed.",
    how: "Typically includes Tarpan, Shraddha rites, Brahman Bhoj and Havan.",
    concerns: "Family continuity, ancestral remembrance and lineage-related concerns.",
  },
  {
    slug: "nadi-dosha-remedies",
    name: "Nadi Dosha Remedies",
    graha: "Nakshatra-based",
    what: "Traditional remedies discussed when both charts share the same Nadi in Ashtakoota matching.",
    significance: "Classical texts describe exceptions and cancellations, so complete matching is examined.",
    when: "Discussed during Kundli Milan.",
    how: "Typically includes Mahamrityunjaya Japa and specific donations as advised.",
    concerns: "Marriage compatibility discussions.",
  },
  {
    slug: "bhakhut-dosha-remedies",
    name: "Bhakoot Dosha Remedies",
    graha: "Moon-sign based",
    what: "Traditional remedies discussed when the Moon signs of two charts fall in certain relative positions.",
    significance: "Bhakoot carries high weight in Ashtakoota, but cancellations are considered.",
    when: "Discussed during Kundli Milan.",
    how: "Typically includes Vishnu worship, Mantra Japa and advised observances.",
    concerns: "Marriage compatibility discussions.",
  },
];

export type Service = {
  slug: string;
  name: string;
  summary: string;
  points: { title: string; text: string }[];
  cta: string;
};

export const SERVICES: Service[] = [
  {
    slug: "birth-chart-analysis",
    name: "Birth Chart Analysis",
    summary:
      "A complete reading of your Lagna, planetary placements, houses, Nakshatras, Dashas, Yogas and Doshas.",
    points: [
      { title: "Lagna & Lagna Lord", text: "The foundation of the chart — temperament, direction and vitality." },
      { title: "Planetary Dignity", text: "Exaltation, debilitation, own sign and combustion are reviewed." },
      { title: "Dasha Context", text: "The running Mahadasha and Antardasha shape how placements express." },
    ],
    cta: "Discuss Your Birth Chart",
  },
  {
    slug: "career-astrology",
    name: "Career Astrology",
    summary:
      "Traditional career analysis studies the 10th, 6th, 2nd and 11th houses along with Saturn, Sun, Mercury and Jupiter.",
    points: [
      { title: "10th House", text: "Karma Bhava — profession, status and visible work in the world." },
      { title: "6th House", text: "Service, competition, daily work and employment matters." },
      { title: "2nd & 11th Houses", text: "Earnings, accumulated resources and gains." },
      { title: "Saturn, Sun, Mercury, Jupiter", text: "Karakas of discipline, authority, skill and guidance." },
      { title: "Dasha", text: "Timing of career changes is traditionally read through Dasha sequences." },
    ],
    cta: "Discuss Your Career Kundli",
  },
  {
    slug: "marriage-astrology",
    name: "Marriage Astrology",
    summary:
      "Marriage analysis traditionally examines the 7th house and its lord, Venus, Jupiter, the Navamsa chart and Dasha periods.",
    points: [
      { title: "7th House & Lord", text: "Partnership, the nature of the spouse and married life." },
      { title: "Venus & Jupiter", text: "Karakas of relationship for men and women respectively in classical practice." },
      { title: "Navamsa (D9)", text: "The divisional chart most closely studied for marriage." },
      { title: "Kundli Matching", text: "Ashtakoota Guna Milan, Nadi, Bhakoot and Manglik considerations." },
    ],
    cta: "Discuss Marriage Astrology",
  },
  {
    slug: "business-astrology",
    name: "Business Astrology",
    summary:
      "Business questions traditionally involve the 2nd, 7th, 10th and 11th houses with Mercury, Jupiter, Mars and Saturn.",
    points: [
      { title: "7th House", text: "Partnerships, contracts and the marketplace." },
      { title: "10th & 11th Houses", text: "Enterprise, reputation and gains." },
      { title: "Mercury & Mars", text: "Trade acumen and execution energy." },
      { title: "Dasha", text: "Timing of expansion or consolidation is read from Dasha periods." },
    ],
    cta: "Discuss Your Business Kundli",
  },
  {
    slug: "family-astrology",
    name: "Family Astrology",
    summary: "Family matters traditionally involve the 2nd, 4th and 9th houses, the Moon, and family-related Dasha periods.",
    points: [
      { title: "2nd House", text: "Family, speech and accumulated support." },
      { title: "4th House", text: "Mother, home and inner comfort." },
      { title: "9th House", text: "Father, elders and dharma." },
    ],
    cta: "Discuss Family Matters",
  },
  {
    slug: "dasha-analysis",
    name: "Dasha Analysis",
    summary: "Vimshottari Mahadasha, Antardasha and Pratyantardasha analysis for timing-related questions.",
    points: [
      { title: "Mahadasha", text: "The major planetary period shaping a long phase of life." },
      { title: "Antardasha", text: "Sub-periods that colour the Mahadasha." },
      { title: "Transits", text: "Gochara is read against the running Dasha." },
    ],
    cta: "Discuss Your Dasha",
  },
  {
    slug: "nakshatra-analysis",
    name: "Nakshatra Analysis",
    summary: "A detailed reading of your Janma Nakshatra, Pada and the Nakshatras occupied by key planets.",
    points: [
      { title: "Janma Nakshatra", text: "The Moon's Nakshatra at birth and its lord." },
      { title: "Pada", text: "The quarter division linking the Nakshatra to the Navamsa." },
    ],
    cta: "Discuss Your Nakshatra",
  },
  {
    slug: "dosha-analysis",
    name: "Dosha Analysis",
    summary: "Traditional identification and contextual discussion of Manglik, Kaal Sarp, Nadi, Bhakoot and Pitru Dosha.",
    points: [
      { title: "Identification", text: "Each Dosha has defined chart conditions in classical rule sets." },
      { title: "Cancellation", text: "Classical texts describe many exceptions that are often overlooked." },
    ],
    cta: "Discuss Dosha Analysis",
  },
  {
    slug: "kundli-matching",
    name: "Kundli Matching",
    summary: "Ashtakoota Guna Milan along with Manglik, Nadi and Bhakoot considerations and full chart comparison.",
    points: [
      { title: "Ashtakoota", text: "Eight Kootas carrying 36 Gunas in the traditional system." },
      { title: "Beyond Gunas", text: "Experienced matching compares both full charts, not only the score." },
    ],
    cta: "Discuss Kundli Matching",
  },
  {
    slug: "numerology",
    name: "Numerology",
    summary: "Traditional number analysis used alongside — never instead of — your Kundli.",
    points: [{ title: "Used as support", text: "Numerology is treated as a supporting reference in this practice." }],
    cta: "Discuss Numerology",
  },
  {
    slug: "traditional-remedies",
    name: "Traditional Remedies",
    summary: "Mantra, Puja, Havan, Daan and gemstone considerations discussed in the context of your chart.",
    points: [
      { title: "Chart first", text: "Remedies are discussed only after the chart and Dasha are examined." },
      { title: "No guarantees", text: "Traditional remedies are observances, not promised outcomes." },
    ],
    cta: "Discuss Remedies",
  },
  {
    slug: "astrology-consultation",
    name: "Astrology Consultation",
    summary: "A direct conversation with Prashant Shrivastava about your chart and your questions.",
    points: [{ title: "Personal", text: "Your questions, your chart, discussed one to one." }],
    cta: "Request Consultation",
  },
];

export const KNOWLEDGE = {
  Kundli: [
    ["What is Kundli?", "A Kundli is a map of the sky drawn for your exact date, time and place of birth. It records the positions of the nine Grahas across twelve houses and twenty-seven Nakshatras."],
    ["What is Lagna?", "The Lagna or Ascendant is the zodiac sign rising on the eastern horizon at your birth moment. It anchors the house structure of the entire chart."],
    ["Moon Sign vs Sun Sign", "Vedic astrology gives primary weight to the Moon sign (Rashi), which is the sign occupied by the Moon at birth. The Sun sign is read for vitality and identity."],
    ["What are Houses?", "The twelve Bhavas represent life areas — self, wealth, courage, home, children, service, partnership, longevity, dharma, career, gains and expenditure."],
    ["What is Navamsa?", "The D9 divisional chart derived from one-ninth divisions of each sign. It is studied closely for marriage and for the inner strength of planets."],
  ],
  Dasha: [
    ["What is Vimshottari Dasha?", "A 120-year planetary period system calculated from the Moon's Nakshatra at birth. It is the most widely used timing method in Vedic astrology."],
    ["Mahadasha and Antardasha", "The Mahadasha is the major period of a planet; within it, Antardashas of all nine planets run in sequence, colouring the main period."],
    ["Pratyantardasha", "A third level of subdivision used for finer timing discussions."],
  ],
  Doshas: [
    ["Manglik Dosha", "Traditionally counted when Mars occupies the 1st, 2nd, 4th, 7th, 8th or 12th house. Classical texts describe several cancellation conditions."],
    ["Kaal Sarp Dosha", "Described when all seven planets fall on one side of the Rahu–Ketu axis. Interpretations vary between schools."],
    ["Nadi & Bhakoot Dosha", "Both arise in Ashtakoota matching — Nadi from shared Nakshatra groups, Bhakoot from Moon-sign relationships."],
    ["Pitru Dosha", "Associated with ancestral remembrance; commonly discussed through Sun, Rahu and 9th house factors."],
  ],
  Gemstones: [
    ["How gemstones are selected", "Astrologers study the planet's functional role for your Lagna, its dignity and the running Dasha before any gemstone is discussed."],
    ["Natural vs synthetic", "Natural stones are mined; synthetics are lab-grown with the same chemistry. Traditional practice uses natural stones."],
    ["Certification", "A report from a recognised laboratory states identity, treatment and weight. Always ask for it."],
  ],
} as const;
