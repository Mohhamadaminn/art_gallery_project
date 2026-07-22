import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import WorksPage from "./pages/WorksPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ArtistProfilePage from "./pages/ArtistProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <WorksPage /> },
      { path: "works/:id", element: <WorkDetailPage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "courses/:id", element: <CourseDetailPage /> },
      { path: "bio", element: <ArtistProfilePage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}