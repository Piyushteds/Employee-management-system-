import "./StatCard.css";

function StatCard({
    title = "Statistic",
    value = "0",
    subtitle = "",
    icon,
    trend,
    trendType = "positive",
    onClick,
}) {

    const Component = onClick
        ? "button"
        : "div";


    return (
        <Component
            type={
                onClick
                    ? "button"
                    : undefined
            }
            className={
                onClick
                    ? "stat-card stat-card-clickable"
                    : "stat-card"
            }
            onClick={onClick}
        >

            <div className="stat-card-icon">
                {icon}
            </div>


            <div className="stat-card-content">

                <span className="stat-card-title">
                    {title}
                </span>


                <strong className="stat-card-value">
                    {value}
                </strong>


                {(subtitle || trend) && (

                    <div className="stat-card-footer">

                        {subtitle && (
                            <span className="stat-card-subtitle">
                                {subtitle}
                            </span>
                        )}


                        {trend && (
                            <span
                                className={`stat-card-trend stat-card-trend-${trendType}`}
                            >
                                {trend}
                            </span>
                        )}

                    </div>
                )}

            </div>

        </Component>
    );
}

export default StatCard;