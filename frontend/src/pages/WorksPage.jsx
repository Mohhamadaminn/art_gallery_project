import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/client";

function WorksPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get("/artworks/")
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
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-[#EFEDE8] animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-sm tracking-wide text-[#B85C4A]">
        {error}
      </div>
    );
  }

  if (works.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-[#8C8C8C]">No works yet</p>
        <p className="text-sm text-[#B0AEA8] mt-2">
          Create some in your Django admin
        </p>
      </div>
    );
  }

  return (
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
  );
}

export default WorksPage;