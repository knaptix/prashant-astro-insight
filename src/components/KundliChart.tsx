import { PLANET_SHORT, SIGN_SHORT } from "@/lib/astro";

type Item = { name: string; signIndex: number };

/** North-Indian style diamond chart. House 1 fixed at top-centre. */
export function KundliChart({
  lagnaSign,
  items,
  title,
}: {
  lagnaSign: number;
  items: Item[];
  title: string;
}) {
  const S = 400;
  const h = S / 2;
  const q = S / 4;
  // Positions of the 12 house boxes (house 1 .. 12) in a north indian chart.
  const pos: [number, number][] = [
    [h, q],
    [q, q / 2 + 6],
    [q / 2 + 6, q],
    [q, h],
    [q / 2 + 6, S - q],
    [q, S - q / 2 - 6],
    [h, S - q],
    [S - q, S - q / 2 - 6],
    [S - q / 2 - 6, S - q],
    [S - q, h],
    [S - q / 2 - 6, q],
    [S - q, q / 2 + 6],
  ];

  const byHouse: string[][] = Array.from({ length: 12 }, () => []);
  for (const it of items) {
    const house = ((it.signIndex - lagnaSign + 12) % 12) + 1;
    byHouse[house - 1]!.push(PLANET_SHORT[it.name] ?? it.name);
  }

  return (
    <figure className="surface p-5">
      <figcaption className="mb-3 text-center text-sm uppercase tracking-[0.2em] text-primary">
        {title}
      </figcaption>
      <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-sm">
        <rect x="1" y="1" width={S - 2} height={S - 2} fill="none" stroke="currentColor" opacity="0.5" />
        <line x1="1" y1="1" x2={S - 1} y2={S - 1} stroke="currentColor" opacity="0.5" />
        <line x1={S - 1} y1="1" x2="1" y2={S - 1} stroke="currentColor" opacity="0.5" />
        <polygon
          points={`${h},1 ${S - 1},${h} ${h},${S - 1} 1,${h}`}
          fill="none"
          stroke="currentColor"
          opacity="0.5"
        />
        {pos.map(([x, y], i) => {
          const sign = (lagnaSign + i) % 12;
          return (
            <g key={i}>
              <text
                x={x}
                y={y - 14}
                textAnchor="middle"
                fontSize="12"
                fill="var(--gold)"
                opacity="0.9"
              >
                {SIGN_SHORT[sign]}
              </text>
              <text x={x} y={y + 4} textAnchor="middle" fontSize="13" fill="currentColor">
                {byHouse[i]!.slice(0, 3).join(" ")}
              </text>
              <text x={x} y={y + 20} textAnchor="middle" fontSize="13" fill="currentColor">
                {byHouse[i]!.slice(3).join(" ")}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
