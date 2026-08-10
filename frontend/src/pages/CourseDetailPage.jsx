import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/client";
import { cancelRegistration } from "../api/orders";
import AddToCartButton from "../components/AddToCartButton";
import Container from "../components/layout/Container";

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
    return (
      <Container>
        <div className="aspect-[4/5] max-w-md animate-pulse rounded-2xl bg-gallery-line/50" />
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container>
        <div className="py-20 text-center text-sm tracking-wide text-gallery-accentDark">
          {error || "Course not found"}
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
          {course.image ? (
            <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
          ) : null}
        </div>

        <div>
          <span className="mb-4 inline-block rounded-full border border-gallery-line bg-white px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gallery-inkSoft">
            Course
          </span>

          <h1 className="font-heading mb-2 text-3xl font-extrabold tracking-tight text-gallery-ink">
            {course.title}
          </h1>
          {course.price != null && (
            <p className="mb-1 text-xs uppercase tracking-[0.1em] text-gallery-inkSoft">
              ${course.price}
            </p>
          )}
          {course.seats_left != null && (
            <p className="mb-8 text-xs uppercase tracking-[0.1em] text-gallery-inkSoft">
              {course.seats_left} seats left
            </p>
          )}
          {course.description && (
            <p className="mb-8 leading-relaxed text-gallery-inkSoft">{course.description}</p>
          )}

          <AddToCartButton
            itemType="course"
            objectId={course.id}
            isRegistered={course.is_registered}
            onCancel={handleCancel}
            cancelling={cancelling}
          />
        </div>
      </div>
    </Container>
  );
}

export default CourseDetailPage;