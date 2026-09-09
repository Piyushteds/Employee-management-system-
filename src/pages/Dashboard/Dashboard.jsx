import {
    Users,
    UserCheck,
    Building2,
    UserX,
} from "lucide-react";

import "./Dashboard.css";


function Dashboard() {

    const stats = [
        {
            title: "Total Employees",
            value: "124",
            change: "+12%",
            icon: Users,
        },

        {
            title: "Active Employees",
            value: "118",
            change: "+8%",
            icon: UserCheck,
        },

        {
            title: "Departments",
            value: "08",
            change: "+2",
            icon: Building2,
        },

        {
            title: "On Leave",
            value: "06",
            change: "-3%",
            icon: UserX,
        },
    ];


    return (

        <div className="dashboard">

            <div className="page-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Welcome back! Here's what's
                        happening today.
                    </p>

                </div>

                <button className="add-button">
                    + Add Employee
                </button>

            </div>


            <div className="stats-grid">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (

                        <div
                            className="stat-card"
                            key={stat.title}
                        >

                            <div className="stat-content">

                                <p>
                                    {stat.title}
                                </p>

                                <h2>
                                    {stat.value}
                                </h2>

                                <span>
                                    {stat.change} from last month
                                </span>

                            </div>


                            <div className="stat-icon">

                                <Icon size={22} />

                            </div>

                        </div>

                    );

                })}

            </div>


            <div className="recent-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Recent Employees
                        </h2>

                        <p>
                            Recently added employees
                        </p>

                    </div>

                    <button>
                        View All
                    </button>

                </div>


                <div className="empty-table">

                    <Users size={35} />

                    <h3>
                        Employee records will appear here
                    </h3>

                    <p>
                        Connect your API to load employee data.
                    </p>

                </div>

            </div>

        </div>
    );
}


export default Dashboard;