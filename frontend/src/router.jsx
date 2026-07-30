import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import WorksPage from "./pages/WorksPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "works", element: <WorksPage /> },

      { path: "works/:id", element: <WorkDetailPage /> },

      { path: "courses", element: <CoursesPage /> },

      { path: "courses/:id", element: <CourseDetailPage /> },

      { path: "bio", element: <ArtistProfilePage /> },

      { path: "signup", element: <Signup /> },

      { path: "login", element: <Login /> },

      { path: "cart", element: <CartPage /> },

      { path: "checkout", element: <CheckoutPage /> },

      { path: "orders", element: <OrderHistoryPage /> },

      { path: "orders/:id", element: <OrderDetailPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}