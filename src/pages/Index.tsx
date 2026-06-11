import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const GALLERY_PHOTOS = [
  {
    src: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/files/e8fb7657-dc9d-4a92-abe2-6dbee4ba0c33.jpg",
    caption: "Наша история начинается",
  },
  {
    src: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/files/62262add-77eb-4477-aec7-f01affc0cc72.jpg",
    caption: "Детали нашего дня",
  },
  {
    src: "https://cdn.poehali.dev/projects/9ba9d2d6-628e-48a6-ae4a-468969368bae/files/d3776673-a0a0-4e8d-bfb3-0544dae3257f.jpg",
    caption: "Путь к счастью",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FloralDecor({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 30 Q80 10 60 25 Q40 40 20 20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M100 30 Q120 10 140 25 Q160 40 180 20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="100" cy="30" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="60" cy="25" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="140" cy="25" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M55 20 Q60 15 65 22" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M135 20 Q140 15 145 22" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M95 25 Q100 18 105 25" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.7" />
    </svg>
  );
}

function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 110 Q40 70 40 30" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M40 80 Q20 65 15 45 Q25 55 40 65" stroke="currentColor" strokeWidth="0.7" fill="currentColor" fillOpacity="0.15" />
      <path d="M40 60 Q60 45 65 25 Q55 35 40 45" stroke="currentColor" strokeWidth="0.7" fill="currentColor" fillOpacity="0.15" />
      <path d="M40 95 Q22 82 18 65" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.6" />
    </svg>
  );
}

export default function Index() {
  const dateSection = useInView();
  const gallerySection = useInView();
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--cream)] font-golos overflow-x-hidden">

      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(180,160,130,0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(140,120,100,0.07) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(200,180,150,0.05) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10">
        <LeafSprig className="absolute top-8 left-6 w-12 h-20 text-[var(--sage)] opacity-40 rotate-[-20deg]" />
        <LeafSprig className="absolute top-8 right-6 w-12 h-20 text-[var(--sage)] opacity-40 rotate-[20deg] scale-x-[-1]" />
        <LeafSprig className="absolute bottom-16 left-10 w-10 h-16 text-[var(--terracotta)] opacity-25 rotate-[30deg]" />
        <LeafSprig className="absolute bottom-16 right-10 w-10 h-16 text-[var(--terracotta)] opacity-25 rotate-[-30deg] scale-x-[-1]" />

        <div className="space-y-6 max-w-2xl mx-auto">
          <p
            className="font-caveat text-[var(--terracotta)] text-xl tracking-widest uppercase opacity-0"
            style={{ animation: "fadeInUp 0.8s ease forwards 0.2s" }}
          >
            вы приглашены
          </p>

          <div className="opacity-0" style={{ animation: "fadeInUp 0.8s ease forwards 0.5s" }}>
            <h1 className="font-cormorant text-[clamp(3.5rem,12vw,7rem)] leading-none font-light text-[var(--bark)] tracking-tight">
              Анна
            </h1>
            <div className="flex items-center justify-center gap-4 my-1">
              <FloralDecor className="w-32 text-[var(--sage)] h-8" />
              <span className="font-cormorant text-3xl text-[var(--terracotta)] font-light italic">&amp;</span>
              <FloralDecor className="w-32 text-[var(--sage)] h-8 scale-x-[-1]" />
            </div>
            <h1 className="font-cormorant text-[clamp(3.5rem,12vw,7rem)] leading-none font-light text-[var(--bark)] tracking-tight">
              Михаил
            </h1>
          </div>

          <div className="opacity-0" style={{ animation: "fadeInUp 0.8s ease forwards 0.9s" }}>
            <FloralDecor className="w-48 text-[var(--terracotta)] h-10 mx-auto opacity-60" />
            <p className="font-cormorant italic text-[var(--bark-light)] text-xl mt-4 font-light leading-relaxed">
              Два сердца, одна дорога —{" "}
              <span className="text-[var(--terracotta)]">навстречу общей судьбе</span>
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
          style={{ animation: "fadeInUp 0.8s ease forwards 1.5s" }}
        >
          <p className="font-golos text-[var(--bark-light)] text-xs tracking-[0.2em] uppercase">листайте</p>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--terracotta)] to-transparent" />
        </div>
      </section>

      {/* ===== DATE / TIME / PLACE ===== */}
      <section ref={dateSection.ref} className="relative py-28 px-6 z-10">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-center mb-16 transition-all duration-1000"
            style={{
              opacity: dateSection.inView ? 1 : 0,
              transform: dateSection.inView ? "translateY(0)" : "translateY(2.5rem)",
            }}
          >
            <p className="font-caveat text-[var(--terracotta)] text-lg tracking-widest mb-3">наш особенный день</p>
            <h2 className="font-cormorant text-5xl md:text-6xl text-[var(--bark)] font-light">Детали торжества</h2>
            <FloralDecor className="w-44 text-[var(--sage)] h-10 mx-auto mt-4 opacity-70" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Calendar", label: "Дата", main: "14 сентября", sub: "2025 года", delay: 0 },
              { icon: "Clock", label: "Время", main: "16:00", sub: "сбор гостей с 15:30", delay: 150 },
              {
                icon: "MapPin",
                label: "Место",
                main: "Усадьба «Берёзовая роща»",
                sub: "Московская область, Дмитровское ш., 42",
                delay: 300,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group relative bg-[var(--parchment)] rounded-2xl p-8 text-center border border-[var(--sage-light)] hover:border-[var(--terracotta)] transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                style={{
                  opacity: dateSection.inView ? 1 : 0,
                  transform: dateSection.inView ? "translateY(0)" : "translateY(2rem)",
                  transition: `opacity 0.8s ease ${item.delay}ms, transform 0.8s ease ${item.delay}ms, box-shadow 0.3s, border-color 0.3s`,
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--sage-light)] flex items-center justify-center mx-auto mb-5 group-hover:bg-[var(--terracotta-light)] transition-colors duration-300">
                  <Icon name={item.icon as "Calendar"} size={20} className="text-[var(--bark)]" />
                </div>
                <p className="font-caveat text-[var(--terracotta)] text-sm tracking-widest uppercase mb-2">{item.label}</p>
                <p className="font-cormorant text-2xl text-[var(--bark)] font-medium mb-1">{item.main}</p>
                <p className="font-golos text-[var(--bark-light)] text-sm">{item.sub}</p>
                <LeafSprig className="absolute top-3 right-3 w-6 h-9 text-[var(--sage)] opacity-20 rotate-[15deg]" />
              </div>
            ))}
          </div>

          <div
            className="mt-12 text-center"
            style={{
              opacity: dateSection.inView ? 1 : 0,
              transform: dateSection.inView ? "translateY(0)" : "translateY(2rem)",
              transition: "opacity 0.8s ease 500ms, transform 0.8s ease 500ms",
            }}
          >
            <div className="inline-block border border-dashed border-[var(--terracotta)] rounded-2xl px-8 py-5">
              <p className="font-caveat text-[var(--terracotta)] text-base mb-1">дресс-код</p>
              <p className="font-cormorant text-xl text-[var(--bark)] font-light italic">
                Натуральные тона — беж, терракота, оливка
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section ref={gallerySection.ref} className="relative py-28 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-16 transition-all duration-1000"
            style={{
              opacity: gallerySection.inView ? 1 : 0,
              transform: gallerySection.inView ? "translateY(0)" : "translateY(2.5rem)",
            }}
          >
            <p className="font-caveat text-[var(--terracotta)] text-lg tracking-widest mb-3">наша история</p>
            <h2 className="font-cormorant text-5xl md:text-6xl text-[var(--bark)] font-light">Моменты вместе</h2>
            <FloralDecor className="w-44 text-[var(--sage)] h-10 mx-auto mt-4 opacity-70" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  aspectRatio: i === 1 ? "3/4" : "4/5",
                  opacity: gallerySection.inView ? 1 : 0,
                  transform: gallerySection.inView ? "translateY(0)" : "translateY(3rem)",
                  transition: `opacity 0.8s ease ${i * 180}ms, transform 0.8s ease ${i * 180}ms`,
                }}
                onClick={() => setActivePhoto(i)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                  <p className="font-caveat text-white text-lg">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-16 text-center z-10">
        <FloralDecor className="w-48 text-[var(--terracotta)] h-10 mx-auto mb-6 opacity-50" />
        <p className="font-cormorant text-3xl text-[var(--bark)] font-light italic mb-2">Ждём вас с нетерпением</p>
        <p className="font-golos text-[var(--bark-light)] text-sm tracking-widest">Анна &amp; Михаил · 14.09.2025</p>
        <LeafSprig className="w-8 h-12 text-[var(--sage)] opacity-30 mx-auto mt-6" />
      </footer>

      {/* Lightbox */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_PHOTOS[activePhoto].src}
              alt={GALLERY_PHOTOS[activePhoto].caption}
              className="w-full rounded-2xl shadow-2xl"
            />
            <p className="font-caveat text-white text-xl text-center mt-4">{GALLERY_PHOTOS[activePhoto].caption}</p>
            <button
              className="absolute -top-4 -right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--terracotta)] hover:text-white transition-colors"
              onClick={() => setActivePhoto(null)}
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
