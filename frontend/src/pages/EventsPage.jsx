import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../api/client";
import Container from "../components/layout/Container";

export default function EventsPage() {
  const { t } = useTranslation();

  const [courses, setCourses] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([apiClient.get("/courses/"), apiClient.get("/meetings/")])
      .then(([coursesRes, meetingsRes]) => {
        let coursesData = coursesRes.data;
        let meetingsData = meetingsRes.data;

        if (coursesData.results) coursesData = coursesData.results;
        if (coursesData.data) coursesData = coursesData.data;
        if (meetingsData.results) meetingsData = meetingsData.results;
        if (meetingsData.data) meetingsData = meetingsData.data;

        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setMeetings(Array.isArray(meetingsData) ? meetingsData : []);
      })
      .catch((err) => {
        console.error(err);
        setError(t("events.loadError"));
      })
      .finally(() => setLoading(false));
  }, [t]);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();

    const meetingEvents = meetings.map((m) => ({
      ...m,
      type: "meeting",
      eventDate: m.date_time,
    }));

    const courseEvents = courses.map((c) => ({
      ...c,
      type: "course",
      eventDate: c.start_date,
    }));

    const upcomingMeetings = meetingEvents
      .filter((e) => e.eventDate && new Date(e.eventDate) >= now)
      .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

    const upcomingCourses = courseEvents
      .filter((e) => e.eventDate && new Date(e.eventDate) >= now)
      .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

    // Meetings always appear before courses
    const upcoming = [...upcomingMeetings, ...upcomingCourses];

    const past = [...meetingEvents, ...courseEvents]
      .filter((e) => e.eventDate && new Date(e.eventDate) < now)
      .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

    return { upcoming, past };
  }, [courses, meetings]);

  return (
    <Container>
      <div className="mb-16">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gallery-accentDark">
          {t("events.label")}
        </p>

        <h1 className="font-heading mb-5 text-4xl font-extrabold tracking-tight text-gallery-ink md:text-5xl">
          {t("events.title")}
        </h1>

        <p className="max-w-2xl leading-8 text-gallery-inkSoft">
          {t("events.description")}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse rounded-2xl bg-gallery-line/50"
            />
          ))}
        </div>
      ) : error ? (
        <div className="py-20 text-center text-gallery-accentDark">
          {error}
        </div>
      ) : (
        <>
          <section>
            <h2 className="mb-8 text-xs uppercase tracking-[0.2em] text-gallery-inkSoft">
              {t("events.upcoming")}
            </h2>

            {upcoming.length === 0 ? (
              <p className="pb-20 text-gallery-inkSoft">
                {t("events.noUpcoming")}
              </p>
            ) : (
              <div className="mb-28 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((event) => (
                  <Link
                    key={`${event.type}-${event.id}`}
                    to={
                      event.type === "course"
                        ? `/courses/${event.id}`
                        : `/meetings/${event.id}`
                    }
                    className="group block rounded-2xl bg-white p-2.5 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gallery-line/40">
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}

                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] backdrop-blur-sm ${
                          event.type === "meeting"
                            ? "bg-gallery-accent text-gallery-ink"
                            : "border border-gallery-line bg-white/90 text-gallery-inkSoft"
                        }`}
                      >
                        {t(`events.types.${event.type}`)}
                      </span>
                    </div>

                    <div className="px-1 pt-4">
                      <h3 className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-gallery-ink transition-colors duration-250 group-hover:text-gallery-accentDark">
                        {event.title}
                      </h3>

                      <p className="mt-2 text-xs text-gallery-inkSoft">
                        {new Date(event.eventDate).toLocaleDateString()}
                      </p>

                      {event.location && (
                        <p className="mt-1 text-sm text-gallery-inkSoft">
                          {event.location}
                        </p>
                      )}

                      {event.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gallery-inkSoft">
                          {event.description}
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between text-xs text-gallery-inkSoft">
                        <span>${event.price}</span>
                        <span>
                          {event.seats_left} {t("events.seatsLeft")}
                        </span>
                      </div>

                      <span className="mt-5 inline-block rounded-2xl bg-gallery-accent px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gallery-ink transition-colors duration-250 group-hover:bg-gallery-ink group-hover:text-white">
                        {t("events.register")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {past.length > 0 && (
            <section>
              <h2 className="mb-8 text-xs uppercase tracking-[0.2em] text-gallery-inkSoft">
                {t("events.past")}
              </h2>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {past.map((event) => (
                  <div
                    key={`${event.type}-${event.id}-past`}
                    className="group opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  >
                    <div className="aspect-square overflow-hidden rounded-xl bg-gallery-line/40">
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>

                    <p className="mt-3 text-center text-xs text-gallery-inkSoft">
                      {event.title}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Container>
  );
}