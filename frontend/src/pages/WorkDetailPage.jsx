import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/client";

function WorkDetailPage() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    return <div className="aspect-[4/5] max-w-md bg-[#EFEDE8] animate-pulse" />;
  }

  if (error || !work) {
    return (
      <div className="text-center py-20 text-sm tracking-wide text-[#B85C4A]">
        {error || "Work not found"}
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="text-xs tracking-[0.1em] uppercase text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
      >
        ← Back to Work
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-10">
        <div className="aspect-[4/5] bg-[#EFEDE8] overflow-hidden">
          {work.image ? (
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {work.title}
          </h1>
          {work.year && (
            <p className="text-xs tracking-[0.1em] uppercase text-[#8C8C8C] mb-8">
              {work.year}
            </p>
          )}
          {work.description && (
            <p className="text-[#4A4A4A] leading-relaxed">{work.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkDetailPage;