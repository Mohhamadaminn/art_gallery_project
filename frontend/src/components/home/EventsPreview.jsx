import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client";

export default function EventsPreview() {
  const [courses, setCourses] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get("/courses/"),
      apiClient.get("/meetings/"),
    ])
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
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const events = useMemo(() => {
    const merged = [
      ...courses.map((course) => ({
        ...course,
        type: "course",
        eventDate: course.start_date,
      })),
      ...meetings.map((meeting) => ({
        ...meeting,
        type: "meeting",
        eventDate: meeting.date_time,
      })),
    ];

    return merged
      .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
      .slice(0, 6);
  }, [courses, meetings]);

  return (
    <section>
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#B85C4A] mb-3">
            Events
          </p>

          <h2
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Upcoming Courses & Meetings
          </h2>
        </div>

        <Link
          to="/events"
          className="uppercase tracking-[0.18em] text-xs text-[#6B6B6B] hover:text-[#C97B63] transition-colors"
        >
          View All →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-[#EFEDE8] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {events.map((event) => (
            <Link
              key={`${event.type}-${event.id}`}
              to={
                event.type === "course"
                  ? `/courses/${event.id}`
                  : `/meetings/${event.id}`
              }
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#EFEDE8] relative">

                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.18em] uppercase border backdrop-blur-sm
                    ${
                      event.type === "course"
                        ? "bg-blue-50/90 border-blue-200 text-blue-700"
                        : "bg-amber-50/90 border-amber-200 text-amber-700"
                    }`}
                >
                  {event.type}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="uppercase tracking-[0.08em] text-sm text-[#1A1A1A] group-hover:text-[#C97B63] transition-colors">
                  {event.title}
                </h3>

                {event.eventDate && (
                  <p className="text-xs text-[#8C8C8C] mt-2">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                )}

                <div className="flex justify-between items-center mt-4 text-xs text-[#6B6B6B]">
                  <span>${event.price}</span>

                  {event.seats_left !== undefined && (
                    <span>{event.seats_left} seats left</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}