import Navbar from "../../organisms/Navbar/Navbar";
import Sidebar from "../../organisms/Sidebar/Sidebar";

import "./DashboardLayout.css";


function DashboardLayout({ children }) {

    return (

        <div className="dashboard-layout">

            <Navbar />

            <Sidebar />

            <main className="main-content">

                {children}

            </main>

        </div>

    );
}


export default DashboardLayout;