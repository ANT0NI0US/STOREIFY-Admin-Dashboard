import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";
import Spinner from "@/ui/spinner/Spinner";
import AuthLayout from "@/layout/AuthLayout";
import AppLayout from "@/layout/AppLayout";

const Login = lazy(() => import("@/pages/Login"));
const ForgetPassword = lazy(() => import("@/pages/ForgetPassword"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Products = lazy(() => import("@/pages/Products"));
const Users = lazy(() => import("@/pages/Users"));
const Orders = lazy(() => import("@/pages/Orders"));
const Contact = lazy(() => import("@/pages/Contact"));

export default function Navigation() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}
