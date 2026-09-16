import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import "./Login.css";


function Login() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [showPassword, setShowPassword] =
        useState(false);


    const [isLoading, setIsLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));


        setError("");
    };


    const handleSubmit = async (event) => {

        event.preventDefault();


        if (
            !formData.email.trim() ||
            !formData.password
        ) {
            setError(
                "Please enter email and password."
            );

            return;
        }


        try {

            setIsLoading(true);

            setError("");


            const response =
                await loginUser(
                    formData.email,
                    formData.password
                );


            localStorage.setItem(
                "accessToken",
                response.accessToken
            );


            localStorage.setItem(
                "user",
                JSON.stringify({
                    userId: response.userId,
                    name: response.name,
                    email: response.email,
                    role: response.role,
                })
            );


            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setIsLoading(false);
        }
    };


    return (
        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-brand-section">

                <div className="login-brand-content">

                    <div className="login-logo">
                        EMS
                    </div>


                    <h1>
                        Employee
                        <br />
                        Management System
                    </h1>


                    <p>
                        Manage your workforce,
                        employees and organization
                        from one powerful platform.
                    </p>


                    <div className="login-feature-list">

                        <div>
                            ✓ Employee Management
                        </div>

                        <div>
                            ✓ Attendance & Leave
                        </div>

                        <div>
                            ✓ Payroll Management
                        </div>

                        <div>
                            ✓ Performance Tracking
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="login-form-section">

                <div className="login-card">

                    <div className="login-header">

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Sign in to your EMS account
                        </p>

                    </div>


                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="login-form"
                    >

                        {/* EMAIL */}

                        <div className="login-field">

                            <label htmlFor="email">
                                Email Address
                            </label>


                            <div className="login-input-wrapper">

                                <Mail
                                    size={18}
                                    className="login-input-icon"
                                />


                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="login-field">

                            <label htmlFor="password">
                                Password
                            </label>


                            <div className="login-input-wrapper">

                                <LockKeyhole
                                    size={18}
                                    className="login-input-icon"
                                />


                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (value) =>
                                                !value
                                        )
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={18}
                                        />
                                    ) : (
                                        <Eye
                                            size={18}
                                        />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* REMEMBER / FORGOT */}

                        <div className="login-options">

                            <label className="remember-me">

                                <input
                                    type="checkbox"
                                />

                                <span>
                                    Remember me
                                </span>

                            </label>


                            <button
                                type="button"
                                className="forgot-password"
                            >
                                Forgot Password?
                            </button>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >

                            {isLoading
                                ? "Signing in..."
                                : "Sign In"
                            }

                        </button>

                    </form>


                    <div className="login-footer">

                        <span>
                            Employee Management
                            System
                        </span>

                        <span>
                            © 2026 EMS
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;