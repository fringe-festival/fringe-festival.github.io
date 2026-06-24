import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const imageDir = path.join(publicDir, "media", "images");
const videoDir = path.join(publicDir, "media", "videos");
const docDir = path.join(publicDir, "media", "docs");
const fontDir = path.join(publicDir, "fonts");

const fromRoot = (...parts) => path.join(root, ...parts);

const images = [
  {
    name: "festival-key-art",
    source: ["assetes", "27-30:07 פסטיבל הפרינג׳ הבינלאומי באר שבע פוסט.jpg"],
    widths: [720, 1080, 1440]
  },
  {
    name: "festival-story",
    source: ["assetes", "27-30:07 פסטיבל הפרינג׳ הבינלאומי באר שבע סטורי.jpg"],
    widths: [480, 720]
  },
  {
    name: "story-book",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "THE STORY OF A BOOK -צ_כים- 27-7 ב-19_00 באולם",
      "DSCF3215_foto_David_Konecny (1).jpg"
    ]
  },
  {
    name: "daniel-chen",
    source: ["חומרי שיווק- פסטיבל 2026", "דניאל חן 27-7 בשעה 20_30 תמוז", "13 (1).png"]
  },
  {
    name: "hymn-love",
    source: ["חומרי שיווק- פסטיבל 2026", "יעל רסולי 27-7 בשעה 21_00 ברחבה", "duo 2025 (1).png"]
  },
  {
    name: "danny-robas",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "דני רובס 22_00 רחבת הפרינג_ 27-7",
      "דני רובס - צילום דוד גרנות 2025.jpg"
    ]
  },
  {
    name: "dira",
    source: ["חומרי שיווק- פסטיבל 2026", "דירה להשכיר 28-7 בשעה 17_30 תמוז", "dira-lehaskir.jpg"]
  },
  {
    name: "lost-objects",
    source: ["חומרי שיווק- פסטיבל 2026", "מסע לארץ החפצים האבודים", "עוד צילום רחל בכר.jpg"]
  },
  {
    name: "maale-tachtit",
    source: ["חומרי שיווק- פסטיבל 2026", "רוני נוימן 29-7 בשעה 20_00", "מעלה תחתית 1 (1).jpeg"]
  },
  {
    name: "weather-storm",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "על חוט וסערה-בכורה  28-7 בשעה 20_00 בבית למחול",
      "IMG_3760.jpg"
    ]
  },
  {
    name: "itzik-kala",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "איציק קלה+ דניאל ויס 28-7-אמפי עומר20_30",
      "תמונת תדמית צילום אורי אליהו  סתיו ברקאי.jpg"
    ]
  },
  {
    name: "alma-galbi",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "ALMA GALBI ברחבה 28-7 בשעה 21_15 ",
      "צילום מארק סטרנגר, אבי גנור עיצוב גרפי מתי סילברמן (1).jpg"
    ]
  },
  {
    name: "idan-haviv",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "עידן חביב 28-7 בשעה 22_00 מיוזיק סיטי",
      "עידן חביב (2).jpeg קרדיט מאיה סלע.jpg"
    ]
  },
  {
    name: "neta-alima",
    source: ["חומרי שיווק- פסטיבל 2026", "נטע 28-7 שעה 22_30 עשן הזמן", "WhatsApp Image 2026-06-01 at 16.40.04.jpeg"]
  },
  {
    name: "noah",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "נוח והתיבה- בכורה 29-7 בשעה 18_00 באולם תיאטרון הפרינג_",
      "נוח והתיבה תיאטרונוח.jpg"
    ]
  },
  {
    name: "empty-pot",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "איילה פרל - בכורה -29-7 בשעה 19_00  דשא מקלט",
      "2826f188-1ad3-45a9-b072-8e351a50cf10.jpg"
    ]
  },
  {
    name: "street-concert",
    source: [
      "חומרי שיווק- פסטיבל 2026",
      "תזמורת כלי-הנשיפה העירונית באר-שבע, ע_ש נסים אלשיך29-7-רחבה",
      "WhatsApp Image 2026-06-02 at 13.30.34.jpeg"
    ]
  },
  {
    name: "sounds-stories",
    source: ["חומרי שיווק- פסטיבל 2026", "שי צברי ותרשיש-29-7 בתמוז-20_30", "thmb6a12ef1e55bf7972127524.jpeg"]
  },
  {
    name: "idan-sela",
    source: ["חומרי שיווק- פסטיבל 2026", "עידן סלע 29-7 בשעה 21_00", "קרדיט תמונה  שי שלום.jpeg"]
  },
  {
    name: "keren-peles",
    source: ["חומרי שיווק- פסטיבל 2026", "קרן פלס מיוזיק סיטי 29-7 בשעה 22_00", "קרן פלס.jpeg קרדיט  שי פרנקו.jpg"]
  },
  {
    name: "beer",
    source: ["חומרי שיווק- פסטיבל 2026", "בית הבירה- פסטיבל בירות קיץ 30.7 ב-19_00", "בית הבירה לוגו (1).png"]
  },
  {
    name: "yalla",
    source: ["חומרי שיווק- פסטיבל 2026", "רועי פדידה- 30-7 רחבה ", "צילום - דור פזואלו(1).jpeg"]
  },
  {
    name: "light-unbearable",
    source: ["חומרי שיווק- פסטיבל 2026", "קל ובלתי נסבל 30-7 בשעה 20_00", "WhatsApp Image 2026-06-03 at 13.29.25.jpeg"]
  },
  {
    name: "crete-weekend",
    source: ["חומרי שיווק- פסטיבל 2026", "סוף שבוע בכרתים- תמוז 30-7", "3.4 עם שחקנים (1).jpg"]
  },
  {
    name: "david-broza",
    source: ["חומרי שיווק- פסטיבל 2026", "דוויד ברוזה- אמפי עומר 30-7 בשעה 20_30", "קרדיט צילום – גיל רובינשטיין.png"]
  },
  {
    name: "mor-chen",
    source: ["חומרי שיווק- פסטיבל 2026", "מור חן 30-7 במיוזיק סיטי 21_30", "מור חן.jpeg  רגב זארקה.jpg"]
  },
  {
    name: "netta-barzilai",
    source: ["חומרי שיווק- פסטיבל 2026", "נטע ברזילי-30-7 בשעה 21_30 ברחבה", "נטע ברזילי צילום ערן לוי.jpg"],
    widths: [720, 960, 1280]
  }
];

const videos = [
  {
    out: "intro-desktop.mp4",
    source: ["סרטונים", "סרטון פתיח כשדף הנחיתה עולה", "סרטון פתיח גרסת מחשב.mp4"]
  },
  {
    out: "intro-mobile.mp4",
    source: ["סרטונים", "סרטון פתיח כשדף הנחיתה עולה", "סרטון פתיחת גרסת טלפון.mp4"]
  },
  {
    out: "recap-2024.mp4",
    source: ["סרטונים", "סרטוני סיכום שנים קודמות", "סרטון סיכום פסטיבל 2024.mp4"]
  },
  {
    out: "recap-2023.mp4",
    source: ["סרטונים", "סרטוני סיכום שנים קודמות", "סרטון סיכום פסטיבל 2023.mp4"]
  }
];

const docs = [
  {
    out: "program-2026.pdf",
    source: ["תוכניה מלאה ולוז בקבציי pdf", "תוכניה מלאה.pdf"]
  },
  {
    out: "schedule-2026.pdf",
    source: ["תוכניה מלאה ולוז בקבציי pdf", "לוז.pdf"]
  }
];

const fonts = [
  {
    out: "hafringe-normal.otf",
    source: ["קבציי פונטים לטעינה", "פונט פרינג׳", "Hafringe-Normal.otf"]
  },
  {
    out: "hafringe-extra-bold.otf",
    source: ["קבציי פונטים לטעינה", "פונט פרינג׳", "Hafringe-ExtraBold.otf"]
  },
  {
    out: "almoni-regular.ttf",
    source: ["קבציי פונטים לטעינה", "פונט אלמוני צר", "almoni-neue-aaa-400.ttf"]
  },
  {
    out: "almoni-bold.ttf",
    source: ["קבציי פונטים לטעינה", "פונט אלמוני צר", "almoni-neue-aaa-700.ttf"]
  },
  {
    out: "almoni-tzar-bold.ttf",
    source: ["קבציי פונטים לטעינה", "פונט אלמוני צר", "almoni-neue-tzar-aaa-800.ttf"]
  }
];

await Promise.all([mkdir(imageDir, { recursive: true }), mkdir(videoDir, { recursive: true }), mkdir(docDir, { recursive: true }), mkdir(fontDir, { recursive: true })]);

for (const image of images) {
  const input = fromRoot(...image.source);
  await stat(input);
  const widths = image.widths ?? [480, 720, 960];

  for (const width of widths) {
    const output = path.join(imageDir, `${image.name}-${width}.webp`);
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width >= 1200 ? 82 : 78, smartSubsample: true })
      .toFile(output);
  }
}

for (const video of videos) {
  await copyFile(fromRoot(...video.source), path.join(videoDir, video.out));
}

for (const doc of docs) {
  await copyFile(fromRoot(...doc.source), path.join(docDir, doc.out));
}

for (const font of fonts) {
  await copyFile(fromRoot(...font.source), path.join(fontDir, font.out));
}

console.log(`Prepared ${images.length} image sets, ${videos.length} videos, ${docs.length} docs and ${fonts.length} fonts.`);
