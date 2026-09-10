import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    onClick,
    disabled = false,
    icon,
}) {
    return (
        <button
            type={type}
            className={`button button-${variant} button-${size}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && (
                <span className="button-icon">
                    {icon}
                </span>
            )}

            <span>{children}</span>
        </button>
    );
}

export default Button;