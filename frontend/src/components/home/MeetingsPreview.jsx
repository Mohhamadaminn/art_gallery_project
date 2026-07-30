import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client";

export default function MeetingsPreview() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/meetings/")
      .then((res) => {
        let data = res.data;

        if (data.results) data = data.results;
        if (data.data) data = data.data;

        data = Array.isArray(data) ? data : [];

        setMeetings(data.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
            Upcoming Meetings
          </h2>
        </div>

        <Link
          to="/meetings"
          className="uppercase tracking-[0.18em] text-xs text-[#6B6B6B] hover:text-[#C97B63] transition-colors"
        >
          View All →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-60 bg-[#EFEDE8] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {meetings.map((meeting) => (
            <Link
              key={meeting.id}
              to={`/meetings/${meeting.id}`}
              className="border border-[#EAE8E3] p-8 hover:border-[#C97B63] transition-colors group"
            >
              <h3
                className="text-xl mb-4 group-hover:text-[#C97B63]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {meeting.title}
              </h3>

              {meeting.date_time && (
                <p className="text-sm text-[#6B6B6B] mb-2">
                  {new Date(meeting.date_time).toLocaleDateString()}
                </p>
              )}

              {meeting.location && (
                <p className="text-sm text-[#8C8C8C] mb-6">
                  {meeting.location}
                </p>
              )}

              <div className="flex justify-between text-xs uppercase tracking-[0.1em] text-[#8C8C8C]">
                <span>${meeting.price}</span>

                {meeting.seats_left !== undefined && (
                  <span>{meeting.seats_left} left</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}