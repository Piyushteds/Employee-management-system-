import { X, Building2 } from "lucide-react";

import "./ViewDepartmentModal.css";

function ViewDepartmentModal({
    isOpen,
    onClose,
    department,
}) {
    if (!isOpen || !department) {
        return null;
    }


    return (
        <div className="view-department-overlay">

            <div
                className="view-department-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="view-department-title"
            >

                {/* HEADER */}

                <div className="view-department-header">

                    <div className="view-department-title-area">

                        <div className="view-department-icon">
                            <Building2 size={22} />
                        </div>

                        <div>
                            <h2 id="view-department-title">
                                Department Details
                            </h2>

                            <p>
                                View department information
                            </p>
                        </div>

                    </div>


                    <button
                        type="button"
                        className="view-department-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={19} />
                    </button>

                </div>


                {/* BODY */}

                <div className="view-department-body">

                    <div className="department-detail">

                        <span>
                            Department ID
                        </span>

                        <strong>
                            #{department.id}
                        </strong>

                    </div>


                    <div className="department-detail">

                        <span>
                            Department Code
                        </span>

                        <strong className="view-department-code">
                            {department.departmentcode}
                        </strong>

                    </div>


                    <div className="department-detail">

                        <span>
                            discription
                        </span>

                        <strong>
                            {department.discription}
                        </strong>

                    </div>


                    <div className="department-detail">

                        <span>
                            Employee
                        </span>

                        <strong>
                            {department.employee}
                        </strong>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="view-department-footer">

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ViewDepartmentModal;