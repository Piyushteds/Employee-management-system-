
import { useState } from "react";

import {
    Search,
    Bell,
    ChevronDown,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Toggle from "../../atoms/Toggle/Toggle";

import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();

    const [showProfile, setShowProfile] =
        useState(false);


    const handleProfile = () => {

        navigate("/profile");

        setShowProfile(false);
    };


    const handleSettings = () => {

        navigate("/settings");

        setShowProfile(false);
    };


    const handleLogout = () => {

        // Future:
        // Clear token
        // Clear authentication
        // Clear user data

        navigate("/login");

        setShowProfile(false);
    };


    return (

        <header className="navbar">

            {/* =================================
                LOGO
            ================================== */}

            <div
                className="navbar-logo"
                onClick={() =>
                    navigate("/dashboard")
                }
            >

                <div className="logo-box">
                    E
                </div>


                <div className="logo-text">

                    <h2>
                        EMS
                    </h2>

                    <span>
                        Employee Management
                    </span>

                </div>

            </div>


            {/* =================================
                SEARCH
            ================================== */}

            <div className="navbar-search">

                <Search
                    size={18}
                    strokeWidth={2}
                />

                <input
                    type="text"
                    placeholder="Search employees..."
                />

                <span className="search-shortcut">
                    /
                </span>

            </div>


            {/* =================================
                RIGHT ACTIONS
            ================================== */}

            <div className="navbar-actions">


                {/* Theme */}

                <Toggle />


                {/* Notification */}

                <button
                    type="button"
                    className="notification-button"
                    onClick={() =>
                        navigate("/notifications")
                    }
                    aria-label="Notifications"
                >

                    <Bell
                        size={20}
                        strokeWidth={2}
                    />

                    <span className="notification-dot">
                    </span>

                </button>


                {/* =================================
                    PROFILE
                ================================== */}

                <div className="profile-container">


                    <button
                        type="button"
                        className="profile"
                        onClick={() =>
                            setShowProfile(
                                !showProfile
                            )
                        }
                    >

                        <div className="profile-avatar">
                            P
                        </div>


                        <div className="profile-details">

                            <strong>
                                Admin
                            </strong>

                            <span>
                                Administrator
                            </span>

                        </div>


                        <ChevronDown
                            size={16}
                            className={
                                showProfile
                                    ? "arrow-up"
                                    : ""
                            }
                        />

                    </button>


                    {/* =================================
                        PROFILE DROPDOWN
                    ================================== */}

                    {showProfile && (

                        <div className="profile-dropdown">


                            <div className="dropdown-header">

                                <div className="dropdown-avatar">
                                    P
                                </div>

                                <div>

                                    <strong>
                                        Admin
                                    </strong>

                                    <span>
                                        admin@ems.com
                                    </span>

                                </div>

                            </div>


                            <div className="dropdown-divider">
                            </div>


                            <button
                                type="button"
                                onClick={handleProfile}
                            >

                                <User size={17} />

                                <span>
                                    My Profile
                                </span>

                            </button>


                            <button
                                type="button"
                                onClick={handleSettings}
                            >

                                <Settings size={17} />

                                <span>
                                    Settings
                                </span>

                            </button>


                            <div className="dropdown-divider">
                            </div>


                            <button
                                type="button"
                                className="logout-item"
                                onClick={handleLogout}
                            >

                                <LogOut size={17} />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}


export default Navbar;

