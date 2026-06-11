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
    mapUrl: "https://yandex.ru/maps/?text=Молодогвардейская+238+Самара",
    img: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/files/1441c6d7-e15a-4727-af30-3f88a0a75055.jpg",
  },
  {
    icon: "🥂",
    title: "Праздничный банкет",
    date: "12 сентября 2026",
    time: "15:00",
    address: "массив Орлов Овраг, Кленовая улица, 35, Самара",
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
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg-page)", fontFamily: "'Nunito', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center pt-12 pb-0 px-5 overflow-hidden" style={{ background: "var(--bg-hero)" }}>
        {/* Живой градиентный фон */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #f9c4df, transparent)", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-16 left-0 w-56 h-56 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #c8e6c9, transparent)", transform: "translate(-25%, 10%)" }} />
          <div className="absolute top-1/3 left-1/2 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #f8bbd0, transparent)", transform: "translate(-50%, -40%)" }} />
          {/* Пятнышки */}
          <div className="absolute top-8 left-1/3 w-20 h-20 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--pink-bright), transparent)" }} />
          <div className="absolute bottom-24 right-1/4 w-16 h-16 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, var(--green-leaf), transparent)" }} />
        </div>
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

        <div className="flex flex-col items-center gap-1 mb-4 text-[var(--pink-medium)]"
          style={{ animation: "bounce 2s 1s infinite" }}>
          <Heart className="w-5 h-5" />
          <Icon name="ChevronDown" size={18} className="text-[var(--pink-medium)]" />
        </div>

        <div className="w-full overflow-hidden leading-none mt-2">
          <svg viewBox="0 0 500 40" className="w-full" style={{ fill: "var(--bg-purple)" }}>
            <path d="M0 20 Q62.5 0 125 20 Q187.5 40 250 20 Q312.5 0 375 20 Q437.5 40 500 20 L500 40 L0 40 Z" />
          </svg>
        </div>
      </section>

      {/* ── КАЛЕНДАРЬ + ГАЛЕРЕЯ ── */}
      <section className="px-4 pt-2 pb-8 relative overflow-hidden" style={{ background: "var(--bg-purple)" }}>
        {/* Декоративный фон секции */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, var(--pink-bright), transparent)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, var(--pink-medium), transparent)", transform: "translate(30%, 30%)" }} />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, var(--green-leaf), transparent)", transform: "translate(-50%, -50%)" }} />
        </div>

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
      <section ref={timerSection.ref} className="px-5 py-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #e8d5f0 0%, #f5dde8 50%, #ddeae8 100%)" }}>
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
      <section ref={locSection.ref} className="px-4 pb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f0e4f5 0%, #ecdff0 60%, #e8f0e4 100%)" }}>
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
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  {[
                    { icon: "Calendar" as const, text: loc.date },
                    { icon: "Clock" as const, text: loc.time },
                    { icon: "MapPin" as const, text: loc.address },
                  ].map(row => (
                    <div key={row.icon} className="flex items-start gap-2">
                      <Icon name={row.icon} size={14} className="text-[var(--green-leaf)] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[var(--pink-dark)] leading-snug">{row.text}</span>
                    </div>
                  ))}
                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-white text-xs font-bold px-4 py-2 rounded-full shadow hover:opacity-90 transition-opacity"
                    style={{ background: "var(--green-leaf)" }}>
                    Открыть карту <Icon name="Navigation" size={12} />
                  </a>
                </div>
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow">
                  <img src={loc.img} alt={loc.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <Squiggle className="w-24 text-[var(--pink-medium)] opacity-30 mt-3" />
            </div>
          ))}
        </div>
      </section>

      {/* ── ПОЖЕЛАНИЯ ── */}
      <section ref={wishSection.ref} className="px-4 py-12 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #fdf8f0 0%, #fde8ef 100%)" }}>
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
      <section className="px-4 py-14 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f5dde8 0%, #e8d5f0 50%, #d5e8e0 100%)" }}>
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