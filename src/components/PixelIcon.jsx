// 8x8 pixel icons drawn from string maps. "#" = filled pixel.
const ICONS = {
  "Distributed Systems": [
    "########",
    "#......#",
    "#.#..#.#",
    "########",
    "#......#",
    "#.#..#.#",
    "########",
    "...##...",
  ],
  "Healthcare AI": [
    "........",
    ".##..##.",
    "########",
    "###.####",
    "#.....##",
    ".##.###.",
    "..####..",
    "...##...",
  ],
  "Cloud Backend": [
    "........",
    "...###..",
    "..#...#.",
    ".##...##",
    "#.......",
    "#......#",
    ".######.",
    "........",
  ],
  "Video Infrastructure": [
    "########",
    "#.#..#.#",
    "#......#",
    "#..#...#",
    "#..##..#",
    "#..#...#",
    "#.#..#.#",
    "########",
  ],
  HPC: [
    ".#.#.#..",
    "#######.",
    "##...##.",
    "#.#.#.##",
    "##...##.",
    "#######.",
    ".#.#.#..",
    "........",
  ],
  "Machine Learning": [
    "#.......",
    "#.....#.",
    "#....#.#",
    "#...#...",
    "#.##....",
    "##......",
    "########",
    "........",
  ],
};

const FALLBACK = [
  "........",
  ".######.",
  ".#....#.",
  ".#.##.#.",
  ".#.##.#.",
  ".#....#.",
  ".######.",
  "........",
];

export default function PixelIcon({ name, size = 32 }) {
  const rows = ICONS[name] ?? FALLBACK;
  return (
    <svg
      className="pixel-icon"
      width={size}
      height={size}
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null
        )
      )}
    </svg>
  );
}
