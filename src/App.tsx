import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  MapPin,
  Sparkles,
  Star,
  Theater,
  Ticket,
  X
} from "lucide-react";
import {
  categoryLabels,
  eventDetails,
  events,
  festivalDays,
  freeHighlights,
  premiereEvents,
  ticketEvents,
  type DayId,
  type EventCategory,
  type FestivalEvent
} from "./data/festival";

const categoryOrder: Array<"all" | EventCategory> = [
  "all",
  "theater",
  "music",
  "dance",
  "family",
  "street",
  "workshop",
  "standup",
  "city"
];

const categoryFilterLabels: Record<"all" | EventCategory, string> = {
  all: "הכל",
  ...categoryLabels
};

const priceLabel: Record<FestivalEvent["price"], string> = {
  ticket: "רכישת כרטיס",
  free: "כניסה חופשית",
  details: "פרטים"
};

function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useScrollSignals() {
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max <= 0 ? 0 : window.scrollY / max;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
      document.documentElement.style.setProperty("--scroll-y", String(window.scrollY));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

function imageSet(name: string, widths = [480, 720, 960]) {
  return widths.map((width) => `/media/images/${name}-${width}.webp ${width}w`).join(", ");
}

function mediaName(src?: string) {
  if (!src) return undefined;
  return src.split("/").pop()?.replace(/-\d+\.webp$/, "");
}

function EventImage({ event, className = "", alt = "" }: { event: FestivalEvent; className?: string; alt?: string }) {
  const name = mediaName(event.image);

  if (!event.image || !name) {
    return (
      <div className={`event-art fallback-art accent-${event.accent} ${className}`} aria-hidden="true">
        <span>{event.dateLabel}</span>
        <strong>{event.title}</strong>
      </div>
    );
  }

  return (
    <img
      className={`event-art ${className}`}
      src={event.image}
      srcSet={imageSet(name)}
      sizes="(max-width: 680px) 88vw, (max-width: 1100px) 42vw, 31vw"
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}

function IntroCurtain({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isExitingRef = useRef(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscroll;
    };
  }, []);

  const closeIntro = () => {
    if (isExitingRef.current) return;

    isExitingRef.current = true;
    setIsExiting(true);
    videoRef.current?.pause();
    window.setTimeout(onClose, 820);
  };

  const startIntro = async () => {
    const video = videoRef.current;
    setHasStarted(true);
    if (!video) return;

    video.defaultMuted = false;
    video.muted = false;
    video.volume = 1;
    video.currentTime = 0;

    await video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => undefined);
    });
  };

  return (
    <section className={`intro-curtain ${hasStarted ? "is-playing" : "is-gated"} ${isExiting ? "is-exiting" : ""}`} aria-label="סרטון פתיחה">
      <video
        ref={videoRef}
        className="intro-video"
        playsInline
        preload="auto"
        onEnded={closeIntro}
        poster="/media/images/festival-key-art-720.webp"
      >
        <source src="/media/videos/intro-mobile.mp4" media="(max-width: 760px)" type="video/mp4" />
        <source src="/media/videos/intro-desktop.mp4" type="video/mp4" />
      </video>
      <div className="intro-shade" />

      {!hasStarted && (
        <div className="intro-gate">
          <span className="intro-gate-kicker">פסטיבל הפרינג׳ הבינלאומי באר שבע</span>
          <strong>לפני שהעיר נדלקת</strong>
          <button className="intro-lift-button" type="button" onClick={startIntro}>
            <Theater size={21} aria-hidden="true" />
            הרם את המסך
          </button>
          <button className="intro-gate-skip" type="button" onClick={closeIntro}>
            דלג לאתר
          </button>
        </div>
      )}

      {hasStarted && (
        <div className="intro-actions">
          <button className="skip-button" type="button" onClick={closeIntro}>
            דלג
          </button>
        </div>
      )}
    </section>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="scroll-meter" aria-hidden="true" />
      <a className="brand-mark" href="#top" aria-label="חזרה לראש הדף">
        <span>IFF</span>
        <small dir="ltr">BE'ER SHEVA</small>
      </a>
      <nav className="site-nav" aria-label="ניווט ראשי">
        <a href="#story">הסיפור</a>
        <a href="#tickets">כרטיסים</a>
        <a href="#schedule">לו״ז</a>
        <a href="#free">חופשי</a>
      </nav>
      <a className="header-cta" href="#tickets">
        <Ticket size={18} />
        כרטיסים
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-text" data-reveal>
        <p className="hero-kicker">27-30.7.2026 · באר שבע</p>
        <h1>
          פסטיבל
          <span>הפרינג׳</span>
          הבינלאומי
        </h1>
        <p className="hero-lead">
          ארבעה ימים שבהם העיר העתיקה הופכת לבמה: תיאטרון, מוזיקה, מחול, בכורות, אמנות רחוב וסיפורים שנשארים בגוף אחרי
          שהמסך יורד.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#tickets">
            <Ticket size={20} />
            לרכישת כרטיסים
          </a>
          <a className="secondary-action" href="#schedule">
            <CalendarDays size={20} />
            צפייה בלו״ז
          </a>
        </div>
      </div>

      <div className="hero-collage" data-reveal>
        <div className="collage-shadow" aria-hidden="true" />
        <picture>
          <source
            srcSet="/media/images/festival-key-art-720.webp 720w, /media/images/festival-key-art-1080.webp 1080w, /media/images/festival-key-art-1440.webp 1440w"
            sizes="(max-width: 800px) 88vw, 44vw"
          />
          <img src="/media/images/festival-key-art-1080.webp" alt="פסטיבל הפרינג׳ הבינלאומי באר שבע 2026" />
        </picture>
        <span className="torn-eye" aria-hidden="true">אנשים. סיפורים. עיר.</span>
      </div>

      <a className="scroll-cue" href="#story" aria-label="גלילה לסיפור הפסטיבל">
        <ArrowDown size={22} />
      </a>
    </section>
  );
}

function CountUpStat({
  value,
  suffix = "",
  text,
  label,
  delay = 0,
  shouldStart
}: {
  value?: number;
  suffix?: string;
  text?: string;
  label: string;
  delay?: number;
  shouldStart: boolean;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(value === undefined ? (text ?? "") : `0${suffix}`);

  useEffect(() => {
    if (!shouldStart || value === undefined) return;

    const item = itemRef.current;
    if (!item) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayValue(`${value}${suffix}`);
      return;
    }

    let frame = 0;
    let hasStarted = false;
    const duration = 820;

    const animate = () => {
      const startTime = performance.now() + delay;
      const tick = (now: number) => {
        if (now < startTime) {
          frame = requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(`${Math.round(value * eased)}${suffix}`);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasStarted) return;
        hasStarted = true;
        observer.disconnect();
        animate();
      },
      { threshold: 0.45 }
    );

    observer.observe(item);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [delay, shouldStart, suffix, value]);

  return (
    <div ref={itemRef} data-reveal>
      <strong aria-label={value === undefined ? text : `${value}${suffix}`}>{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
}

function StatRail({ shouldStart }: { shouldStart: boolean }) {
  const stats = [
    { value: 4, label: "ימים" },
    { value: 30, suffix: "+", label: "מופעים וחוויות" },
    { value: 7, label: "בכורות" },
    { text: "עיר", label: "שהופכת לבמה" }
  ];

  return (
    <section className="stat-rail" aria-label="נתוני הפסטיבל">
      {stats.map((stat, index) => (
        <CountUpStat key={stat.label} {...stat} delay={index * 90} shouldStart={shouldStart} />
      ))}
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="story-section">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">העיר היא הבמה</span>
        <h2>אנשים. סיפורים. עיר.</h2>
      </div>
      <div className="story-grid">
        <p data-reveal>
          פסטיבל הפרינג׳ הבינלאומי באר שבע חוזר במהדורה ה־16 ומזמין את הקהל להיכנס אל מרחב שבו העיר העתיקה, האולמות,
          הרחבות, הברים והמוזיאונים נעשים חלק מאותה הצגה.
        </p>
        <p data-reveal>
          השנה הפסטיבל חוזר לארח מופעים בינלאומיים מצ׳כיה ומספרד, מעניק זרקור ליצירה מקומית מהדרום, ומחבר בין תיאטרון
          עצמאי, מחול, מוזיקה, ילדים ואמנות רחוב במסלול אחד חי.
        </p>
        <div className="story-manifesto" data-reveal>
          <Sparkles size={24} />
          <strong>לא באים לצפות מרחוק. נכנסים פנימה.</strong>
          <span>כל גלילה חושפת במה נוספת, דמות נוספת, סיבה נוספת להיות שם.</span>
        </div>
      </div>
    </section>
  );
}

function TicketCard({ event, index, onSelectEvent }: { event: FestivalEvent; index: number; onSelectEvent: (event: FestivalEvent) => void }) {
  const openEvent = () => onSelectEvent(event);

  return (
    <article
      className={`ticket-card accent-${event.accent}`}
      data-reveal
      role="button"
      tabIndex={0}
      onClick={openEvent}
      onKeyDown={(keyboardEvent) => {
        if (keyboardEvent.target !== keyboardEvent.currentTarget) return;
        if (keyboardEvent.key !== "Enter" && keyboardEvent.key !== " ") return;
        keyboardEvent.preventDefault();
        openEvent();
      }}
      aria-label={`פתיחת פרטים: ${event.title}`}
      style={{ "--delay": `${Math.min(index * 60, 360)}ms` } as CSSProperties}
    >
      <EventImage event={event} />
      <div className="ticket-card-body">
        <div className="event-meta">
          <span>
            <Clock size={16} />
            {event.time} · {event.dateLabel}
          </span>
          <span>
            <MapPin size={16} />
            {event.venue}
          </span>
        </div>
        <h3>{event.title}</h3>
        {event.subtitle && <p className="subtitle">{event.subtitle}</p>}
        <p>{event.short}</p>
        <div className="tag-row">
          {event.isPremiere && <span className="tag-badge tag-premiere">בכורה</span>}
          {event.isInternational && <span className="tag-badge tag-international">בינלאומי</span>}
          <span className={`tag-badge tag-category-${event.category}`}>{categoryLabels[event.category]}</span>
        </div>
        <a className="card-action row-action price-ticket" href={event.ticketUrl} target="_blank" rel="noreferrer" onClick={(clickEvent) => clickEvent.stopPropagation()}>
          {priceLabel[event.price]}
          <Ticket size={17} />
        </a>
      </div>
    </article>
  );
}

function TicketSection({ onSelectEvent }: { onSelectEvent: (event: FestivalEvent) => void }) {
  return (
    <section id="tickets" className="tickets-section">
      <div className="section-heading inverted" data-reveal>
        <span className="eyebrow">המופעים עם כרטיסים</span>
        <h2>בחרו את הערב שימשוך אתכם מהרחוב אל האולם</h2>
      </div>
      <div className="ticket-grid">
        {ticketEvents.map((event, index) => (
          <TicketCard key={event.id} event={event} index={index} onSelectEvent={onSelectEvent} />
        ))}
      </div>
    </section>
  );
}

function PremiereSection({ onSelectEvent }: { onSelectEvent: (event: FestivalEvent) => void }) {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const displayedPremiereEvents = useMemo(() => [...premiereEvents].reverse(), []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let frame = 0;
    const positionAtEnd = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        strip.scrollLeft = Math.max(0, strip.scrollWidth - strip.clientWidth);
      });
    };

    positionAtEnd();
    window.addEventListener("resize", positionAtEnd);

    const resizeObserver = new ResizeObserver(positionAtEnd);
    resizeObserver.observe(strip);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", positionAtEnd);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollPremieres = (direction: "left" | "right") => {
    const strip = stripRef.current;
    if (!strip) return;

    const distance = Math.round(strip.clientWidth * 0.72);
    strip.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth"
    });
  };

  return (
    <section className="premiere-section">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">בכורות</span>
        <h2>יצירה שנולדת כאן, מולכם</h2>
      </div>
      <div className="premiere-stage has-prev has-next" data-reveal>
        <button className="premiere-control premiere-next" type="button" onClick={() => scrollPremieres("left")} aria-label="בכורות נוספות">
          <ChevronLeft size={24} />
        </button>
        <div className="premiere-strip" ref={stripRef}>
          {displayedPremiereEvents.map((event) => (
            <button
              key={event.id}
              className={`premiere-item accent-${event.accent}`}
              type="button"
              onClick={() => onSelectEvent(event)}
              aria-label={`פתיחת פרטים: ${event.title}`}
            >
              <span className="premiere-time">{event.time}</span>
              <span className="premiere-title">{event.title}</span>
              <span className="premiere-description">{event.short}</span>
            </button>
          ))}
        </div>
        <button className="premiere-control premiere-prev" type="button" onClick={() => scrollPremieres("right")} aria-label="חזרה בבכורות">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}

function ScheduleSection({ onSelectEvent }: { onSelectEvent: (event: FestivalEvent) => void }) {
  const [activeDay, setActiveDay] = useState<DayId>("27");
  const [activeCategory, setActiveCategory] = useState<"all" | EventCategory>("all");

  const availableCategories = useMemo(() => {
    const dayEvents = events.filter((event) => event.day === activeDay);
    return categoryOrder.filter((category) => category === "all" || dayEvents.some((event) => event.category === category));
  }, [activeDay]);

  useEffect(() => {
    if (!availableCategories.includes(activeCategory)) {
      setActiveCategory("all");
    }
  }, [activeCategory, availableCategories]);

  const visibleCategory = availableCategories.includes(activeCategory) ? activeCategory : "all";

  const filtered = useMemo(() => {
    return events.filter((event) => event.day === activeDay && (visibleCategory === "all" || event.category === visibleCategory));
  }, [activeDay, visibleCategory]);

  return (
    <section id="schedule" className="schedule-section">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">לו״ז חי</span>
        <h2>ארבעה ימים, מסלול אחד שנפתח בכל ערב מחדש</h2>
      </div>

      <div className="day-tabs" role="tablist" aria-label="בחירת יום בפסטיבל" data-reveal>
        {festivalDays.map((day) => (
          <button
            key={day.id}
            type="button"
            className={activeDay === day.id ? "is-active" : ""}
            onClick={() => setActiveDay(day.id)}
            role="tab"
            aria-selected={activeDay === day.id}
          >
            <strong>{day.date}</strong>
            <span>{day.label}</span>
            <small>{day.mood}</small>
          </button>
        ))}
      </div>

      <div className="category-filter" aria-label="סינון לפי קטגוריה" data-reveal>
        {availableCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={visibleCategory === category ? "is-active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {categoryFilterLabels[category]}
          </button>
        ))}
      </div>

      <div className="schedule-list" data-reveal>
        {filtered.map((event) => (
          <article key={event.id} className={`schedule-row accent-${event.accent}`} onClick={() => onSelectEvent(event)}>
            <time>{event.time}</time>
            <div className="schedule-main">
              <h3 className="schedule-title">
                <span>{event.title}</span>
                {event.isPremiere && <span className="premiere-badge">בכורה</span>}
                {event.price === "free" && <span className="free-entry-badge">כניסה חופשית</span>}
              </h3>
              <p>{event.subtitle ?? categoryLabels[event.category]}</p>
            </div>
            <span className="venue">
              <MapPin size={16} />
              {event.venue}
            </span>
            {event.ticketUrl && event.price !== "free" ? (
              <a
                className={`row-action price-${event.price}`}
                href={event.ticketUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`רכישת כרטיסים עבור ${event.title}`}
                onClick={(clickEvent) => clickEvent.stopPropagation()}
              >
                <Ticket size={18} />
                {priceLabel[event.price]}
              </a>
            ) : (
              <button
                className="row-action price-details"
                type="button"
                onClick={(clickEvent) => {
                  clickEvent.stopPropagation();
                  onSelectEvent(event);
                }}
                aria-label={`פתיחת פרטים עבור ${event.title}`}
              >
                <Sparkles size={18} />
                {event.price === "free" ? "פרטים" : priceLabel[event.price]}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function CitySection() {
  const places = [
    "רחבת תיאטרון הפרינג׳",
    "אולם תיאטרון הפרינג׳",
    "תמוז בית המוזיקה",
    "מיוזיק סיטי",
    "אמפי עומר",
    "הבית למחול",
    "עשן הזמן",
    "בית הבירה",
    "מוזיאון הנגב לאמנות"
  ];

  return (
    <section className="city-section">
      <div className="city-copy" data-reveal>
        <span className="eyebrow">הפסטיבל מתפשט בעיר</span>
        <h2>לא מופע אחד. עיר שלמה שנפתחת כמו תפאורה.</h2>
        <p>
          המסלול של הפסטיבל בנוי כמו שיטוט: אולם, רחבה, גלריה, בר, מוזיאון, אמפי. בכל מקום מחכה טון אחר, קהל אחר,
          רגע אחר.
        </p>
      </div>
      <div className="place-marquee" aria-hidden="true">
        <div>
          {[...places, ...places].map((place, index) => (
            <span key={`${place}-${index}`}>{place}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeSection({ onSelectEvent }: { onSelectEvent: (event: FestivalEvent) => void }) {
  return (
    <section id="free" className="free-section">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">כניסה חופשית</span>
        <h2>רגעים שאפשר פשוט להיכנס אליהם</h2>
      </div>
      <div className="free-grid">
        {freeHighlights.slice(0, 8).map((event) => (
          <button key={event.id} className={`free-card accent-${event.accent}`} type="button" onClick={() => onSelectEvent(event)} data-reveal>
            <EventImage event={event} />
            <span className="free-card-body">
              <span>{event.dateLabel} · {event.time}</span>
              <h3>{event.title}</h3>
              <p>{event.venue}</p>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function VideoMemory() {
  const [activeVideo, setActiveVideo] = useState<"2024" | "2023">("2024");
  const [pausedVideos, setPausedVideos] = useState<Record<"2024" | "2023", boolean>>({
    "2024": true,
    "2023": true
  });
  const recap2024Ref = useRef<HTMLVideoElement | null>(null);
  const recap2023Ref = useRef<HTMLVideoElement | null>(null);

  const getMemoryVideos = (videoId: "2024" | "2023") => ({
    selected: videoId === "2024" ? recap2024Ref.current : recap2023Ref.current,
    other: videoId === "2024" ? recap2023Ref.current : recap2024Ref.current
  });

  const activateVideo = (videoId: "2024" | "2023") => () => setActiveVideo(videoId);
  const activateAndPlayVideo = (videoId: "2024" | "2023") => () => {
    setActiveVideo(videoId);
    const { selected, other } = getMemoryVideos(videoId);
    other?.pause();

    if (selected?.paused) {
      void selected.play().catch(() => undefined);
    }
  };

  const handleNativePlay = (videoId: "2024" | "2023") => () => {
    setActiveVideo(videoId);
    getMemoryVideos(videoId).other?.pause();
    setPausedVideos((current) => ({ ...current, [videoId]: false }));
  };

  const handleNativePause = (videoId: "2024" | "2023") => () => {
    setPausedVideos((current) => ({ ...current, [videoId]: true }));
  };

  return (
    <section className="memory-section">
      <div className="memory-copy" data-reveal>
        <span className="eyebrow">מה נשאר אחרי מחיאות הכפיים</span>
        <h2>האנרגיה כבר הייתה כאן. השנה היא חוזרת חדה יותר.</h2>
        <p>
          רגע קצר מפסטיבלים קודמים, לא כדי להתרפק, אלא כדי להבין את הקצב: הרחבה מתמלאת, העיר נדלקת, והקהל נהיה חלק
          מהיצירה.
        </p>
      </div>
      <div className="memory-videos" data-reveal>
        <figure
          className={`memory-video-card memory-video-card-primary ${activeVideo === "2024" ? "is-active" : ""}`}
          onPointerDown={activateVideo("2024")}
          onFocusCapture={activateVideo("2024")}
        >
          <span className="memory-year">2024</span>
          <video
            ref={recap2024Ref}
            controls
            preload="metadata"
            poster="/media/images/recap-2024-poster.webp"
            aria-label="רגעים מפסטיבל הפרינג' 2024"
            onPointerDown={activateAndPlayVideo("2024")}
            onPlay={handleNativePlay("2024")}
            onPause={handleNativePause("2024")}
          >
            <source src="/media/videos/recap-2024.mp4" type="video/mp4" />
          </video>
          {(activeVideo !== "2024" || pausedVideos["2024"]) && (
            <button className="memory-video-hitbox" type="button" onPointerDown={activateAndPlayVideo("2024")} onClick={activateAndPlayVideo("2024")}>
              <span className="sr-only">העבר את סרטון 2024 לחזית</span>
            </button>
          )}
        </figure>
        <figure
          className={`memory-video-card memory-video-card-secondary ${activeVideo === "2023" ? "is-active" : ""}`}
          onPointerDown={activateVideo("2023")}
          onFocusCapture={activateVideo("2023")}
        >
          <span className="memory-year">2023</span>
          <video
            ref={recap2023Ref}
            controls
            preload="metadata"
            poster="/media/images/recap-2023-poster.webp"
            aria-label="רגעים מפסטיבל הפרינג' 2023"
            onPointerDown={activateAndPlayVideo("2023")}
            onPlay={handleNativePlay("2023")}
            onPause={handleNativePause("2023")}
          >
            <source src="/media/videos/recap-2023.mp4" type="video/mp4" />
          </video>
          {(activeVideo !== "2023" || pausedVideos["2023"]) && (
            <button className="memory-video-hitbox" type="button" onPointerDown={activateAndPlayVideo("2023")} onClick={activateAndPlayVideo("2023")}>
              <span className="sr-only">העבר את סרטון 2023 לחזית</span>
            </button>
          )}
        </figure>
      </div>
    </section>
  );
}

function EventDetailDialog({ event, onClose }: { event: FestivalEvent | null; onClose: () => void }) {
  useEffect(() => {
    if (!event) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const details = eventDetails[event.id] ?? [event.short];
  const titleId = `event-dialog-${event.id}`;

  return (
    <div className="event-dialog-backdrop" onMouseDown={onClose}>
      <article className={`event-dialog accent-${event.accent}`} role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={(event) => event.stopPropagation()}>
        <button className="dialog-close" type="button" onClick={onClose} aria-label="סגירת פרטי מופע">
          <X size={22} />
        </button>
        <div className="dialog-media">
          <EventImage event={event} alt="" />
        </div>
        <div className="dialog-content">
          <div className="event-meta dialog-meta">
            <span>
              <Clock size={16} />
              {event.time} · {event.dateLabel}
            </span>
            <span>
              <MapPin size={16} />
              {event.venue}
            </span>
            <span>
              <Star size={16} />
              {categoryLabels[event.category]}
            </span>
          </div>
          <div className="dialog-title-row">
            <h2 id={titleId}>{event.title}</h2>
            <div className="dialog-badges" aria-label="סימוני מופע">
              {event.isPremiere && <span className="premiere-badge">בכורה</span>}
              {event.price === "free" && <span className="free-entry-badge">כניסה חופשית</span>}
            </div>
          </div>
          {event.subtitle && <p className="subtitle">{event.subtitle}</p>}
          <div className="dialog-details">
            {details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
          <div className="dialog-actions">
            {event.ticketUrl && (
              <a className="primary-action" href={event.ticketUrl} target="_blank" rel="noreferrer">
                <Ticket size={20} />
                רכישת כרטיס
              </a>
            )}
            <a className="secondary-action" href="/media/docs/program-2026.pdf" target="_blank" rel="noreferrer">
              <Download size={20} />
              תוכניה מלאה
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div data-reveal>
        <span className="eyebrow">המסך הבא שלכם</span>
        <h2>בחרו כרטיס, סמנו ערב, ותנו לעיר לעשות את השאר.</h2>
        <p>פסטיבל הפרינג׳ הבינלאומי באר שבע · 27-30 ביולי 2026</p>
      </div>
      <div className="final-actions" data-reveal>
        <a className="primary-action" href="#tickets">
          <Ticket size={20} />
          רכישת כרטיסים
        </a>
        <a className="secondary-action light" href="/media/docs/program-2026.pdf" target="_blank" rel="noreferrer">
          <Download size={20} />
          תוכניה מלאה
        </a>
      </div>
    </section>
  );
}

function FloatingPurchase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={`floating-purchase ${isVisible ? "is-visible" : ""}`} aria-label="קישורי רכישה מהירים">
      <a href="#tickets">
        <Ticket size={18} />
        כרטיסים
      </a>
      <span>27-30.7</span>
    </aside>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => !window.location.search.includes("skipIntro=1"));
  const [selectedEvent, setSelectedEvent] = useState<FestivalEvent | null>(null);
  useReveal();
  useScrollSignals();

  return (
    <>
      {showIntro && <IntroCurtain onClose={() => setShowIntro(false)} />}
      <Header />
      <main>
        <Hero />
        <StatRail shouldStart={!showIntro} />
        <StorySection />
        <TicketSection onSelectEvent={setSelectedEvent} />
        <PremiereSection onSelectEvent={setSelectedEvent} />
        <CitySection />
        <ScheduleSection onSelectEvent={setSelectedEvent} />
        <FreeSection onSelectEvent={setSelectedEvent} />
        <VideoMemory />
        <FinalCta />
      </main>
      <FloatingPurchase />
      <EventDetailDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <footer className="site-footer">
        <div className="footer-links">
          <a href="/media/docs/schedule-2026.pdf" target="_blank" rel="noreferrer">
            לו״ז PDF
          </a>
          <a href="/media/docs/program-2026.pdf" target="_blank" rel="noreferrer">
            תוכניה מלאה
          </a>
        </div>
        <div className="footer-brand">
          <strong>IFF</strong>
          <span dir="ltr">International Fringe Festival Be'er Sheva</span>
        </div>
      </footer>
    </>
  );
}
