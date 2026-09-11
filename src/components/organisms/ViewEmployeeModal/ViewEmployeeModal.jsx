import { useEffect } from "react";
import {
    X,
    User,
    Mail,
    Phone,
    Building2,
    Briefcase,
    CalendarDays,
    MapPin,
    DollarSign,
} from "lucide-react";

import "./ViewEmployeeModal.css";

function ViewEmployeeModal({ isOpen, onClose, employee }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !employee) return null;

    const formatDate = (date) => {
        if (!date) return "Not provided";
        const value = String(date).split("T")[0];
        const parts = value.split("-");
        return parts.length === 3
            ? `${parts[2]}/${parts[1]}/${parts[0]}`
            : date;
    };

    const formatSalary = (salary) => {
        if (salary === null || salary === undefined || salary === "") {
            return "Not provided";
        }

        return Number(salary).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const statusClass = employee.status
        ? employee.status.toLowerCase().replace(/\s+/g, "-")
        : "unknown";

    return (
        <div className="view-modal-overlay" onMouseDown={onClose}>
            <div
                className="view-employee-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="employee-details-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="view-modal-header">
                    <div className="view-modal-title">
                        <div className="view-employee-avatar" aria-hidden="true">
                            {(employee.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 id="employee-details-title">Employee Details</h2>
                            <p>View employee information</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="view-close-button"
                        onClick={onClose}
                        aria-label="Close employee details"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="view-employee-profile">
                    <div>
                        <h3>{employee.name || "Unnamed Employee"}</h3>
                        <p>{employee.position || "Position not provided"}</p>
                    </div>

                    <span className={`status-badge ${statusClass}`}>
                        <span className="status-dot" />
                        {employee.status || "Unknown"}
                    </span>
                </div>

                <div className="employee-details-grid">
                    <div className="employee-detail-item">
                        <div className="detail-icon"><User size={18} /></div>
                        <div><span>Employee ID</span><strong>{employee.id}</strong></div>
                    </div>

                    <div className="employee-detail-item">
                        <div className="detail-icon"><Mail size={18} /></div>
                        <div><span>Email</span><strong>{employee.email || "Not provided"}</strong></div>
                    </div>

                    <div className="employee-detail-item">
                        <div className="detail-icon"><Phone size={18} /></div>
                        <div><span>Phone</span><strong>{employee.phone || "Not provided"}</strong></div>
                    </div>

                    <div className="employee-detail-item">
                        <div className="detail-icon"><Building2 size={18} /></div>
                        <div><span>Department</span><strong>{employee.department || "Not provided"}</strong></div>
                    </div>

                    <div className="employee-detail-item">
                        <div className="detail-icon"><Briefcase size={18} /></div>
                        <div><span>Position</span><strong>{employee.position || "Not provided"}</strong></div>
                    </div>

                    <div className="employee-detail-item">
                        <div className="detail-icon"><CalendarDays size={18} /></div>
                        <div><span>Joining Date</span><strong>{formatDate(employee.joinDate)}</strong></div>
                    </div>

                    <div className="employee-detail-item">
                        <div className="detail-icon"><DollarSign size={18} /></div>
                        <div><span>Salary</span><strong>${formatSalary(employee.salary)}</strong></div>
                    </div>

                    <div className="employee-detail-item employee-detail-full">
                        <div className="detail-icon"><MapPin size={18} /></div>
                        <div><span>Address</span><strong>{employee.address || "Not provided"}</strong></div>
                    </div>
                </div>

                <div className="view-modal-footer">
                    <button type="button" className="view-modal-close" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployeeModal;
