import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/client";

export default function EventsPage() {
  const [courses, setCourses] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      .catch((err) => {
        console.error(err);
        setError("Failed to load events");
      })
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

    return merged.sort(
      (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
    );
  }, [courses, meetings]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] bg-[#EFEDE8] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-[#B85C4A]">
        {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-[#8C8C8C]">
          No upcoming events
        </p>

        <p className="text-sm text-[#B0AEA8] mt-2">
          Create some courses or meetings in Django Admin.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-16">

        <p className="uppercase tracking-[0.25em] text-xs text-[#B85C4A] mb-3">
          Events
        </p>

        <h1
          className="text-5xl mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Courses & Meetings
        </h1>

        <p className="text-[#6B6B6B] max-w-2xl leading-8">
          Discover upcoming courses and artist meetings.
          Register to improve your artistic skills, participate in
          discussions, and connect with the community.
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">

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
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.15em]
                ${
                  event.type === "course"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {event.type}
              </span>

            </div>

            <div className="mt-5">

              <h2 className="text-sm uppercase tracking-[0.08em] text-[#1A1A1A] group-hover:text-[#C97B63] transition-colors">

                {event.title}

              </h2>

              <p className="mt-2 text-xs text-[#8C8C8C]">

                {new Date(event.eventDate).toLocaleDateString()}

              </p>

              {event.location && (

                <p className="mt-2 text-sm text-[#6B6B6B]">

                  {event.location}

                </p>

              )}

              <div className="mt-5 flex items-center justify-between text-xs text-[#6B6B6B]">

                <span>${event.price}</span>

                <span>

                  {event.seats_left} seats left

                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>
    </>
  );
}