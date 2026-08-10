import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/client";
import Container from "../components/layout/Container";

function WorkDetailPage() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    apiClient
      .get(`/artworks/${id}/`)
      .then((res) => setWork(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load work");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="aspect-[4/5] max-w-md animate-pulse rounded-2xl bg-gallery-line/50" />
      </Container>
    );
  }

  if (error || !work) {
    return (
      <Container>
        <div className="py-20 text-center text-sm tracking-wide text-gallery-accentDark">
          {error || "Work not found"}
        </div>
      </Container>
    );
  }

  // Forward-compatible: uses work.images (an array of {id, image}) if the
  // API returns it; otherwise falls back to the single work.image field.
  const photos = work.images?.length ? work.images : [{ id: "main", image: work.image }].filter((p) => p.image);
  const activePhoto = photos[activeIndex] ?? photos[0];

  return (
    <Container>
      <Link
        to="/"
        className="text-xs uppercase tracking-[0.1em] text-gallery-inkSoft transition-colors duration-250 hover:text-gallery-ink"
      >
        ← Back to Work
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-14 md:grid-cols-2">
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gallery-line/40">
            {activePhoto?.image ? (
              <img
                src={activePhoto.image}
                alt={work.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          {photos.length > 1 && (
            <div className="mt-4 flex gap-3">
              {photos.map((p, i) => (
                <button
                  key={p.id ?? i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors duration-250 ${
                    i === activeIndex ? "border-gallery-accent" : "border-transparent"
                  }`}
                >
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-heading mb-2 text-3xl font-extrabold tracking-tight text-gallery-ink">
            {work.title}
          </h1>
          {work.year && (
            <p className="mb-8 text-xs uppercase tracking-[0.1em] text-gallery-inkSoft">
              {work.year}
            </p>
          )}
          {work.description && (
            <p className="leading-relaxed text-gallery-inkSoft">{work.description}</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default WorkDetailPage;