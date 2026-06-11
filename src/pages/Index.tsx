import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const COUPLE_PHOTO = "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/bucket/aed09986-69f5-4dd1-b2c6-f25a4cd9ea54.jpg";

const GALLERY = [
  { src: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/bucket/d7911524-8b6e-4eba-922a-74d9b458858b.jpg" },
  { src: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/bucket/9bf0e94f-86f8-4004-89ae-44a8974f63b1.jpg" },
];

const LOCATIONS = [
  {
    icon: "💍",
    title: "Регистрация брака",
    date: "11 сентября 2026",
    time: "14:20",
    address: "Молодогвардейская, 238, Самара",
    dresscode: "Официальный торжественный стиль",
    mapUrl: "https://yandex.ru/maps/?text=Молодогвардейская+238+Самара",
    img: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/files/1441c6d7-e15a-4727-af30-3f88a0a75055.jpg",
  },
  {
    icon: "🥂",
    title: "Праздничный банкет",
    date: "12 сентября 2026",
    time: "15:00",
    address: "массив Орлов Овраг, Кленовая улица, 35, Самара",
    dresscode: "Свободный удобный стиль",
    mapUrl: "https://yandex.ru/maps/?text=Кленовая+35+Самара",
    img: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/files/9be49a14-6697-4c73-bea4-d22c030528f1.jpg",
  },
];

function Flower({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} fill="none">
      <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.9" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i} cx="20" cy="20" rx="3.5" ry="8" fill="currentColor" opacity="0.5"
          transform={`rotate(${deg} 20 20) translate(0 -9)`} />
      ))}
    </svg>
  );
}

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 20" fill="none">
      <path d="M0 10 Q15 2 30 10 Q45 18 60 10 Q75 2 90 10 Q105 18 120 10"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21C12 21 3 14 3 8a4 4 0 0 1 8-1.16A4 4 0 0 1 21 8c0 6-9 13-9 13z" />
    </svg>
  );
}

const DAYS_HEADER = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
function buildCalendar() {
  const cells: (number | null)[] = [null]; // Сентябрь 2026 начинается со вторника
  for (let d = 1; d <= 30; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const TARGET = new Date("2026-09-11T14:20:00");
function getCountdown() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
function pad(n: number) { return String(n).padStart(2, "0"); }

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Index() {
  const [countdown, setCountdown] = useState(getCountdown());
  const calendarCells = buildCalendar();
  const timerSection = useInView();
  const locSection = useInView();
  const galSection = useInView();
  const wishSection = useInView();

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ fontFamily: "'Nunito', sans-serif", background: "linear-gradient(180deg, #fdf5f8 0%, #f5e8f8 18%, #ecdff0 35%, #e8f0f5 55%, #f0e8f5 75%, #fde8ef 90%, #f5e0ec 100%)" }}>

      {/* ── КИСТЕВОЙ ФОН ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 430 3200" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Верхняя зона — волна слева */}
          <path d="M-20 80 Q60 40 130 90 Q200 140 270 80 Q340 20 420 70" stroke="#e8a0c0" strokeWidth="5" strokeLinecap="round" opacity="0.35"/>
          {/* Завиток правый верх */}
          <path d="M360 30 Q390 10 410 40 Q430 70 400 90 Q370 110 355 85 Q345 65 365 55 Q380 48 390 60" stroke="#b5d4a0" strokeWidth="3.5" strokeLinecap="round" opacity="0.4"/>
          {/* Мазок-брызг левый */}
          <path d="M10 180 Q35 165 55 185 Q70 200 50 210" stroke="#e8a0c0" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
          <circle cx="15" cy="175" r="3" fill="#e8a0c0" opacity="0.3"/>
          <circle cx="62" cy="205" r="2" fill="#e8a0c0" opacity="0.25"/>

          {/* Средняя зона ~700 — широкая волна */}
          <path d="M-10 700 Q80 650 160 710 Q240 770 320 700 Q390 635 440 690" stroke="#c4a8d8" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
          {/* Петля-завиток слева */}
          <path d="M20 780 Q-10 820 20 860 Q50 900 80 870 Q110 840 90 810 Q70 785 45 800" stroke="#a8c8b0" strokeWidth="3.5" strokeLinecap="round" opacity="0.35"/>
          {/* Точки-брызги */}
          <circle cx="380" cy="750" r="4" fill="#e0a0b8" opacity="0.3"/>
          <circle cx="395" cy="760" r="2.5" fill="#e0a0b8" opacity="0.25"/>
          <circle cx="370" cy="770" r="2" fill="#e0a0b8" opacity="0.2"/>
          {/* Волнистая линия вправо */}
          <path d="M250 820 Q290 800 310 830 Q330 860 370 845" stroke="#b8a0d0" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>

          {/* Зона ~1200 — диагональный мазок */}
          <path d="M-15 1200 Q120 1150 200 1210 Q280 1270 430 1190" stroke="#d4b8e0" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.22"/>
          {/* Маленькие волны справа */}
          <path d="M300 1280 Q320 1265 340 1280 Q360 1295 380 1280 Q400 1265 420 1278" stroke="#a8c4a0" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"/>
          {/* Завиток слева */}
          <path d="M30 1320 Q55 1295 75 1320 Q95 1345 75 1365 Q55 1385 35 1360" stroke="#e0b0c8" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
          <circle cx="25" cy="1325" r="3" fill="#e0b0c8" opacity="0.25"/>

          {/* Зона ~1700 — горизонтальная волна */}
          <path d="M0 1720 Q70 1690 140 1730 Q210 1770 280 1720 Q350 1670 430 1710" stroke="#c8a0d4" strokeWidth="5.5" strokeLinecap="round" opacity="0.28"/>
          {/* Мазки-штрихи */}
          <path d="M350 1790 Q370 1778 385 1795" stroke="#b0c8a8" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
          <path d="M355 1808 Q378 1798 390 1812" stroke="#b0c8a8" strokeWidth="3" strokeLinecap="round" opacity="0.28"/>
          <path d="M360 1824 Q375 1816 388 1828" stroke="#b0c8a8" strokeWidth="2.5" strokeLinecap="round" opacity="0.22"/>
          {/* Точки слева */}
          <circle cx="25" cy="1800" r="5" fill="#d8a8c8" opacity="0.2"/>
          <circle cx="40" cy="1815" r="3" fill="#d8a8c8" opacity="0.18"/>
          <circle cx="18" cy="1825" r="2.5" fill="#d8a8c8" opacity="0.15"/>

          {/* Зона ~2200 — большой завиток по центру */}
          <path d="M160 2180 Q220 2140 260 2185 Q300 2230 265 2265 Q230 2300 190 2270 Q155 2240 170 2210" stroke="#c4b0dc" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
          {/* Волна снизу слева */}
          <path d="M-10 2300 Q50 2275 100 2308 Q150 2340 200 2305" stroke="#e0b0be" strokeWidth="5" strokeLinecap="round" opacity="0.28"/>
          {/* Брызги правые */}
          <circle cx="390" cy="2220" r="4.5" fill="#c0a8d8" opacity="0.25"/>
          <circle cx="408" cy="2235" r="2.5" fill="#c0a8d8" opacity="0.2"/>
          <circle cx="382" cy="2248" r="3" fill="#c0a8d8" opacity="0.18"/>

          {/* Зона ~2700 — волна через всю ширину */}
          <path d="M-20 2720 Q90 2670 180 2730 Q270 2790 360 2720 Q420 2670 450 2700" stroke="#d0b8e4" strokeWidth="6" strokeLinecap="round" opacity="0.25"/>
          {/* Штрихи-трава слева */}
          <path d="M15 2800 Q20 2770 18 2750" stroke="#a8c8a0" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"/>
          <path d="M28 2805 Q35 2772 30 2748" stroke="#a8c8a0" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
          <path d="M40 2800 Q48 2775 44 2755" stroke="#a8c8a0" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
          {/* Завиток правый низ */}
          <path d="M390 2840 Q415 2820 425 2848 Q435 2876 412 2888 Q392 2898 382 2876 Q375 2858 392 2850" stroke="#e0b0c0" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>

          {/* Финальная зона ~3100 */}
          <path d="M0 3100 Q110 3055 220 3110 Q330 3165 440 3095" stroke="#d4a8d0" strokeWidth="5" strokeLinecap="round" opacity="0.28"/>
          <circle cx="200" cy="3160" r="4" fill="#e0b0c8" opacity="0.22"/>
          <circle cx="215" cy="3175" r="2.5" fill="#e0b0c8" opacity="0.18"/>
          <path d="M60 3140 Q80 3125 95 3145" stroke="#b0c8a8" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
        </svg>
      </div>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center pt-12 pb-0 px-5 overflow-hidden z-10" style={{ background: "transparent" }}>

        <Flower className="absolute top-4 left-4 text-[var(--pink-bright)]" size={30} />
        <Flower className="absolute top-6 right-6 text-[var(--green-leaf)]" size={22} />
        <Flower className="absolute top-24 right-3 text-[var(--pink-bright)]" size={16} />
        <Flower className="absolute top-36 left-2 text-[var(--green-leaf)]" size={14} />

        {/* Круглое фото */}
        <div className="relative mb-5" style={{ animation: "popIn 0.7s cubic-bezier(0.34,1.56,0.64,1) both" }}>
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={COUPLE_PHOTO} alt="Юля и Дима" className="w-full h-full object-cover object-top" />
          </div>
          <Flower className="absolute -bottom-2 -right-2 text-[var(--pink-bright)]" size={26} />
          <Flower className="absolute -top-1 -left-2 text-[var(--green-leaf)]" size={18} />
        </div>

        <h1 className="text-5xl text-[var(--pink-dark)] mb-1 text-center"
          style={{ fontFamily: "'Pacifico', cursive", animation: "fadeUp 0.6s ease 0.2s both" }}>
          Юля &amp; Дима
        </h1>
        <Squiggle className="w-36 text-[var(--pink-medium)] mb-3" />

        <div className="border-2 border-[var(--green-leaf)] rounded-full px-6 py-2 mb-5"
          style={{ animation: "fadeUp 0.6s ease 0.4s both" }}>
          <p className="font-bold text-[var(--green-leaf)] text-base">11–12 сентября 2026</p>
        </div>

        <p className="text-center text-[var(--pink-dark)] text-sm leading-relaxed max-w-xs mb-6"
          style={{ animation: "fadeUp 0.6s ease 0.5s both" }}>
          С радостью приглашаем вас<br />разделить с нами самые счастливые<br />моменты нашей жизни!
        </p>

        <div className="flex flex-col items-center gap-1 mb-8 text-[var(--pink-medium)]"
          style={{ animation: "bounce 2s 1s infinite" }}>
          <Heart className="w-5 h-5" />
          <Icon name="ChevronDown" size={18} className="text-[var(--pink-medium)]" />
        </div>
      </section>

      {/* ── КАЛЕНДАРЬ + ГАЛЕРЕЯ ── */}
      <section className="px-4 pt-2 pb-8 relative overflow-hidden z-10" style={{ background: "transparent" }}>
        <div className="max-w-md mx-auto flex flex-col gap-6 relative z-10">

          {/* Календарь */}
          <div className="bg-[var(--bg-cream)] rounded-3xl p-5 shadow-md relative">
            <Flower className="absolute top-3 right-3 text-[var(--pink-bright)]" size={20} />
            <div className="border-2 border-[var(--green-leaf)] rounded-full px-5 py-1.5 inline-block mb-3">
              <span className="text-[var(--green-leaf)] font-bold text-lg" style={{ fontFamily: "'Pacifico', cursive" }}>Календарь</span>
            </div>
            <p className="text-center font-bold text-[var(--pink-dark)] mb-3">Сентябрь 2026</p>
            <div className="grid grid-cols-7 text-center gap-y-2">
              {DAYS_HEADER.map(d => (
                <span key={d} className="text-xs font-bold text-[var(--pink-dark)] opacity-60">{d}</span>
              ))}
              {calendarCells.map((day, i) => (
                <span key={i} className={`text-sm w-8 h-8 flex items-center justify-center mx-auto rounded-full font-semibold
                  ${day === 11 || day === 12 ? "bg-[var(--pink-bright)] text-white ring-2 ring-[var(--pink-dark)]" : "text-[var(--pink-dark)]"}
                  ${!day ? "opacity-0 pointer-events-none" : ""}
                `}>{day}</span>
              ))}
            </div>
            <div className="mt-4 space-y-1.5">
              {[
                { day: "11 сентября", label: "регистрация брака" },
                { day: "12 сентября", label: "праздничный банкет" },
              ].map(item => (
                <div key={item.day} className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[var(--pink-bright)] flex-shrink-0" />
                  <span className="text-xs text-[var(--pink-dark)]">
                    <b>{item.day}</b> — {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Галерея — сетка без поляроида */}
          <div ref={galSection.ref} className="grid grid-cols-2 gap-3">
            {GALLERY.map((photo, i) => (
              <div key={i} className="overflow-hidden rounded-2xl shadow-lg"
                style={{
                  aspectRatio: "3/4",
                  opacity: galSection.visible ? 1 : 0,
                  transform: galSection.visible ? "translateY(0) scale(1)" : "translateY(1.5rem) scale(0.95)",
                  transition: `opacity 0.6s ease ${i * 180}ms, transform 0.6s ease ${i * 180}ms`,
                }}>
                <img src={photo.src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ТАЙМЕР ── */}
      <section ref={timerSection.ref} className="px-5 py-10 relative overflow-hidden z-10" style={{ background: "transparent" }}>
        <div className="max-w-md mx-auto rounded-3xl p-7 text-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            opacity: timerSection.visible ? 1 : 0,
            transform: timerSection.visible ? "translateY(0)" : "translateY(2rem)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          <p className="text-[var(--pink-dark)] font-semibold mb-5 text-sm tracking-wide">До регистрации брака осталось:</p>
          <div className="flex justify-center gap-3">
            {[
              { val: countdown.days, label: "дней" },
              { val: countdown.hours, label: "часов" },
              { val: countdown.minutes, label: "минуты" },
              { val: countdown.seconds, label: "секунд" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white rounded-2xl px-3 py-3 min-w-[58px] shadow-md text-center">
                <p className="text-3xl font-bold text-[var(--pink-dark)] leading-none"
                  style={{ fontFamily: "'Pacifico', cursive" }}>{pad(val)}</p>
                <p className="text-xs text-[var(--pink-dark)] opacity-60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЛОКАЦИИ ── */}
      <section ref={locSection.ref} className="px-4 pb-10 relative overflow-hidden z-10" style={{ background: "transparent" }}>
        <div className="max-w-md mx-auto space-y-6">
          {LOCATIONS.map((loc, i) => (
            <div key={i} className="bg-[var(--bg-cream)] rounded-3xl p-5 shadow-md relative overflow-hidden"
              style={{
                opacity: locSection.visible ? 1 : 0,
                transform: locSection.visible ? "translateY(0)" : "translateY(2rem)",
                transition: `opacity 0.7s ease ${i * 200}ms, transform 0.7s ease ${i * 200}ms`,
              }}>
              <Flower className="absolute top-3 right-3 text-[var(--pink-bright)] opacity-30" size={22} />
              <h3 className="font-bold text-[var(--pink-dark)] text-lg mb-3 flex items-center gap-2">
                <span>{loc.icon}</span> {loc.title}
              </h3>
              <div className="space-y-2">
                {[
                  { icon: "Calendar" as const, text: loc.date },
                  { icon: "Clock" as const, text: loc.time },
                  { icon: "MapPin" as const, text: loc.address },
                  { icon: "Shirt" as const, text: loc.dresscode },
                ].map(row => (
                  <div key={row.icon} className="flex items-start gap-2">
                    <Icon name={row.icon} size={14} className="text-[var(--green-leaf)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[var(--pink-dark)] leading-snug">{row.text}</span>
                  </div>
                ))}
                <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-white text-xs font-bold px-4 py-2 rounded-full shadow hover:opacity-90 transition-opacity"
                  style={{ background: "var(--green-leaf)" }}>
                  Открыть карту <Icon name="Navigation" size={12} />
                </a>
              </div>
              <Squiggle className="w-24 text-[var(--pink-medium)] opacity-30 mt-3" />
            </div>
          ))}
        </div>
      </section>

      {/* ── ПОЖЕЛАНИЯ ── */}
      <section ref={wishSection.ref} className="px-4 py-12 relative overflow-hidden z-10" style={{ background: "transparent" }}>
        <div className="max-w-md mx-auto text-center"
          style={{
            opacity: wishSection.visible ? 1 : 0,
            transform: wishSection.visible ? "translateY(0)" : "translateY(2rem)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          <Flower className="mx-auto text-[var(--pink-bright)] mb-4" size={28} />
          <div className="border-2 border-[var(--green-leaf)] rounded-full px-6 py-2 inline-block mb-4">
            <span className="text-[var(--green-leaf)] font-bold text-xl" style={{ fontFamily: "'Pacifico', cursive" }}>Пожелания</span>
          </div>
          <Squiggle className="w-32 mx-auto text-[var(--pink-medium)] mb-5" />
          <p className="text-[var(--pink-dark)] text-sm leading-relaxed">
            Для нас самое главное — ваше<br />присутствие и хорошее настроение.
          </p>
          <p className="text-[var(--pink-dark)] text-sm leading-relaxed mt-3">
            Если вы захотите поздравить нас подарком,<br />мы будем рады поддержке наших<br />будущих семейных планов и путешествий.
          </p>
          <div className="flex justify-center items-center gap-3 mt-5 text-[var(--pink-medium)]">
            <Squiggle className="w-16" />
            <Heart className="w-5 h-5" />
            <Squiggle className="w-16 scale-x-[-1]" />
          </div>
        </div>
      </section>

      {/* ── ФИНАЛ ── */}
      <section className="px-4 py-14 text-center relative overflow-hidden z-10" style={{ background: "transparent" }}>
        <Flower className="mx-auto text-[var(--pink-bright)] mb-3" size={24} />
        <h2 className="text-4xl text-[var(--pink-dark)] leading-snug mb-4"
          style={{ fontFamily: "'Pacifico', cursive" }}>
          С нетерпением<br />ждём встречи!
        </h2>
        <Squiggle className="w-28 mx-auto text-[var(--pink-medium)] mb-3" />
        <p className="text-2xl text-[var(--pink-dark)]" style={{ fontFamily: "'Pacifico', cursive" }}>Юля &amp; Дима</p>
        <Heart className="w-6 h-6 text-[var(--pink-bright)] mx-auto mt-2" />
        <p className="text-[var(--green-leaf)] font-bold mt-2 text-sm">11–12 сентября 2026</p>
        <div className="flex justify-center gap-3 mt-5">
          <Flower className="text-[var(--green-leaf)] opacity-50" size={18} />
          <Flower className="text-[var(--pink-bright)] opacity-70" size={24} />
          <Flower className="text-[var(--green-leaf)] opacity-50" size={18} />
        </div>
      </section>
    </div>
  );
}