import { useEffect, useState } from "react";
import apiClient from "../api/client";

function ArtistProfilePage() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get("/artists/profile/")
      .then((res) => setArtist(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="aspect-[4/5] max-w-md bg-[#EFEDE8] animate-pulse" />;
  }

  if (error || !artist) {
    return (
      <div className="text-center py-20 text-sm tracking-wide text-[#B85C4A]">
        {error || "Profile not found"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
      <div className="aspect-[4/5] bg-[#EFEDE8] overflow-hidden">
        {artist.profile_picture ? (
          <img
            src={artist.profile_picture}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {artist.name}
        </h1>
        {artist.location && (
          <p className="text-xs tracking-[0.1em] uppercase text-[#8C8C8C] mb-8">
            {artist.location}
          </p>
        )}
        {artist.bio && (
          <p className="text-[#4A4A4A] leading-relaxed whitespace-pre-line">
            {artist.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default ArtistProfilePage;