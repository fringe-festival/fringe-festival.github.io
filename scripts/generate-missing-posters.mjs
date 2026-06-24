import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imageDir = path.join(root, "public", "media", "images");
const widths = [480, 720, 960];

const palette = {
  teal: "#00a59e",
  yellow: "#f1b721",
  pink: "#e2258a",
  orange: "#f47b20",
  ink: "#000000",
  paper: "#f2ece7",
  white: "#fff8ef"
};

const posters = [
  {
    name: "paint-wine",
    title: "Paint & Wine",
    kicker: "יצירה / יין",
    colors: [palette.teal, palette.pink, palette.orange],
    motif: "paint"
  },
  {
    name: "diverse-families",
    title: "הפנינג משפחות",
    kicker: "קהילה / ילדים",
    colors: [palette.teal, palette.yellow, palette.pink],
    motif: "family"
  },
  {
    name: "summer-kids",
    title: "חגיגת קיץ",
    kicker: "ילדים / רחבה",
    colors: [palette.orange, palette.yellow, palette.teal],
    motif: "summer"
  },
  {
    name: "art-more-28",
    title: "Art & More",
    kicker: "בית הבירה",
    colors: [palette.pink, palette.orange, palette.yellow],
    motif: "palette"
  },
  {
    name: "cocktail-night",
    title: "Cocktail Night",
    kicker: "ברים / עיר",
    colors: [palette.ink, palette.pink, palette.teal],
    motif: "cocktail"
  },
  {
    name: "live-sol",
    title: "Live Sol",
    kicker: "גלריה / מוזיקה",
    colors: [palette.yellow, palette.teal, palette.ink],
    motif: "gallery"
  },
  {
    name: "yalla-la",
    title: "Yalla La",
    kicker: "מוזיקה / משפחה",
    colors: [palette.orange, palette.pink, palette.yellow],
    motif: "music"
  },
  {
    name: "goodman",
    title: "גודמן",
    kicker: "דור יוצרים",
    colors: [palette.teal, palette.orange, palette.pink],
    motif: "stage"
  },
  {
    name: "dj-jacques",
    title: "DJ Jacques",
    kicker: "סט יווני",
    colors: [palette.ink, palette.yellow, palette.pink],
    motif: "dj"
  },
  {
    name: "family-carnival",
    title: "קרנבל משפחות",
    kicker: "רחבה / קיץ",
    colors: [palette.yellow, palette.pink, palette.teal],
    motif: "carnival"
  },
  {
    name: "art-more-30",
    title: "Art & More",
    kicker: "בית הבובות",
    colors: [palette.teal, palette.orange, palette.pink],
    motif: "palette"
  }
];

function halftone(color, opacity = 0.35) {
  return Array.from({ length: 10 }, (_, row) =>
    Array.from({ length: 14 }, (_, col) => {
      const radius = 3 + ((row + col) % 4);
      return `<circle cx="${64 + col * 56}" cy="${58 + row * 44}" r="${radius}" fill="${color}" opacity="${opacity}" />`;
    }).join("")
  ).join("");
}

function motifSvg(type, colors) {
  const [primary, secondary, tertiary] = colors;

  const motifs = {
    paint: `
      <path d="M155 500 C270 375 430 432 545 290 C624 192 736 170 805 226 C705 330 620 370 560 492 C496 624 278 615 155 500Z" fill="${secondary}" opacity=".92"/>
      <path d="M130 446 L670 174" stroke="${primary}" stroke-width="42" stroke-linecap="round"/>
      <path d="M640 150 L742 96 L704 224Z" fill="${tertiary}"/>
      <circle cx="210" cy="238" r="42" fill="${tertiary}"/>
      <circle cx="286" cy="196" r="25" fill="${primary}"/>
      <circle cx="344" cy="255" r="30" fill="${secondary}"/>
      <path d="M268 555 C318 650 414 647 478 579" stroke="${palette.ink}" stroke-width="15" fill="none"/>
    `,
    family: `
      <circle cx="282" cy="288" r="48" fill="${primary}"/>
      <circle cx="475" cy="246" r="58" fill="${secondary}"/>
      <circle cx="650" cy="302" r="44" fill="${tertiary}"/>
      <path d="M198 615 C226 438 350 438 382 615Z" fill="${primary}"/>
      <path d="M372 615 C405 402 552 402 590 615Z" fill="${secondary}"/>
      <path d="M570 615 C596 450 704 452 742 615Z" fill="${tertiary}"/>
      <path d="M238 382 C340 448 525 448 690 375" stroke="${palette.ink}" stroke-width="16" fill="none" stroke-linecap="round"/>
    `,
    summer: `
      <circle cx="690" cy="188" r="72" fill="${secondary}"/>
      <path d="M690 76 V300 M578 188 H802 M610 108 L770 268 M770 108 L610 268" stroke="${secondary}" stroke-width="18" stroke-linecap="round"/>
      <path d="M122 548 C255 410 366 650 490 502 C594 378 706 572 838 430 L838 660 L122 660Z" fill="${primary}" opacity=".92"/>
      <path d="M176 388 C240 340 326 340 392 390" stroke="${tertiary}" stroke-width="20" fill="none"/>
      <circle cx="222" cy="320" r="28" fill="${tertiary}"/>
      <circle cx="330" cy="320" r="28" fill="${tertiary}"/>
    `,
    palette: `
      <path d="M214 496 C136 370 218 194 412 162 C616 128 790 238 780 404 C772 552 596 654 410 622 C330 608 332 540 270 540 C244 540 228 522 214 496Z" fill="${primary}"/>
      <circle cx="360" cy="275" r="36" fill="${secondary}"/>
      <circle cx="506" cy="242" r="42" fill="${palette.paper}"/>
      <circle cx="628" cy="326" r="36" fill="${tertiary}"/>
      <circle cx="460" cy="438" r="58" fill="${palette.ink}"/>
      <path d="M144 616 L780 188" stroke="${palette.ink}" stroke-width="18" stroke-linecap="round"/>
      <path d="M734 154 L804 102 L792 188Z" fill="${secondary}"/>
    `,
    cocktail: `
      <path d="M275 168 H720 L548 388 H444Z" fill="${secondary}"/>
      <path d="M310 205 H684 L548 375 H446Z" fill="${primary}" opacity=".88"/>
      <path d="M496 388 V582" stroke="${palette.paper}" stroke-width="18"/>
      <path d="M372 590 H620" stroke="${palette.paper}" stroke-width="18" stroke-linecap="round"/>
      <path d="M605 132 C680 76 752 126 738 198" stroke="${tertiary}" stroke-width="16" fill="none"/>
      <circle cx="738" cy="198" r="30" fill="${tertiary}"/>
    `,
    gallery: `
      <rect x="172" y="176" width="590" height="366" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="18"/>
      <rect x="224" y="226" width="486" height="266" fill="${primary}" opacity=".9"/>
      <path d="M254 448 C340 310 432 432 500 302 C570 168 642 352 690 250 V492 H254Z" fill="${secondary}"/>
      <path d="M210 605 H735" stroke="${palette.ink}" stroke-width="16" stroke-linecap="round"/>
      <path d="M296 605 V542 M648 605 V542" stroke="${palette.ink}" stroke-width="16"/>
    `,
    music: `
      <path d="M186 516 C260 402 336 602 424 430 C500 282 614 590 770 322" stroke="${primary}" stroke-width="34" fill="none" stroke-linecap="round"/>
      <circle cx="262" cy="516" r="54" fill="${secondary}"/>
      <path d="M610 180 V500" stroke="${palette.ink}" stroke-width="24"/>
      <path d="M610 180 C702 204 724 250 690 316 C662 276 612 270 610 270Z" fill="${tertiary}"/>
      <circle cx="552" cy="530" r="66" fill="${palette.ink}"/>
      <circle cx="552" cy="530" r="34" fill="${palette.paper}"/>
    `,
    stage: `
      <path d="M92 132 L322 132 L238 650 L92 650Z" fill="${primary}"/>
      <path d="M868 132 L638 132 L722 650 L868 650Z" fill="${secondary}"/>
      <path d="M250 610 H710 L780 690 H180Z" fill="${palette.ink}"/>
      <circle cx="350" cy="355" r="62" fill="${tertiary}"/>
      <circle cx="488" cy="302" r="76" fill="${palette.paper}"/>
      <circle cx="626" cy="355" r="62" fill="${primary}"/>
      <path d="M272 488 C372 545 560 548 704 482" stroke="${palette.ink}" stroke-width="18" fill="none"/>
    `,
    dj: `
      <circle cx="352" cy="430" r="144" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="20"/>
      <circle cx="352" cy="430" r="54" fill="${primary}"/>
      <rect x="490" y="292" width="270" height="250" fill="${secondary}" stroke="${palette.ink}" stroke-width="18"/>
      <path d="M548 362 H704 M548 430 H704 M548 498 H660" stroke="${palette.ink}" stroke-width="16"/>
      <path d="M288 182 C344 78 492 86 548 190" stroke="${tertiary}" stroke-width="20" fill="none" stroke-linecap="round"/>
      <path d="M264 212 H318 V306 H264Z M520 212 H574 V306 H520Z" fill="${tertiary}"/>
    `,
    carnival: `
      <path d="M140 160 H820 L770 260 L718 160 L666 260 L614 160 L562 260 L510 160 L458 260 L406 160 L354 260 L302 160 L250 260Z" fill="${primary}"/>
      <path d="M160 650 L292 326 L450 650Z" fill="${secondary}"/>
      <path d="M405 650 L552 296 L742 650Z" fill="${tertiary}"/>
      <circle cx="584" cy="362" r="52" fill="${palette.paper}"/>
      <path d="M235 524 C330 466 405 504 480 560 C570 626 662 586 760 510" stroke="${palette.ink}" stroke-width="17" fill="none"/>
    `
  };

  return motifs[type] ?? motifs.stage;
}

function posterSvg(poster, width) {
  const height = Math.round(width * 0.75);
  const [primary, secondary, tertiary] = poster.colors;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 960 720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="16" dy="16" stdDeviation="0" flood-color="${palette.ink}" flood-opacity=".95"/>
        </filter>
        <clipPath id="paper-cut">
          <path d="M82 62 H878 L842 654 H112 Z"/>
        </clipPath>
      </defs>
      <rect width="960" height="720" fill="${palette.paper}"/>
      <g opacity=".32">${halftone(primary, 0.38)}</g>
      <path d="M-20 518 L990 92 L990 248 L-20 674Z" fill="${primary}" opacity=".78"/>
      <path d="M48 118 L888 54 L816 666 L138 626Z" fill="${palette.white}" filter="url(#shadow)" clip-path="url(#paper-cut)"/>
      <g clip-path="url(#paper-cut)">
        <path d="M-30 514 C210 440 280 168 516 248 C720 318 736 112 1002 188 V760 H-30Z" fill="${tertiary}" opacity=".9"/>
        <path d="M72 594 L896 284 L922 380 L120 690Z" fill="${secondary}" opacity=".88"/>
        ${motifSvg(poster.motif, poster.colors)}
      </g>
      <path d="M48 118 L888 54 L816 666 L138 626Z" fill="none" stroke="${palette.ink}" stroke-width="8"/>
      <rect x="92" y="88" width="285" height="55" fill="${palette.ink}"/>
      <circle cx="138" cy="116" r="12" fill="${primary}"/>
      <circle cx="178" cy="116" r="12" fill="${secondary}"/>
      <circle cx="218" cy="116" r="12" fill="${tertiary}"/>
      <g transform="translate(132 548) rotate(-3)">
        <rect x="0" y="-78" width="690" height="112" fill="${primary}"/>
        <path d="M56 -24 C198 -82 372 28 642 -54" stroke="${palette.paper}" stroke-width="18" fill="none" opacity=".88"/>
        <path d="M96 4 H590" stroke="${palette.ink}" stroke-width="13" opacity=".35"/>
      </g>
      <rect x="824" y="602" width="58" height="58" fill="${secondary}"/>
      <path d="M824 602 L882 602 L853 560Z" fill="${primary}"/>
      <style>
        svg { shape-rendering: geometricPrecision; }
      </style>
    </svg>
  `;
}

await mkdir(imageDir, { recursive: true });

for (const poster of posters) {
  for (const width of widths) {
    const output = path.join(imageDir, `${poster.name}-${width}.webp`);
    await sharp(Buffer.from(posterSvg(poster, width)))
      .webp({ quality: width >= 900 ? 86 : 82, smartSubsample: true })
      .toFile(output);
  }
}

console.log(`Generated ${posters.length} poster image sets.`);
