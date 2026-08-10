import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client";

export default function ArtworkGrid() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/artworks/")
      .then((res) => {
        let data = res.data;
        if (data.results) data = data.results;
        if (data.data) data = data.data;
        data = Array.isArray(data) ? data : [];
        setWorks(data.slice(0, 9));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mt-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#B85C4A] mb-3">
            Gallery
          </p>

          <h2
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Works
          </h2>
        </div>

        <Link
          to="/works"
          className="uppercase tracking-[0.18em] text-xs text-[#6B6B6B] hover:text-[#C97B63] transition-colors"
        >
          View All →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-[#EFEDE8] animate-pulse" />
          ))}
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-[#8C8C8C]">No works yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {works.map((work) => (
            <Link key={work.id} to={`/works/${work.id}`} className="group">
              <div className="aspect-[4/5] bg-[#EFEDE8] overflow-hidden">
                {work.image && (
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <p className="mt-4 text-center text-xs tracking-[0.1em] uppercase text-[#6B6B6B] group-hover:text-[#C97B63] transition-colors">
                {work.title}
                {work.year ? `, ${work.year}` : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}