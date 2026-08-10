import { useState } from "react";
import DynamicMeetingSlider from "../components/home/DynamicMeetingSlider";
import ArtworkGallery from "../components/home/ArtworkGallery";
import Footer from "../components/home/Footer";
import Container from "../components/layout/Container";
import SearchBar from "../components/SearchBar";

// This is now the site's main page: the meeting slider up top, then the
// full works listing (with search) below — there's no separate /works page.
export default function HomePage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <DynamicMeetingSlider />

      <Container>
        <SearchBar value={query} onChange={setQuery} />
        <ArtworkGallery query={query} />
      </Container>

      <Footer />
    </>
  );
}