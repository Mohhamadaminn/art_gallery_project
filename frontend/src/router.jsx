import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ArtistPage from "./pages/ArtistPage";
import WorksPage from "./pages/WorksPage";
import CoursesPage from "./pages/CoursesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ArtistPage /> },
      { path: "works", element: <WorksPage /> },
      { path: "courses", element: <CoursesPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}