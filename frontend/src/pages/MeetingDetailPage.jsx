import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import apiClient from "../api/client";
import { cancelMeetingRegistration } from "../api/orders";
import AddToCartButton from "../components/AddToCartButton";

export default function MeetingDetailPage() {
  const { id } = useParams();

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const fetchMeeting = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await apiClient.get(`/meetings/${id}/`);
      setMeeting(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load meeting.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMeeting();
  }, [fetchMeeting]);

  const handleCancelRegistration = async () => {
    if (!meeting) return;

    try {
      setCancelling(true);

      await cancelMeetingRegistration(meeting.id);

      await fetchMeeting();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ??
          "Failed to cancel your registration."
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="aspect-[4/5] max-w-md bg-[#EFEDE8] animate-pulse" />
    );
  }

  if (error || !meeting) {
    return (
      <div className="py-20 text-center text-sm tracking-wide text-[#B85C4A]">
        {error || "Meeting not found."}
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/events"
        className="text-xs uppercase tracking-[0.1em] text-[#8C8C8C] transition-colors hover:text-[#1A1A1A]"
      >
        ← Back to Events
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-14 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden bg-[#EFEDE8]">

          {meeting.image && (
            <img
              src={meeting.image}
              alt={meeting.title}
              className="h-full w-full object-cover"
            />
          )}

        </div>

        <div>

          <span className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-700">
            Meeting
          </span>

          <h1
            className="mb-3 text-3xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {meeting.title}
          </h1>

          <div className="mb-8 space-y-2 text-xs uppercase tracking-[0.12em] text-[#8C8C8C]">

            <p>${meeting.price}</p>

            <p>{meeting.seats_left} seats left</p>

            {meeting.date_time && (
              <p>
                {new Date(meeting.date_time).toLocaleString()}
              </p>
            )}

            {meeting.location && (
              <p>{meeting.location}</p>
            )}

          </div>

          {meeting.description && (
            <p className="mb-10 leading-relaxed text-[#4A4A4A]">
              {meeting.description}
            </p>
          )}

          {meeting.is_registered ? (
            <div>

              <p className="mb-3 text-xs uppercase tracking-[0.1em] text-[#4A9A6A]">
                You're registered for this meeting
              </p>

              <button
                onClick={handleCancelRegistration}
                disabled={cancelling}
                className="border border-[#B85C4A] px-6 py-3 text-xs uppercase tracking-[0.1em] text-[#B85C4A] transition-colors hover:bg-[#B85C4A] hover:text-white disabled:opacity-50"
              >
                {cancelling
                  ? "Cancelling..."
                  : "Cancel registration"}
              </button>

            </div>
          ) : (
            <AddToCartButton
              itemType="meeting"
              objectId={meeting.id}
            />
          )}

        </div>
      </div>
    </div>
  );
}