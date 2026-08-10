import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";

import WorkDetailPage from "./pages/WorkDetailPage";

import EventsPage from "./pages/EventsPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import MeetingDetailPage from "./pages/MeetingDetailPage";

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
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "works/:id",
        element: <WorkDetailPage />,
      },

      {
        path: "events",
        element: <EventsPage />,
      },

      {
        path: "courses/:id",
        element: <CourseDetailPage />,
      },

      {
        path: "meetings/:id",
        element: <MeetingDetailPage />,
      },

      {
        path: "bio",
        element: <ArtistProfilePage />,
      },

      {
        path: "cart",
        element: <CartPage />,
      },

      {
        path: "checkout",
        element: <CheckoutPage />,
      },

      {
        path: "orders",
        element: <OrderHistoryPage />,
      },

      {
        path: "orders/:id",
        element: <OrderDetailPage />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}