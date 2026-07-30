import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/client";
import { cancelRegistration } from "../api/orders";
import AddToCartButton from "../components/AddToCartButton";

function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchCourse = () => {
    setLoading(true);
    apiClient
      .get(`/courses/${id}/`)
      .then((res) => setCourse(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load course");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await cancelRegistration(course.id);
      fetchCourse(); // refetch so seats_left and is_registered update immediately
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to cancel registration");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <div className="aspect-[4/5] max-w-md bg-[#EFEDE8] animate-pulse" />;
  }

  if (error || !course) {
    return (
      <div className="text-center py-20 text-sm tracking-wide text-[#B85C4A]">
        {error || "Course not found"}
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/events"
        className="text-xs tracking-[0.1em] uppercase text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
      >
        ← Back to Events
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-10">
        <div className="aspect-[4/5] bg-[#EFEDE8] overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {course.title}
          </h1>
          {course.price != null && (
            <p className="text-xs tracking-[0.1em] uppercase text-[#8C8C8C] mb-1">
              ${course.price}
            </p>
          )}
          {course.seats_left != null && (
            <p className="text-xs tracking-[0.1em] uppercase text-[#8C8C8C] mb-8">
              {course.seats_left} seats left
            </p>
          )}
          {course.description && (
            <p className="text-[#4A4A4A] leading-relaxed mb-8">
              {course.description}
            </p>
          )}

          {course.is_registered ? (
            <div>
              <p className="text-xs tracking-[0.1em] uppercase text-[#4A9A6A] mb-3">
                You're registered for this course
              </p>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="text-xs tracking-[0.1em] uppercase border border-[#B85C4A] text-[#B85C4A] px-6 py-3 hover:bg-[#B85C4A] hover:text-white transition-colors disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Cancel registration"}
              </button>
            </div>
          ) : (
            <AddToCartButton itemType="course" objectId={course.id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;