import "./Avatar.css";

function Avatar({
    name = "",
    src = "",
    size = "medium",
}) {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();

    return (
        <div className={`avatar avatar-${size}`}>
            {src ? (
                <img
                    src={src}
                    alt={name || "Avatar"}
                />
            ) : (
                initials || "?"
            )}
        </div>
    );
}

export default Avatar;
