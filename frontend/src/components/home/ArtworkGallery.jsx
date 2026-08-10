import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client";

export default function ArtworkGallery({ query = "" }) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    apiClient.get("/artworks/").then((res) => {
      let data = res.data;
      if (data.results) data = data.results;
      setWorks(data);
    });
  }, []);

  const filtered = useMemo(
    () => works.filter((w) => w.title.toLowerCase().includes(query.trim().toLowerCase())),
    [works, query]
  );

  if (query && filtered.length === 0) {
    return (
      <p className="py-16 text-center text-gallery-inkSoft">
        No artworks match &ldquo;{query}.&rdquo;
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((work) => (
        <Link
          key={work.id}
          to={`/works/${work.id}`}
          className="group block rounded-2xl bg-white p-2.5 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gallery-line/40">
            <img
              src={work.image}
              alt={work.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <p className="font-heading px-1 pb-1 pt-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-gallery-ink transition-colors duration-250 group-hover:text-gallery-accentDark">
            {work.title}
          </p>
        </Link>
      ))}
    </div>
  );
}