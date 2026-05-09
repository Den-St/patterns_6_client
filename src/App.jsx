import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import SuperAdminPage from "./pages/SuperAdminPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import UserPage from "./pages/UserPage.jsx";

export default function App() {
  return (
    <div className="container">
      <h1>User Management</h1>

      <nav className="main-nav">
        <NavLink to="/super-admin" className="nav-link">Super Admin</NavLink>
        <NavLink to="/admin" className="nav-link">Admin</NavLink>
        <NavLink to="/user" className="nav-link">User</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/super-admin" replace />} />
        <Route path="/super-admin" element={<SuperAdminPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>
  );
}
