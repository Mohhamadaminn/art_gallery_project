import { useEffect, useState } from "react";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-zinc-900 rounded-3xl h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-20 text-xl">{error}</div>;
  }

  return (
    <>
      <h1 className="text-5xl font-bold tracking-tight mb-12 text-center">
        Works
      </h1>

      {works.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-zinc-400">No works yet</p>
          <p className="text-zinc-500 mt-3">Create some in your Django admin</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-violet-500 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 group"
            >

              {work.image && (
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
              )}

              <h3 className="text-3xl font-semibold mb-4 group-hover:text-violet-400 transition-colors">
                {work.title}
              </h3>

              {work.description && (
                <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                  {work.description}
                </p>
              )}

              {work.artist && (
                <p className="text-sm text-zinc-500">by {work.artist}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WorksPage;