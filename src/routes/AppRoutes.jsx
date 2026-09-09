import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/Employees/Employees";
import Departments from "../pages/Departments/Departments";
import Attendance from "../pages/Attendance/Attendance";
import Leave from "../pages/Leave/Leave";
import Payroll from "../pages/Payroll/Payroll";
import Performance from "../pages/Performance/Performance";
import Reports from "../pages/Reports/Reports";
import Notifications from "../pages/Notifications/Notifications";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/employees"
                element={<Employees />}
            />

            <Route
                path="/departments"
                element={<Departments />}
            />

            <Route
                path="/attendance"
                element={<Attendance />}
            />

            <Route
                path="/leave"
                element={<Leave />}
            />

            <Route
                path="/payroll"
                element={<Payroll />}
            />

            <Route
                path="/performance"
                element={<Performance />}
            />

            <Route
                path="/reports"
                element={<Reports />}
            />

            <Route
                path="/notifications"
                element={<Notifications />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

            <Route
                path="/settings"
                element={<Settings />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

        </Routes>
    );
}

export default AppRoutes;