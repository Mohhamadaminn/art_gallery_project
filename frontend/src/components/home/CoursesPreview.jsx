import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client";

export default function CoursesPreview() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/courses/")
      .then((res) => {
        let data = res.data;

        if (data.results) data = data.results;
        if (data.data) data = data.data;

        data = Array.isArray(data) ? data : [];

        setCourses(data.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#B85C4A] mb-3">
            Learn
          </p>

          <h2
            className="text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Upcoming Courses
          </h2>
        </div>

        <Link
          to="/courses"
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
              className="aspect-[4/5] bg-[#EFEDE8] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#EFEDE8]">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="mt-5 space-y-2">
                <h3 className="uppercase tracking-[0.08em] text-sm text-[#1A1A1A] group-hover:text-[#C97B63] transition-colors">
                  {course.title}
                </h3>

                {course.start_date && (
                  <p className="text-xs text-[#8C8C8C]">
                    {new Date(course.start_date).toLocaleDateString()}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                  <span>${course.price}</span>

                  {course.seats_left !== undefined && (
                    <span>{course.seats_left} seats left</span>
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