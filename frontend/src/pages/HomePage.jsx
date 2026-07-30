import { useEffect, useState } from "react";
import apiClient from "../api/client";

import HeroSection from "../components/home/HeroSection";
import LatestWorks from "../components/home/LatestWorks";
import CoursesPreview from "../components/home/CoursesPreview";
import MeetingsPreview from "../components/home/MeetingsPreview";
import AboutPreview from "../components/home/AboutPreview";
import Footer from "../components/home/Footer";

export default function HomePage() {
  const [artist, setArtist] = useState(null);
  const [loadingArtist, setLoadingArtist] = useState(true);

  useEffect(() => {
    apiClient
      .get("/artists/profile/")
      .then((res) => setArtist(res.data))
      .catch(console.error)
      .finally(() => setLoadingArtist(false));
  }, []);

  return (
    <div className="space-y-36">
      <HeroSection
        artist={artist}
        loading={loadingArtist}
      />

      <LatestWorks />

      <CoursesPreview />

      {/* <MeetingsPreview /> */}

      <AboutPreview
        artist={artist}
        loading={loadingArtist}
      />

      <Footer artist={artist} />
    </div>
  );
}