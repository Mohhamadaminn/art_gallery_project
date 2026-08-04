import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/client";

function WorksPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      apiClient
        .get("/artworks/", { params: search ? { search } : {} })
        .then((res) => {
          let data = res.data;
          if (data.results) data = data.results;
          if (data.data) data = data.data;
          setWorks(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load works");
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      <div className="mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search works..."
          className="w-full max-w-sm border border-[#E0DED8] px-4 py-2 text-sm focus:outline-none focus:border-[#C97B63]"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-[#EFEDE8] animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-sm tracking-wide text-[#B85C4A]">
          {error}
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-[#8C8C8C]">No works found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {works.map((work) => (
            <Link key={work.id} to={`/works/${work.id}`} className="group">
              <div className="aspect-[4/5] bg-[#EFEDE8] overflow-hidden">
                {work.image ? (
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <p className="mt-4 text-center text-xs tracking-[0.1em] uppercase text-[#6B6B6B] group-hover:text-[#C97B63] transition-colors">
                {work.title}
                {work.year ? `, ${work.year}` : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorksPage;