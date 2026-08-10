import { Link } from "react-router-dom";

export default function CTABanner({
  message = "Meet inspiring artists in our upcoming gathering.",
  ctaText = "Reserve Your Seat",
  ctaLink = "/meetings",
}) {
  return (
    <section className="mx-auto my-14 max-w-6xl px-6">
      <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] bg-gallery-ink px-10 py-12 text-white">
        <h3 className="font-heading max-w-md text-2xl font-bold leading-snug">{message}</h3>
        <Link
          to={ctaLink}
          className="rounded-2xl bg-gallery-accent px-6 py-3.5 font-bold text-gallery-ink transition-transform duration-200 hover:-translate-y-0.5"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}