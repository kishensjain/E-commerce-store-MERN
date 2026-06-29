// createBrowserRouter() creates a router object that knows all the routes in your application.
import { createBrowserRouter } from "react-router";

import AdminLayout from "@/layouts/AdminLayout";
import MainLayout from "@/layouts/MainLayout";

import DashboardPage from "@/pages/admin/DashboardPage";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyOtpPage from "@/pages/auth/VerifyOtpPage";

import CartPage from "@/pages/cart/CartPage";

import OrdersPage from "@/pages/orders/OrdersPage";

import ProfilePage from "@/pages/profile/ProfilePage";

import HomePage from "@/pages/shop/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // this is the default route(path: "/")
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        path: "verify-otp",
        element: <VerifyOtpPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },

      {
        path: "orders",
        element: <OrdersPage />,
      },

      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);
