
import {
    LayoutDashboard,
    Users,
    Building2,
    CalendarCheck,
    CalendarDays,
    Wallet,
    Star,
    BarChart3,
    Bell,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import "./Sidebar.css";


function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();


    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },

        {
            label: "Employees",
            path: "/employees",
            icon: Users,
        },

        {
            label: "Departments",
            path: "/departments",
            icon: Building2,
        },

        {
            label: "Attendance",
            path: "/attendance",
            icon: CalendarCheck,
        },

        {
            label: "Leave",
            path: "/leave",
            icon: CalendarDays,
        },

        {
            label: "Payroll",
            path: "/payroll",
            icon: Wallet,
        },

        {
            label: "Performance",
            path: "/performance",
            icon: Star,
        },

        {
            label: "Reports",
            path: "/reports",
            icon: BarChart3,
        },

        {
            label: "Notifications",
            path: "/notifications",
            icon: Bell,
        },
    ];


    const handleNavigation = (path) => {
        navigate(path);
    };


    const handleLogout = () => {

        // Future:
        // Clear authentication token
        // Clear user session
        // Redirect to login

        navigate("/login");
    };


    return (

        <aside className="sidebar">

            {/* =========================
                MAIN MENU
            ========================== */}

            <nav className="sidebar-menu">

                <p className="menu-title">
                    MAIN MENU
                </p>


                {menuItems.map((item) => {

                    const Icon = item.icon;


                    const isActive =
                        location.pathname === item.path;


                    return (

                        <button
                            key={item.path}
                            type="button"
                            className={`sidebar-item ${isActive
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() =>
                                handleNavigation(item.path)
                            }
                        >

                            <Icon
                                size={19}
                                strokeWidth={2}
                            />

                            <span>
                                {item.label}
                            </span>

                        </button>

                    );

                })}


                {/* =========================
                    ACCOUNT
                ========================== */}

                <p className="menu-title bottom-title">
                    ACCOUNT
                </p>


                <button
                    type="button"
                    className={`sidebar-item ${location.pathname === "/profile"
                            ? "active"
                            : ""
                        }`}
                    onClick={() =>
                        handleNavigation("/profile")
                    }
                >

                    <User
                        size={19}
                        strokeWidth={2}
                    />

                    <span>
                        Profile
                    </span>

                </button>


                <button
                    type="button"
                    className={`sidebar-item ${location.pathname === "/settings"
                            ? "active"
                            : ""
                        }`}
                    onClick={() =>
                        handleNavigation("/settings")
                    }
                >

                    <Settings
                        size={19}
                        strokeWidth={2}
                    />

                    <span>
                        Settings
                    </span>

                </button>

            </nav>


            {/* =========================
                LOGOUT
            ========================== */}

            <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
            >

                <LogOut
                    size={19}
                    strokeWidth={2}
                />

                <span>
                    Logout
                </span>

            </button>

        </aside>

    );
}


export default Sidebar;

