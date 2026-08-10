import { useEffect, useState } from "react";
import { getPastEvents } from "../api/gallery";

export default function PastEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getPastEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load past events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="py-10 text-center text-gallery-inkSoft">Loading events...</p>;
  }

  return (
    <section className="py-10">
      <h2 className="font-heading mb-8 text-2xl font-extrabold tracking-tight text-gallery-ink">
        Past Events
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={event.image}
              alt={event.caption}
              className="h-[250px] w-full object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gallery-inkSoft">{event.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}