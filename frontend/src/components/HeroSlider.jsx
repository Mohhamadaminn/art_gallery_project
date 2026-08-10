import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";


export default function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative h-[70vh] min-h-[460px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.title}
          className="absolute inset-0 flex items-end bg-cover bg-center transition-opacity duration-700"
          style={{
            opacity: i === index ? 1 : 0,
            backgroundImage: s.image ? `url(${s.image})` : undefined,
            backgroundColor: s.image ? undefined : "#3c4a3f",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 text-white">
            <span className="mb-4 inline-block rounded-full bg-gallery-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gallery-ink">
              {s.tag}
            </span>
            <h1 className="font-heading mb-3 max-w-xl text-[clamp(28px,4.5vw,52px)] font-extrabold leading-tight tracking-tight">
              {s.title}
            </h1>
            <p className="mb-6 max-w-md text-white/85">{s.copy}</p>
            <Link
              to={s.ctaLink || "/meetings"}
              className="inline-flex items-center gap-2 rounded-2xl bg-gallery-accent px-6 py-3.5 font-bold text-gallery-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gallery-ink hover:text-white"
            >
              {s.cta} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      ))}

      <button
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 transition-colors duration-250 hover:bg-gallery-accent"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => setIndex((index + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 transition-colors duration-250 hover:bg-gallery-accent"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-5 right-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-gallery-accent" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}