import { useEffect, useState } from "react";
import apiClient from "../api/client";

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get("/artists/")
      .then((res) => {
        let data = res.data;
        if (data.results) data = data.results;
        if (data.data) data = data.data;
        setArtists(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load artists");
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
        Artists
      </h1>

      {artists.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-zinc-400">No artists yet</p>
          <p className="text-zinc-500 mt-3">Create some in your Django admin</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-violet-500 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 group"
            >
              <h3 className="text-3xl font-semibold mb-4 group-hover:text-violet-400 transition-colors">
                {artist.name}
              </h3>

              {artist.bio && (
                <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                  {artist.bio}
                </p>
              )}

              {artist.country && (
                <p className="flex items-center gap-2 text-sm text-zinc-500">
                  📍 {artist.country}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ArtistsPage;