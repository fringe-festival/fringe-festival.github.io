export type DayId = "27" | "28" | "29" | "30";

export type EventCategory =
  | "theater"
  | "music"
  | "dance"
  | "standup"
  | "family"
  | "workshop"
  | "street"
  | "city";

export type EventPrice = "ticket" | "free" | "details";

export type FestivalEvent = {
  id: string;
  title: string;
  subtitle?: string;
  day: DayId;
  dateLabel: string;
  time: string;
  venue: string;
  category: EventCategory;
  price: EventPrice;
  isPremiere?: boolean;
  isInternational?: boolean;
  image?: string;
  accent: "teal" | "yellow" | "pink" | "orange" | "black";
  short: string;
  ticketUrl?: string;
};

export const festivalDays: Array<{
  id: DayId;
  label: string;
  date: string;
  mood: string;
}> = [
  { id: "27", label: "יום ב׳", date: "27.7", mood: "פתיחה בינלאומית" },
  { id: "28", label: "יום ג׳", date: "28.7", mood: "בכורות ובמות עירוניות" },
  { id: "29", label: "יום ד׳", date: "29.7", mood: "משפחות, רחוב ומוזיקה" },
  { id: "30", label: "יום ה׳", date: "30.7", mood: "שיא הפסטיבל" }
];

export const categoryLabels: Record<EventCategory, string> = {
  theater: "תיאטרון",
  music: "מוזיקה",
  dance: "מחול",
  standup: "סטנדאפ",
  family: "ילדים ומשפחה",
  workshop: "סדנה",
  street: "רחוב",
  city: "עיר"
};

export const events: FestivalEvent[] = [
  {
    id: "story-book",
    title: "סיפורו של ספר",
    subtitle: "The Story Of A Book",
    day: "27",
    dateLabel: "27.7",
    time: "19:00",
    venue: "אולם תיאטרון הפרינג׳",
    category: "theater",
    price: "ticket",
    isInternational: true,
    image: "/media/images/story-book-960.webp",
    accent: "pink",
    short:
      "מחזה מצ׳כיה על ספר תפילה שאבד בטרזיינשטט וחזר למשפחה אחרי 82 שנים. סיפור של זיכרון, תקווה ותיאטרון.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=587"
  },
  {
    id: "daniel-chen",
    title: "דניאל חן",
    day: "27",
    dateLabel: "27.7",
    time: "20:30",
    venue: "תמוז בית המוזיקה",
    category: "standup",
    price: "details",
    image: "/media/images/daniel-chen-960.webp",
    accent: "orange",
    short: "סטנדאפ חד, מקומי ומלא קצב שפותח את הלילה הראשון באנרגיה קלילה."
  },
  {
    id: "paint-wine",
    title: "Paint & Wine",
    day: "27",
    dateLabel: "27.7",
    time: "21:00",
    venue: "עשן הזמן",
    category: "workshop",
    price: "details",
    image: "/media/images/paint-wine-960.webp",
    accent: "teal",
    short: "סדנת יצירה עם יין, מוזיקה ואווירה חופשית לפתיחת הפסטיבל."
  },
  {
    id: "hymn-to-love",
    title: "המנון לאהבה",
    subtitle: "Hymn To Love",
    day: "27",
    dateLabel: "27.7",
    time: "21:00",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    isInternational: true,
    image: "/media/images/hymn-love-960.webp",
    accent: "teal",
    short:
      "יעל רסולי ואיליה מגלניק במסע קברטי אל פריז של שנות ה־20-40, עם אדית פיאף ברוח ובצלילים."
  },
  {
    id: "danny-robas",
    title: "דני רובס שר ביטלס",
    day: "27",
    dateLabel: "27.7",
    time: "22:00",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    image: "/media/images/danny-robas-960.webp",
    accent: "yellow",
    short:
      "מופע מחווה אהוב לביטלס, עם ביצועים אקוסטיים וסיפורים מאחורי הקלעים של הלהקה."
  },
  {
    id: "dira",
    title: "דירה להשכיר",
    day: "28",
    dateLabel: "28.7",
    time: "17:30",
    venue: "תמוז בית המוזיקה",
    category: "family",
    price: "details",
    image: "/media/images/dira-960.webp",
    accent: "yellow",
    short: "עיבוד מוזיקלי וססגוני לקלאסיקה של לאה גולדברג, לכל המשפחה."
  },
  {
    id: "lost-objects",
    title: "מסע לארץ החפצים האבודים",
    day: "28",
    dateLabel: "28.7",
    time: "17:30",
    venue: "בית הסופרים",
    category: "family",
    price: "details",
    image: "/media/images/lost-objects-960.webp",
    accent: "pink",
    short:
      "הצגה אקולוגית לילדים על נעל שמאל שמחפשת את נעל ימין בארץ חפצים עשויים מחדש."
  },
  {
    id: "diverse-families",
    title: "הפנינג משפחות מגוונות",
    day: "28",
    dateLabel: "28.7",
    time: "17:30",
    venue: "הבית הגאה",
    category: "city",
    price: "free",
    image: "/media/images/diverse-families-960.webp",
    accent: "teal",
    short: "אירוע קהילתי ומשפחתי שמרחיב את גבולות הפסטיבל אל מרחבי העיר."
  },
  {
    id: "summer-kids",
    title: "חגיגת קיץ לילדים",
    day: "28",
    dateLabel: "28.7",
    time: "18:30",
    venue: "רחבת תמוז בית המוזיקה",
    category: "family",
    price: "free",
    image: "/media/images/summer-kids-960.webp",
    accent: "orange",
    short: "הפנינג פתוח לילדים ולמשפחות ברחבה."
  },
  {
    id: "art-more-28",
    title: "אמנות ועוד",
    subtitle: "Art & More",
    day: "28",
    dateLabel: "28.7",
    time: "19:00",
    venue: "בית הבירה",
    category: "workshop",
    price: "details",
    image: "/media/images/art-more-28-960.webp",
    accent: "pink",
    short: "סדנה משחררת עם כוס ביד, מוזיקה טובה וצבעים עזים."
  },
  {
    id: "maale-tachtit",
    title: "מעלה תחתית",
    day: "28",
    dateLabel: "28.7",
    time: "20:00",
    venue: "אולם תיאטרון הפרינג׳",
    category: "theater",
    price: "ticket",
    isPremiere: true,
    image: "/media/images/maale-tachtit-960.webp",
    accent: "orange",
    short:
      "קומדיה פרועה על מועצה קטנה, חזון גדול מדי והתרסקות מצחיקה חזרה לתחתית.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=588"
  },
  {
    id: "cocktail-night",
    title: "Cocktail Night",
    day: "28",
    dateLabel: "28.7",
    time: "20:00",
    venue: "קותאי",
    category: "city",
    price: "details",
    image: "/media/images/cocktail-night-960.webp",
    accent: "black",
    short: "לילה עירוני שמכניס את הברים המקומיים לתוך מסלול הפסטיבל."
  },
  {
    id: "weather-storm",
    title: "על חוט וסערה",
    subtitle: "Weather the Storm",
    day: "28",
    dateLabel: "28.7",
    time: "20:00",
    venue: "הבית למחול",
    category: "dance",
    price: "ticket",
    isPremiere: true,
    image: "/media/images/weather-storm-960.webp",
    accent: "teal",
    short:
      "ערב מחול השוזר שתי יצירות וארבע דמויות המחוברות בחוט בלתי נראה.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=589"
  },
  {
    id: "live-sol",
    title: "Live Sol",
    day: "28",
    dateLabel: "28.7",
    time: "20:30",
    venue: "גלריה Sol",
    category: "music",
    price: "details",
    image: "/media/images/live-sol-960.webp",
    accent: "yellow",
    short: "מופע גלריה אינטימי שמוסיף שכבה מוזיקלית למסלול העירוני."
  },
  {
    id: "itzik-kala",
    title: "איציק קלה מארח את דניאל וייס",
    day: "28",
    dateLabel: "28.7",
    time: "20:30",
    venue: "אמפי עומר",
    category: "music",
    price: "ticket",
    image: "/media/images/itzik-kala-960.webp",
    accent: "yellow",
    short:
      "אחד מעמודי התווך של המוזיקה הים־תיכונית במפגש במה עם דניאל וייס.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=585"
  },
  {
    id: "alma-galbi",
    title: "ALMA GALBI",
    subtitle: "פלמנקו לעפרה חזה",
    day: "28",
    dateLabel: "28.7",
    time: "21:00",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    isInternational: true,
    image: "/media/images/alma-galbi-960.webp",
    accent: "pink",
    short:
      "מוזיקה תימנית ופלמנקו נפגשים במחווה ראשונה מסוגה לעפרה חזה."
  },
  {
    id: "idan-haviv",
    title: "עידן חביב",
    day: "28",
    dateLabel: "28.7",
    time: "22:00",
    venue: "מיוזיק סיטי",
    category: "music",
    price: "details",
    image: "/media/images/idan-haviv-960.webp",
    accent: "orange",
    short: "מופע אינטימי מיוחד לט״ו באב."
  },
  {
    id: "neta-alima",
    title: "נטע עלימה",
    subtitle: "מופע בכורה",
    day: "28",
    dateLabel: "28.7",
    time: "22:30",
    venue: "עשן הזמן",
    category: "music",
    price: "free",
    isPremiere: true,
    image: "/media/images/neta-alima-960.webp",
    accent: "teal",
    short:
      "יוצרת באר שבעית צעירה במופע להקה ראשון עם נגנים מקומיים ושירים לקראת אלבום ראשון."
  },
  {
    id: "noah",
    title: "תיבת נוח",
    day: "29",
    dateLabel: "29.7",
    time: "18:00",
    venue: "אולם תיאטרון הפרינג׳",
    category: "family",
    price: "ticket",
    isPremiere: true,
    image: "/media/images/noah-960.webp",
    accent: "yellow",
    short:
      "תיאטרון בובות מוזיקלי לכל המשפחה, עשוי מגזרי נייר וקאט־אאוטים.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=590"
  },
  {
    id: "yalla-la",
    title: "Yalla La",
    day: "29",
    dateLabel: "29.7",
    time: "18:30",
    venue: "מוזיאון הנגב לאמנות",
    category: "family",
    price: "details",
    image: "/media/images/yalla-la-960.webp",
    accent: "orange",
    short: "הרכב מוזיקלי מקפיץ עם שירים ישראליים אהובים לכל הגילאים."
  },
  {
    id: "empty-pot",
    title: "העציץ הריק",
    day: "29",
    dateLabel: "29.7",
    time: "18:45",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "street",
    price: "free",
    isPremiere: true,
    image: "/media/images/empty-pot-960.webp",
    accent: "pink",
    short:
      "תיאטרון קטן רכוב על אופניים שמזמין ילדים לפתוח תיבה ולגלות סיפורים."
  },
  {
    id: "goodman",
    title: "מופע סיום מצויינות גודמן",
    day: "29",
    dateLabel: "29.7",
    time: "19:45",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "street",
    price: "free",
    image: "/media/images/goodman-960.webp",
    accent: "teal",
    short: "מופע רחוב של דור היוצרים הבא."
  },
  {
    id: "street-concert",
    title: "קונצרט רחוב לכל המשפחה",
    day: "29",
    dateLabel: "29.7",
    time: "20:00",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    image: "/media/images/street-concert-960.webp",
    accent: "yellow",
    short: "תזמורת כלי הנשיפה העירונית באר שבע יוצאת מהאולם אל הרחבה."
  },
  {
    id: "sounds-stories",
    title: "צלילים וסיפורים",
    subtitle: "אנסמבל תרשיש ושי צברי",
    day: "29",
    dateLabel: "29.7",
    time: "20:30",
    venue: "תמוז בית המוזיקה",
    category: "music",
    price: "details",
    isPremiere: true,
    image: "/media/images/sounds-stories-960.webp",
    accent: "pink",
    short:
      "מופע בכורה מוזיקלי שנוצר עבור הפסטיבל, עם קטעי קריאה מספרו של רפי שטרית."
  },
  {
    id: "greek",
    title: "חגיגה יוונית עם עידן סלע",
    day: "29",
    dateLabel: "29.7",
    time: "21:00",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    image: "/media/images/idan-sela-960.webp",
    accent: "teal",
    short: "טברנה יוונית אותנטית שמרימה את הרחבה, עם סט יווני לסיום הערב."
  },
  {
    id: "keren-peles",
    title: "קרן פלס",
    day: "29",
    dateLabel: "29.7",
    time: "22:00",
    venue: "מיוזיק סיטי",
    category: "music",
    price: "details",
    image: "/media/images/keren-peles-960.webp",
    accent: "orange",
    short: "יוצרת, זמרת ופרפורמרית מהבולטות בישראל במופע להיטים."
  },
  {
    id: "dj-jacques",
    title: "דיג׳יי ז׳אק אבו נז׳מון",
    day: "29",
    dateLabel: "29.7",
    time: "22:15",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    image: "/media/images/dj-jacques-960.webp",
    accent: "black",
    short: "סט יווני כשר למהדרין שיסגור את הערב ברחבה."
  },
  {
    id: "family-carnival",
    title: "קרנבל משפחות",
    day: "30",
    dateLabel: "30.7",
    time: "18:00",
    venue: "רחבת תמוז בית המוזיקה",
    category: "family",
    price: "free",
    image: "/media/images/family-carnival-960.webp",
    accent: "yellow",
    short: "קרנבל פתוח שמכניס את המשפחות אל יום הסיום."
  },
  {
    id: "art-more-30",
    title: "אמנות ועוד",
    subtitle: "Art & More",
    day: "30",
    dateLabel: "30.7",
    time: "19:00",
    venue: "בית הבובות",
    category: "workshop",
    price: "details",
    image: "/media/images/art-more-30-960.webp",
    accent: "teal",
    short: "סדנת צבע, דמיון ואווירה טובה."
  },
  {
    id: "beer-festival",
    title: "פסטיבל בירות קיץ",
    day: "30",
    dateLabel: "30.7",
    time: "19:00",
    venue: "בית הבירה",
    category: "city",
    price: "details",
    image: "/media/images/beer-960.webp",
    accent: "orange",
    short: "מגוון בירות מיוחדות וקיציות ממבשלות בארץ ומחו״ל."
  },
  {
    id: "yalla-street",
    title: "יאללה! תזמורת רחוב",
    day: "30",
    dateLabel: "30.7",
    time: "19:00",
    venue: "רחבת תמוז בית המוזיקה",
    category: "street",
    price: "free",
    image: "/media/images/yalla-960.webp",
    accent: "pink",
    short:
      "תזמורת רחוב סוחפת של מוזיקאים, שחקנים ואמני רחוב באווירה ים־תיכונית."
  },
  {
    id: "light-unbearable",
    title: "קל ובלתי נסבל",
    day: "30",
    dateLabel: "30.7",
    time: "20:00",
    venue: "אולם תיאטרון הפרינג׳",
    category: "theater",
    price: "ticket",
    isPremiere: true,
    image: "/media/images/light-unbearable-960.webp",
    accent: "yellow",
    short:
      "קומדיה אבסורדית סביב ארוחת ערב שמתפרקת לוויכוחים, מערכונים ורגעי חיים.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=591"
  },
  {
    id: "crete-weekend",
    title: "סוף שבוע בכרתים",
    day: "30",
    dateLabel: "30.7",
    time: "20:30",
    venue: "תמוז בית המוזיקה",
    category: "theater",
    price: "ticket",
    image: "/media/images/crete-weekend-960.webp",
    accent: "teal",
    short:
      "דרמה משפחתית ישראלית סוחפת על שלושה דורות, סודות שלא הגלידו ובית מול הים.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=592"
  },
  {
    id: "david-broza",
    title: "דויד ברוזה",
    subtitle: "40 שנה לאשה שאיתי",
    day: "30",
    dateLabel: "30.7",
    time: "20:30",
    venue: "אמפי עומר",
    category: "music",
    price: "ticket",
    image: "/media/images/david-broza-960.webp",
    accent: "orange",
    short:
      "אחד הקולות הגדולים של המוזיקה הישראלית במופע חגיגי עם הרפרטואר האהוב.",
    ticketUrl: "https://www.thefringe.co.il/?CategoryID=404&ArticleID=586"
  },
  {
    id: "yalla-covers",
    title: "יאללה! מופע קאברים מוזיקלי",
    day: "30",
    dateLabel: "30.7",
    time: "21:00",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    image: "/media/images/yalla-960.webp",
    accent: "pink",
    short:
      "פופ, סווינג, ניו אורלינס וחפלה במופע רחוב שמחבר מוזיקה והומור."
  },
  {
    id: "mor-chen",
    title: "מור חן",
    day: "30",
    dateLabel: "30.7",
    time: "21:30",
    venue: "מיוזיק סיטי",
    category: "standup",
    price: "details",
    image: "/media/images/mor-chen-960.webp",
    accent: "teal",
    short: "סטנדאפ אנרגטי וכנה על זוגיות, משפחה, חברות נשית והשנה ההזויה שעברנו."
  },
  {
    id: "netta",
    title: "נטע ברזילי והלופר",
    subtitle: "מופע פריצה",
    day: "30",
    dateLabel: "30.7",
    time: "22:00",
    venue: "רחבת תיאטרון הפרינג׳",
    category: "music",
    price: "free",
    image: "/media/images/netta-barzilai-960.webp",
    accent: "pink",
    short:
      "מופע חד־פעמי ומחשמל עם הלופר, להקה חיה ושכבות של קולות שנבנות בזמן אמת."
  }
];

export const ticketEvents = events.filter((event) => event.price === "ticket");

export const eventDetails: Record<string, string[]> = {
  "story-book": [
    "מחזה מקורי מצ׳כיה המתאר כמעט מאה שנים בתולדות משפחת סטראך מברנו דרך סידור תפילה שנראה כאילו אבד לנצח לאחר שהוחרם בטרזיינשטט.",
    "לאחר 82 שנים המחזור אותר והוחזר לצאצאי הבעלים המקוריים כחלק מפרויקט השבת ספרי קודש ותפילה שנגזלו בתקופת השואה.",
    "העיבוד הבימתי מחבר בין זיכרון משפחתי, היסטוריה אירופית ותקווה פשוטה ומטלטלת."
  ],
  "daniel-chen": [
    "סטנדאפ לפתיחת הלילה הראשון של הפסטיבל בתמוז בית המוזיקה.",
    "מופע עירוני, חד וקצבי שמכניס את הקהל לאווירת הפסטיבל דרך הומור ישראלי חי."
  ],
  "paint-wine": [
    "סדנת יצירה אינטימית בעשן הזמן, עם יין, צבע ומוזיקה.",
    "חוויה פתוחה לקהל שמבקשת לפרק את המרחק בין צופה ליוצר ולהתחיל את הערב בידיים עובדות."
  ],
  "hymn-to-love": [
    "יעל רסולי ואיליה מגלניק מובילים מסע קברטי אל סמטאות פריז של שנות ה־20-40.",
    "המופע הוצג בניו יורק, שיקגו, פריז, שטוקהולם ועוד, ומגיע לרחבת הפרינג׳ עם עיבודים חדשים לקלאסיקות על זמניות.",
    "רסולי, אמנית בינלאומית זוכת פרסים, ומגלניק, אמן אקורדיון ומעבד, מחברים רומנטיקה צרפתית, דרמה רוסית וג׳אז."
  ],
  "danny-robas": [
    "אחד ממופעי המחווה המוכרים בישראל ללהקת הביטלס.",
    "דני רובס משלב ביצועים אקוסטיים לשירי הלהקה עם סיפורים מאחורי הקלעים על חבריה ויצירתם."
  ],
  "dira": [
    "עיבוד מוזיקלי ומרהיב לסיפורה הידוע של לאה גולדברג, שנבחר לאחד מספרי הילדים האהובים בישראל.",
    "לבניין מגיעים דיירים שונים: נמלה, ארנבת, חזיר, זמיר ויונה. דרך החיפוש אחר דייר חדש נפתחים נושאים של שכנות טובה, עזרה לזולת וחברות אמת.",
    "מתאים לגילי 4 ומעלה ולכל המשפחה."
  ],
  "lost-objects": [
    "הצגה אקולוגית לילדים שבה נעל שמאל מחפשת את נעל ימין בארץ החפצים האבודים.",
    "המסע עובר דרך ים האפשרויות, האי-אפשר וראש ההר, ומפגיש יצורים העשויים מחפצים ישנים.",
    "משך המופע כ־45 דקות, מתאים לגילי 4-9."
  ],
  "diverse-families": [
    "הפנינג קהילתי בבית הגאה שמרחיב את הפסטיבל אל המשפחה, העיר והמרחב הציבורי.",
    "אירוע פתוח שמחבר בין תרבות, קהילה וילדים באווירה חופשית."
  ],
  "summer-kids": [
    "חגיגת קיץ פתוחה לילדים ולמשפחות ברחבת תמוז בית המוזיקה.",
    "תחנת מעבר שמחה במסלול הפסטיבל, עם פעילות חופשית ואווירה קהילתית."
  ],
  "art-more-28": [
    "סדנת Art & More בבית הבירה, עם צבע, מוזיקה ואווירה משוחררת.",
    "חוויה יצירתית קצרה שמכניסה את הקהל לתוך פעולת האמנות עצמה."
  ],
  "maale-tachtit": [
    "קומדיה סאטירית על מועצה מקומית קטנה עד כדי לא קיימת, שבה הכל שקט מדי ולכן חייבים לשנות.",
    "רחמיאל בנטוב, ראש המועצה הנכנס, יוצא למהפכה עם חזון גדול מדי למציאות קטנה מדי.",
    "מעלה תחתית היא קומדיה על אנשים שחוששים משינוי, על אלה שמתעקשים עליו, ועל ההתרסקות המצחיקה שבדרך."
  ],
  "cocktail-night": [
    "לילה עירוני בקותאי שמכניס את הברים המקומיים לתוך מסלול הפסטיבל.",
    "נקודת מפגש לא פורמלית בין מופעים, אמנים וקהל."
  ],
  "weather-storm": [
    "ערב מחול בכורה בבית למחול, השוזר שתי יצירות וארבע דמויות המחוברות בחוט בלתי נראה.",
    "העבודה נעה בין גוף, מתח, סופה פנימית וקשרים שנמתחים עד הקצה."
  ],
  "live-sol": [
    "מופע גלריה אינטימי בגלריה Sol.",
    "תחנת מוזיקה קטנה בתוך מסלול העיר, שמוסיפה לפסטיבל שכבה קרובה ומקומית."
  ],
  "itzik-kala": [
    "איציק קלה, מאבני היסוד של המוזיקה הישראלית והים־תיכונית, על במה אחת עם דניאל וייס.",
    "קלה מלווה את פס הקול הישראלי מעל חמישה עשורים עם יותר מ־30 אלבומים ושירים שהפכו לנכסי צאן ברזל."
  ],
  "alma-galbi": [
    "מחווה ראשונה מסוגה לעפרה חזה, שבה המוזיקה התימנית והפלמנקו נפגשים על במה אחת.",
    "פיוטים תימניים ולהיטי פופ כמו ״אם ננעלו״ ו״לאורך הים״ מקבלים צורות פלמנקו של בולריה, פנדנגוס, טנגוס ורומבה.",
    "ארבעה מוזיקאים וירטואוזיים ורקדנית הפלמנקו אדוה ירמיהו יוצרים עולם מוזיקלי חדש ופורץ גבולות."
  ],
  "idan-haviv": [
    "מופע אינטימי מיוחד לט״ו באב במיוזיק סיטי.",
    "ערב שירים קרוב ואישי של אחד הקולות המזוהים במוזיקה הישראלית העכשווית."
  ],
  "neta-alima": [
    "נטע עלימה במופע להקה ראשון עם שירים שלה ושל אחרים.",
    "הופעה חופשית עם שורה של נגנים מקומיים, לקראת אלבום ראשון ומתוך סצנת היצירה הבאר שבעית."
  ],
  "noah": [
    "תיאטרון נוח מציג הצגה מוזיקלית לילדים על נוח והתיבה.",
    "כיצד מצליח נוח לצלוח את המבול עם חוכמה, תושייה ואומץ.",
    "הצגה עם שירים לגילי 3-8, מאת דרור רינצלר ובביצוע נדב זילברמן."
  ],
  "yalla-la": [
    "מופע מוזיקלי משפחתי במוזיאון הנגב לאמנות.",
    "שירים ישראליים אהובים, אנרגיה קלילה וקהל מכל הגילים."
  ],
  "empty-pot": [
    "תיאטרון קטן רכוב על אופניים שנודד בעולם ואוסף סיפורים לתיבה.",
    "הילדים מוזמנים לפתוח את התיבה, לגלות הפתעות, ולשמוע סיפורים שמגיעים ממקומות רחוקים.",
    "יצירה של איילה פרל ותיאטרון איילושקה."
  ],
  "goodman": [
    "מופע סיום של מצוינות גודמן ברחבת תיאטרון הפרינג׳.",
    "חשיפה פתוחה לדור הבא של יוצרים ושחקנים בעיר."
  ],
  "street-concert": [
    "תזמורת כלי הנשיפה העירונית באר שבע יוצאת מן האולם אל הרחבה.",
    "קונצרט פתוח לכל המשפחה, כחלק מהפיכת העיר לבמה חיה."
  ],
  "sounds-stories": [
    "מופע בכורה מוזיקלי של אנסמבל תרשיש ושי צברי.",
    "המופע משלב קטעי קריאה מספרו של רפי שטרית בביצוע השחקנית זיו טובול, נכדתו של שטרית."
  ],
  "greek": [
    "חגיגה יוונית עם הזמר עידן סלע ברחבת תיאטרון הפרינג׳.",
    "טברנה פתוחה, קצב ים־תיכוני ואווירת רחבה שמחה."
  ],
  "keren-peles": [
    "קרן פלס, מהיוצרות והפרפורמריות הבולטות בישראל, מגיעה למופע להיטים במיוזיק סיטי.",
    "המופע כולל שירים שכתבה וביצעה לאורך שני עשורים, לצד יצירות שכתבה לאחרים."
  ],
  "dj-jacques": [
    "סט יווני של דיג׳יי ז׳אק אבו נז׳מון לסגירת הערב ברחבה.",
    "רגע לילה חופשי שממשיך את האנרגיה של הטברנה אל הרחוב."
  ],
  "family-carnival": [
    "קרנבל משפחות פתוח ברחבת תמוז בית המוזיקה.",
    "פעילות פתיחה ליום הסיום, עם אווירה חופשית לילדים ולהורים."
  ],
  "art-more-30": [
    "סדנת Art & More בבית הבובות.",
    "מפגש צבע ודמיון שמציע הפוגה יצירתית בתוך יום הסיום."
  ],
  "beer-festival": [
    "פסטיבל בירה עם מגוון בירות מיוחדות וקיציות ממבשלות בארץ ומחו״ל.",
    "מתחיל ביום חמישי 30.7 בשעה 19:00 בבית הבירה."
  ],
  "yalla-street": [
    "תזמורת רחוב סוחפת של מוזיקאים, שחקנים ואמני רחוב.",
    "המופע משלב קרקס, ליצנות, אילתור וקשר ישיר עם הקהל באווירה ים־תיכונית.",
    "הרפרטואר נע בין פופ, סווינג, ניו אורלינס וחפלה."
  ],
  "light-unbearable": [
    "קומדיה אבסורדית המתרחשת סביב ארוחת ערב אקראית בערב יום חול.",
    "כאשר אחד הסועדים מודיע שהוא מתכוון להתאבד, השיחה סביב השולחן מתפרקת לרצף של ויכוחים, מערכונים, ריקודים וזיכרונות.",
    "יוצר ובמאי: יונתן שופטי קומיי. משתתפים: ירדן נוימרק, זואי שטיינברג, נועה שרפי ורוני שרון."
  ],
  "crete-weekend": [
    "דרמה משפחתית ישראלית על ארי פלד, לוחם פלמ״ח לשעבר, המזמין את בנו ונכדו לסוף שבוע בביתו שבכרתים.",
    "המפגש החגיגי הופך להתנגשות בין שלושה דורות, סודות משפחתיים, טראומות מלחמה ושאלות על ירושה, גבריות, זקנה ומוות.",
    "מחזה ישראלי עכשווי המשלב הומור מושחז, רגעי חסד ומבט חד על מה שעובר מדור לדור."
  ],
  "david-broza": [
    "דויד ברוזה חוגג 40 שנה לאלבום ״האשה שאיתי״.",
    "המופע משלב את שירי האלבום עם הרפרטואר הרחב של ברוזה: ״יהיה טוב״, ״שיר אהבה בדואי״, ״ברקים ורעמים״ ועוד.",
    "ברוזה מביא לבמה נגינה דינמית, השפעות פלמנקו, פולק ורוקנרול, ואנרגיה בינלאומית."
  ],
  "yalla-covers": [
    "מופע קאברים מוזיקלי שמחבר פופ, סווינג, ניו אורלינס וחפלה.",
    "תזמורת הרחוב יוצרת אינטראקציה מתמדת עם הקהל והופכת את הרחבה להפנינג חי."
  ],
  "mor-chen": [
    "מור חן במופע סטנדאפ אנרגטי וכנה על זוגיות, משפחה, חברות נשית והשנה ההזויה שעברנו.",
    "חן חושפת פחדים, תובנות ורגעים פחות קומיים של החיים בצורה הכי קומית שיש."
  ],
  "netta": [
    "נטע ברזילי מגיעה למופע חד־פעמי ומחשמל עם הלופר המפורסם שלה ולהקה חיה.",
    "כל שיר נבנה בזמן אמת בשכבות של צלילים וקולות, עם עיבודים חדשים ולהיטים כמו Toy, Bassa Sababa ו״אפס מאמץ״.",
    "המופע משלב אנרגיה, רגש, הומור ויצירה חיה שמתרחשת מול הקהל."
  ]
};

export const freeHighlights = events.filter(
  (event) => event.price === "free" && ["music", "street", "family"].includes(event.category)
);

export const premiereEvents = events.filter((event) => event.isPremiere);
