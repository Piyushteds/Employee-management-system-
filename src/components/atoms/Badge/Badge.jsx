import "./Badge.css";

function Badge({
    children,
    variant = "default",
    size = "medium",
}) {
    return (
        <span
            className={`badge badge-${variant} badge-${size}`}
        >
            <span className="badge-dot" />
            <span>{children}</span>
        </span>
    );
}

export default Badge;
