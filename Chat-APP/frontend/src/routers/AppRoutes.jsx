import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

export default function AppRoutes({ user }) {
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
