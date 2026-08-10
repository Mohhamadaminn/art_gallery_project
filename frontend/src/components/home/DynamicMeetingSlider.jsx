import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client";

export default function DynamicMeetingSlider() {
  const [meeting, setMeeting] = useState(null);
  const [pastEvent, setPastEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiClient.get("/meetings/"), apiClient.get("/pastevents/")])
      .then(([meetingsRes, pastEventsRes]) => {
        let meetings = meetingsRes.data;
        let pastEvents = pastEventsRes.data;

        if (meetings.results) meetings = meetings.results;
        if (pastEvents.results) pastEvents = pastEvents.results;

        // Find nearest upcoming meeting
        const upcomingMeetings = meetings
          .filter((item) => new Date(item.date_time) > new Date())
          .sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

        const nextMeeting = upcomingMeetings[0];
        setMeeting(nextMeeting);

        // Find related past event — PastEvent has content_type + object_id,
        // match object_id with meeting id.
        if (nextMeeting) {
          const relatedPastEvent = pastEvents.find(
            (event) => event.object_id === nextMeeting.id
          );
          setPastEvent(relatedPastEvent || pastEvents[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!meeting) return null;

  return (
    <Link to={`/meetings/${meeting.id}`} className="group relative block h-[70vh] min-h-[460px] overflow-hidden">
      <img
        src={pastEvent?.image || meeting.image}
        alt={meeting.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center bg-gradient-to-t from-gallery-ink/70 via-gallery-ink/25 to-gallery-ink/10">
        <div className="max-w-xl px-10 text-white">
          <span className="mb-5 inline-block rounded-full bg-gallery-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gallery-ink">
            Registration Open
          </span>

          <h1 className="font-heading mb-6 text-[clamp(28px,4.5vw,52px)] font-extrabold leading-tight tracking-tight">
            {meeting.title}
          </h1>

          {meeting.date_time && (
            <p className="mb-2 text-sm text-white/85">
              {new Date(meeting.date_time).toLocaleDateString()}
            </p>
          )}

          {meeting.location && <p className="mb-8 text-sm text-white/85">{meeting.location}</p>}

          <span className="inline-flex items-center gap-2 rounded-2xl bg-gallery-accent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-gallery-ink transition-colors duration-250 group-hover:bg-white">
            Register Now
          </span>
        </div>
      </div>
    </Link>
  );
}