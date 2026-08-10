import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import apiClient from "../api/client";
import { cancelMeetingRegistration } from "../api/orders";
import AddToCartButton from "../components/AddToCartButton";
import Container from "../components/layout/Container";

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
      setError(err.response?.data?.detail ?? "Failed to cancel your registration.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="aspect-[4/5] max-w-md animate-pulse rounded-2xl bg-gallery-line/50" />
      </Container>
    );
  }

  if (error || !meeting) {
    return (
      <Container>
        <div className="py-20 text-center text-sm tracking-wide text-gallery-accentDark">
          {error || "Meeting not found."}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Link
        to="/events"
        className="text-xs uppercase tracking-[0.1em] text-gallery-inkSoft transition-colors duration-250 hover:text-gallery-ink"
      >
        ← Back to Events
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-14 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gallery-line/40">
          {meeting.image && (
            <img src={meeting.image} alt={meeting.title} className="h-full w-full object-cover" />
          )}
        </div>

        <div>
          <span className="mb-4 inline-block rounded-full bg-gallery-accent px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gallery-ink">
            Meeting
          </span>

          <h1 className="font-heading mb-3 text-3xl font-extrabold tracking-tight text-gallery-ink">
            {meeting.title}
          </h1>

          <div className="mb-8 space-y-2 text-xs uppercase tracking-[0.12em] text-gallery-inkSoft">
            <p>${meeting.price}</p>
            <p>{meeting.seats_left} seats left</p>
            {meeting.date_time && <p>{new Date(meeting.date_time).toLocaleString()}</p>}
            {meeting.location && <p>{meeting.location}</p>}
          </div>

          {meeting.description && (
            <p className="mb-10 leading-relaxed text-gallery-inkSoft">{meeting.description}</p>
          )}

          <AddToCartButton
            itemType="meeting"
            objectId={meeting.id}
            isRegistered={meeting.is_registered}
            onCancel={handleCancelRegistration}
            cancelling={cancelling}
          />
        </div>
      </div>
    </Container>
  );
}