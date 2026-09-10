import { useEffect, useState } from "react";

import {
    X,
    UserPlus,
    Pencil,
} from "lucide-react";

import "./EmployeeModal.css";


function EmployeeModal({
    isOpen,
    onClose,
    onSubmit,
    employee,
    isLoading,
}) {

    // ==================================
    // DEFAULT FORM DATA
    // ==================================

    const emptyForm = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        joiningDate: "",
        status: "Active",
        address: "",
    };


    // ==================================
    // FORM STATE
    // ==================================

    const [formData, setFormData] =
        useState(emptyForm);


    // ==================================
    // CONVERT DATE
    // ==================================

    const formatDateForInput = (date) => {

        if (!date) {
            return "";
        }


        // Example:
        // 2026-09-09T00:00:00
        // becomes:
        // 2026-09-09

        if (
            typeof date === "string" &&
            date.includes("T")
        ) {

            return date.split("T")[0];

        }


        // Already:
        // 2026-09-09

        return date;

    };


    // ==================================
    // LOAD EMPLOYEE DATA FOR EDIT
    // ==================================

    useEffect(() => {

        if (!isOpen) {
            return;
        }


        if (employee) {

            // ==================================
            // HANDLE NAME
            // ==================================

            let firstName = "";
            let lastName = "";


            // Backend has full name

            if (employee.name) {

                const nameParts =
                    employee.name
                        .trim()
                        .split(/\s+/);


                firstName =
                    nameParts[0] || "";


                lastName =
                    nameParts
                        .slice(1)
                        .join(" ");

            }


            // If firstName exists directly

            if (employee.firstName) {

                firstName =
                    employee.firstName;

            }


            // If lastName exists directly

            if (employee.lastName) {

                lastName =
                    employee.lastName;

            }


            // ==================================
            // SET FORM DATA
            // ==================================

            setFormData({

                firstName:
                    firstName,

                lastName:
                    lastName,

                email:
                    employee.email || "",

                phone:
                    employee.phone || "",

                department:
                    employee.department || "",

                position:
                    employee.position || "",

                joiningDate:
                    formatDateForInput(
                        employee.joinDate
                    ),

                status:
                    employee.status || "Active",

                address:
                    employee.address || "",

            });

        } else {

            setFormData(emptyForm);

        }

    }, [employee, isOpen]);


    // ==================================
    // CLOSE MODAL
    // ==================================

    if (!isOpen) {
        return null;
    }


    // ==================================
    // HANDLE INPUT CHANGE
    // ==================================

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;


        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );

    };


    // ==================================
    // HANDLE FORM SUBMIT
    // ==================================

    const handleSubmit = (event) => {

        event.preventDefault();


        // Prevent multiple submissions

        if (isLoading) {
            return;
        }


        // Send form data to Employees.jsx

        onSubmit(formData);

    };


    // ==================================
    // RENDER
    // ==================================

    return (

        <div
            className="modal-overlay"
            onMouseDown={onClose}
        >

            <div
                className="employee-modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >


                {/* =========================
                    HEADER
                ========================== */}

                <div className="modal-header">

                    <div className="modal-title">

                        <div className="modal-icon">

                            {employee ? (
                                <Pencil size={20} />
                            ) : (
                                <UserPlus size={20} />
                            )}

                        </div>


                        <div>

                            <h2>

                                {employee
                                    ? "Edit Employee"
                                    : "Add New Employee"}

                            </h2>


                            <p>

                                {employee
                                    ? "Update employee information below."
                                    : "Enter employee information below."}

                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                        aria-label="Close modal"
                        disabled={isLoading}
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* =========================
                    FORM
                ========================== */}

                <form
                    className="employee-form"
                    onSubmit={handleSubmit}
                >


                    {/* =========================
                        FIRST NAME
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="firstName">

                            First Name

                            <span>*</span>

                        </label>


                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                            disabled={isLoading}
                        />

                    </div>


                    {/* =========================
                        LAST NAME
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="lastName">

                            Last Name

                            <span>*</span>

                        </label>


                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                            disabled={isLoading}
                        />

                    </div>


                    {/* =========================
                        EMAIL
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="email">

                            Email

                            <span>*</span>

                        </label>


                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="employee@example.com"
                            required
                            disabled={isLoading}
                        />

                    </div>


                    {/* =========================
                        PHONE
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="phone">
                            Phone
                        </label>


                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            disabled={isLoading}
                        />

                    </div>


                    {/* =========================
                        DEPARTMENT
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="department">

                            Department

                            <span>*</span>

                        </label>


                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        >

                            <option value="">
                                Select department
                            </option>

                            <option value="IT">
                                IT
                            </option>

                            <option value="HR">
                                Human Resources
                            </option>

                            <option value="Finance">
                                Finance
                            </option>

                            <option value="Marketing">
                                Marketing
                            </option>

                            <option value="Operations">
                                Operations
                            </option>

                        </select>

                    </div>


                    {/* =========================
                        POSITION
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="position">

                            Position

                            <span>*</span>

                        </label>


                        <input
                            id="position"
                            name="position"
                            type="text"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="e.g. Software Developer"
                            required
                            disabled={isLoading}
                        />

                    </div>


                    {/* =========================
                        JOINING DATE
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="joiningDate">

                            Joining Date

                            <span>*</span>

                        </label>


                        <input
                            id="joiningDate"
                            name="joiningDate"
                            type="date"
                            value={formData.joiningDate}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />

                    </div>


                    {/* =========================
                        STATUS
                    ========================== */}

                    <div className="form-group">

                        <label htmlFor="status">
                            Status
                        </label>


                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={isLoading}
                        >

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                            <option value="On Leave">
                                On Leave
                            </option>

                        </select>

                    </div>


                    {/* =========================
                        ADDRESS
                    ========================== */}

                    <div className="form-group form-group-full">

                        <label htmlFor="address">
                            Address
                        </label>


                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter employee address"
                            rows="3"
                            disabled={isLoading}
                        />

                    </div>


                    {/* =========================
                        ACTIONS
                    ========================== */}

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={isLoading}
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isLoading}
                        >

                            {isLoading ? (

                                <>
                                    <span className="button-spinner"></span>

                                    Saving...
                                </>

                            ) : employee ? (

                                <>
                                    <Pencil size={17} />

                                    Update Employee
                                </>

                            ) : (

                                <>
                                    <UserPlus size={17} />

                                    Add Employee
                                </>

                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default EmployeeModal;