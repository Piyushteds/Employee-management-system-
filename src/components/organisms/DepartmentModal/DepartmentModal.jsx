import {
    useEffect,
    useState,
} from "react";

import {
    X,
    Building2,
    Pencil,
} from "lucide-react";

import {
    validateDepartment,
} from "../../../utils/departmentValidators";

import "./DepartmentModal.css";


function DepartmentModal({
    isOpen = false,

    onClose,

    // Parent ka save function
    onSave,

    // Compatibility ke liye
    onSubmit,

    department = null,

    isLoading = false,
}) {

    /* =========================================
       EMPTY FORM
    ========================================= */

    const emptyForm = {
        departmentcode: "",
        discription: "",
        employee: "",
    };


    /* =========================================
       FORM STATE
    ========================================= */

    const [formData, setFormData] =
        useState(emptyForm);


    /* =========================================
       VALIDATION STATE
    ========================================= */

    const [errors, setErrors] =
        useState({});


    /* =========================================
       LOAD DATA FOR EDIT
    ========================================= */

    useEffect(() => {

        if (!isOpen) {
            return;
        }


        if (department) {

            setFormData({

                departmentcode:
                    department.departmentcode ||
                    "",

                discription:
                    department.discription ||
                    "",

                employee:
                    department.employee ||
                    "",

            });

        } else {

            setFormData(
                emptyForm
            );

        }


        setErrors({});

    }, [
        department,
        isOpen,
    ]);


    /* =========================================
       CLOSE
    ========================================= */

    if (!isOpen) {
        return null;
    }


    /* =========================================
       INPUT CHANGE
    ========================================= */

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


        setErrors(
            (previous) => ({
                ...previous,
                [name]: "",
            })
        );

    };


    /* =========================================
       SUBMIT
    ========================================= */

    const handleSubmit = (event) => {

        event.preventDefault();


        if (isLoading) {
            return;
        }


        /* =====================================
           VALIDATE
        ===================================== */

        const validationErrors =
            validateDepartment(
                formData
            );


        setErrors(
            validationErrors
        );


        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {
            return;
        }


        /* =====================================
           SAVE FUNCTION
        ===================================== */

        const saveFunction =
            onSave || onSubmit;


        if (saveFunction) {

            saveFunction({
                departmentcode:
                    formData.departmentcode.trim(),

                discription:
                    formData.discription.trim(),

                employee:
                    formData.employee.trim(),
            });

        }

    };


    return (

        <div
            className="department-modal-overlay"
            onMouseDown={onClose}
        >

            <div
                className="department-modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================
                    HEADER
                ================================= */}

                <div className="department-modal-header">

                    <div className="department-modal-title">

                        <div className="department-modal-icon">

                            {department ? (
                                <Pencil size={20} />
                            ) : (
                                <Building2 size={20} />
                            )}

                        </div>


                        <div>

                            <h2>
                                {department
                                    ? "Edit Department"
                                    : "Add New Department"}
                            </h2>


                            <p>
                                {department
                                    ? "Update department information below."
                                    : "Enter department information below."}
                            </p>

                        </div>

                    </div>


                    {/* CLOSE */}

                    <button
                        type="button"
                        className="department-modal-close"
                        onClick={onClose}
                        disabled={isLoading}
                        aria-label="Close modal"
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* =================================
                    FORM
                ================================= */}

                <form
                    className="department-form"
                    onSubmit={handleSubmit}
                >

                    {/* DEPARTMENT CODE */}

                    <div className="department-form-group">

                        <label htmlFor="departmentcode">

                            Department Code

                            <span>*</span>

                        </label>


                        <input
                            id="departmentcode"
                            name="departmentcode"
                            type="text"
                            value={
                                formData.departmentcode
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. HR001"
                            disabled={isLoading}
                        />


                        {errors.departmentcode && (

                            <small className="department-field-error">

                                {
                                    errors.departmentcode
                                }

                            </small>

                        )}

                    </div>


                    {/* discription */}

                    <div className="department-form-group">

                        <label htmlFor="discription">

                            discription

                            <span>*</span>

                        </label>


                        <textarea
                            id="discription"
                            name="discription"
                            rows="4"
                            value={
                                formData.discription
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter department discription"
                            disabled={isLoading}
                        />


                        {errors.discription && (

                            <small className="department-field-error">

                                {
                                    errors.discription
                                }

                            </small>

                        )}

                    </div>


                    {/* EMPLOYEE */}

                    <div className="department-form-group">

                        <label htmlFor="employee">

                            Employee

                            <span>*</span>

                        </label>


                        <input
                            id="employee"
                            name="employee"
                            type="text"
                            value={
                                formData.employee
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter employee count/name"
                            disabled={isLoading}
                        />


                        {errors.employee && (

                            <small className="department-field-error">

                                {
                                    errors.employee
                                }

                            </small>

                        )}

                    </div>


                    {/* =================================
                        FOOTER
                    ================================= */}

                    <div className="department-modal-footer">

                        <button
                            type="button"
                            className="department-cancel-button"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="department-save-button"
                            disabled={isLoading}
                        >

                            {isLoading ? (
                                <>
                                    <span className="department-save-spinner" />

                                    {department
                                        ? "Updating..."
                                        : "Saving..."}
                                </>
                            ) : (
                                <>
                                    {department
                                        ? "Update Department"
                                        : "Add Department"}
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default DepartmentModal;