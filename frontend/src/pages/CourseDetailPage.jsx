import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/client";

function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get(`/courses/${id}/`)
      .then((res) => setCourse(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load course");
      })
      .finally(() => setLoading(false));
  }, [id]);

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
        to="/courses"
        className="text-xs tracking-[0.1em] uppercase text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
      >
        ← Back to Courses
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
            <p className="text-[#4A4A4A] leading-relaxed">{course.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;