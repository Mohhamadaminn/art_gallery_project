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
        console.log("🔍 Full API Response:", res.data);

        let data = res.data;
        if (data.results !== undefined) data = data.results;
        if (data.data !== undefined) data = data.data;

        setArtists(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading artists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 tracking-tight">
          Artists
        </h1>

        {artists.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No artists yet</p>
            <p className="text-gray-500 mt-3">Create some in your Django admin</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-2xl p-8 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-3xl font-semibold mb-4">{artist.name}</h3>

                {artist.bio && (
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {artist.bio}
                  </p>
                )}

                {artist.country && (
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    📍 <span>{artist.location}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistsPage;