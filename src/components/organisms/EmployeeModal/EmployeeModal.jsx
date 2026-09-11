import { useEffect, useState } from "react";
import { X, UserPlus, Pencil } from "lucide-react";

import { validateEmployee, hasValidationErrors } from "../../../utils/validators";
import "./EmployeeModal.css";

const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    joiningDate: "",
    status: "Active",
    salary: "",
    address: "",
};

function EmployeeModal({ isOpen, onClose, onSubmit, employee, isLoading = false }) {
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    const formatDateForInput = (date) => {
        if (!date) return "";
        return typeof date === "string" && date.includes("T")
            ? date.split("T")[0]
            : date;
    };

    useEffect(() => {
        if (!isOpen) return;

        if (employee) {
            let firstName = "";
            let lastName = "";

            if (employee.name) {
                const parts = employee.name.trim().split(/\s+/);
                firstName = parts[0] || "";
                lastName = parts.slice(1).join(" ");
            }

            setFormData({
                firstName: employee.firstName || firstName,
                lastName: employee.lastName || lastName,
                email: employee.email || "",
                phone: employee.phone || "",
                department: employee.department || "",
                position: employee.position || "",
                joiningDate: formatDateForInput(employee.joinDate),
                status: employee.status || "Active",
                salary:
                    employee.salary !== null && employee.salary !== undefined
                        ? String(employee.salary)
                        : "",
                address: employee.address || "",
            });
        } else {
            setFormData(emptyForm);
        }

        setErrors({});
    }, [employee, isOpen]);

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: "",
            }));
        }
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        const nextErrors = validateEmployee(formData);

        setErrors((previous) => ({
            ...previous,
            [name]: nextErrors[name] || "",
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateEmployee(formData);
        setErrors(validationErrors);

        if (hasValidationErrors(validationErrors)) {
            return;
        }

        onSubmit({
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            position: formData.position.trim(),
            address: formData.address.trim(),
            salary: Number(formData.salary),
        });
    };

    const fieldClass = (field) =>
        errors[field] ? "input-error" : "";

    return (
        <div className="modal-overlay" onMouseDown={onClose}>
            <div
                className="employee-modal"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="modal-title">
                        <div className="modal-icon">
                            {employee ? <Pencil size={20} /> : <UserPlus size={20} />}
                        </div>
                        <div>
                            <h2>{employee ? "Edit Employee" : "Add New Employee"}</h2>
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

                <form className="employee-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name <span>*</span></label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter first name"
                            className={fieldClass("firstName")}
                            disabled={isLoading}
                        />
                        {errors.firstName && <small className="field-error">{errors.firstName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name <span>*</span></label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter last name"
                            className={fieldClass("lastName")}
                            disabled={isLoading}
                        />
                        {errors.lastName && <small className="field-error">{errors.lastName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email <span>*</span></label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="employee@example.com"
                            className={fieldClass("email")}
                            disabled={isLoading}
                        />
                        {errors.email && <small className="field-error">{errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="+91 98765 43210"
                            className={fieldClass("phone")}
                            disabled={isLoading}
                        />
                        {errors.phone && <small className="field-error">{errors.phone}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="department">Department <span>*</span></label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={fieldClass("department")}
                            disabled={isLoading}
                        >
                            <option value="">Select department</option>
                            <option value="IT">IT</option>
                            <option value="HR">Human Resources</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                        </select>
                        {errors.department && <small className="field-error">{errors.department}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="position">Position <span>*</span></label>
                        <input
                            id="position"
                            name="position"
                            type="text"
                            value={formData.position}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Software Developer"
                            className={fieldClass("position")}
                            disabled={isLoading}
                        />
                        {errors.position && <small className="field-error">{errors.position}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="joiningDate">Joining Date <span>*</span></label>
                        <input
                            id="joiningDate"
                            name="joiningDate"
                            type="date"
                            value={formData.joiningDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={fieldClass("joiningDate")}
                            disabled={isLoading}
                        />
                        {errors.joiningDate && <small className="field-error">{errors.joiningDate}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary">Salary <span>($)</span></label>
                        <input
                            id="salary"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter salary"
                            min="0"
                            step="0.01"
                            className={fieldClass("salary")}
                            disabled={isLoading}
                        />
                        {errors.salary && <small className="field-error">{errors.salary}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={isLoading}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>

                    <div className="form-group form-group-full">
                        <label htmlFor="address">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter employee address"
                            rows="3"
                            className={fieldClass("address")}
                            disabled={isLoading}
                        />
                        <div className="field-meta">
                            {errors.address ? (
                                <small className="field-error">{errors.address}</small>
                            ) : (
                                <span />
                            )}
                            <small>{formData.address.length}/250</small>
                        </div>
                    </div>

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
                            {employee ? <Pencil size={17} /> : <UserPlus size={17} />}
                            {isLoading
                                ? employee
                                    ? "Updating..."
                                    : "Adding..."
                                : employee
                                    ? "Update Employee"
                                    : "Add Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeModal;
