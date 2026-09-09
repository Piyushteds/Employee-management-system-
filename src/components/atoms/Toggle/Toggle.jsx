import { useTheme } from "../../../hooks/useTheme";

import "./Toggle.css";


function Toggle() {

    const {
        theme,
        toggleTheme,
    } = useTheme();


    return (
        <button
            className={`theme-toggle ${theme === "dark" ? "dark" : ""
                }`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >

            <span className="toggle-track">

                <span className="toggle-icon">
                    {theme === "light" ? "☀️" : "🌙"}
                </span>

            </span>

        </button>
    );
}


export default Toggle;