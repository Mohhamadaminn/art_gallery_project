import HeroSection from "../components/home/HeroSection";
import LatestWorks from "../components/home/LatestWorks";
import EventsPreview from "../components/home/EventsPreview";
import AboutPreview from "../components/home/AboutPreview";
import Footer from "../components/home/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="my-28">
        <LatestWorks />
      </section>

      <section className="my-28">
        <EventsPreview />
      </section>

      <section className="my-28">
        <AboutPreview />
      </section>

      <Footer />
    </>
  );
}