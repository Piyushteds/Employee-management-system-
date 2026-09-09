import { X, User, Mail, Phone, Building2, Briefcase, CalendarDays, MapPin } from "lucide-react";

import "./ViewEmployeeModal.css";


function ViewEmployeeModal({
    isOpen,
    onClose,
    employee,
}) {

    if (!isOpen || !employee) {
        return null;
    }


    return (

        <div
            className="view-modal-overlay"
            onMouseDown={onClose}
        >

            <div
                className="view-employee-modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="view-modal-header">

                    <div className="view-modal-title">

                        <div className="view-employee-avatar">

                            {employee.name
                                .charAt(0)
                                .toUpperCase()}

                        </div>


                        <div>

                            <h2>
                                Employee Details
                            </h2>

                            <p>
                                View employee information
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="view-close-button"
                        onClick={onClose}
                        aria-label="Close"
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* ==================================
                    EMPLOYEE PROFILE
                ================================== */}

                <div className="view-employee-profile">

                    <div>

                        <h3>
                            {employee.name}
                        </h3>

                        <p>
                            {employee.position}
                        </p>

                    </div>


                    <span
                        className={`status-badge ${employee.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                    >

                        <span className="status-dot">
                        </span>

                        {employee.status}

                    </span>

                </div>


                {/* ==================================
                    DETAILS
                ================================== */}

                <div className="employee-details-grid">


                    {/* Employee ID */}

                    <div className="employee-detail-item">

                        <div className="detail-icon">
                            <User size={18} />
                        </div>

                        <div>

                            <span>
                                Employee ID
                            </span>

                            <strong>
                                {employee.id}
                            </strong>

                        </div>

                    </div>


                    {/* Email */}

                    <div className="employee-detail-item">

                        <div className="detail-icon">
                            <Mail size={18} />
                        </div>

                        <div>

                            <span>
                                Email
                            </span>

                            <strong>
                                {employee.email}
                            </strong>

                        </div>

                    </div>


                    {/* Phone */}

                    <div className="employee-detail-item">

                        <div className="detail-icon">
                            <Phone size={18} />
                        </div>

                        <div>

                            <span>
                                Phone
                            </span>

                            <strong>
                                {employee.phone || "Not provided"}
                            </strong>

                        </div>

                    </div>


                    {/* Department */}

                    <div className="employee-detail-item">

                        <div className="detail-icon">
                            <Building2 size={18} />
                        </div>

                        <div>

                            <span>
                                Department
                            </span>

                            <strong>
                                {employee.department}
                            </strong>

                        </div>

                    </div>


                    {/* Position */}

                    <div className="employee-detail-item">

                        <div className="detail-icon">
                            <Briefcase size={18} />
                        </div>

                        <div>

                            <span>
                                Position
                            </span>

                            <strong>
                                {employee.position}
                            </strong>

                        </div>

                    </div>


                    {/* Joining Date */}

                    <div className="employee-detail-item">

                        <div className="detail-icon">
                            <CalendarDays size={18} />
                        </div>

                        <div>

                            <span>
                                Joining Date
                            </span>

                            <strong>
                                {employee.joinDate}
                            </strong>

                        </div>

                    </div>


                    {/* Address */}

                    <div className="employee-detail-item employee-detail-full">

                        <div className="detail-icon">
                            <MapPin size={18} />
                        </div>

                        <div>

                            <span>
                                Address
                            </span>

                            <strong>
                                {employee.address || "Not provided"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    FOOTER
                ================================== */}

                <div className="view-modal-footer">

                    <button
                        type="button"
                        className="view-modal-close"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}


export default ViewEmployeeModal;