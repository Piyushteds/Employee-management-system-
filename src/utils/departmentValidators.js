export const validateDepartment = (formData) => {

    const errors = {};


    /* =========================================
       DEPARTMENT CODE
    ========================================= */

    if (
        !formData.departmentcode?.trim()
    ) {

        errors.departmentcode =
            "Department code is required.";

    } else if (
        formData.departmentcode.trim().length < 2
    ) {

        errors.departmentcode =
            "Department code must be at least 2 characters.";

    }


    /* =========================================
       discription
    ========================================= */

    if (
        !formData.discription?.trim()
    ) {

        errors.discription =
            "discription is required.";

    }


    /* =========================================
       EMPLOYEE
    ========================================= */

    if (
        !formData.employee?.trim()
    ) {

        errors.employee =
            "Employee is required.";

    }


    return errors;
};


export const isDepartmentFormValid = (
    formData
) => {

    const errors =
        validateDepartment(formData);

    return (
        Object.keys(errors).length === 0
    );

};