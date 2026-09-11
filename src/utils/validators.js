export const validateEmployee = (formData) => {
    const errors = {};

    const firstName = formData.firstName?.trim() || "";
    const lastName = formData.lastName?.trim() || "";
    const email = formData.email?.trim() || "";
    const phone = formData.phone?.trim() || "";
    const department = formData.department?.trim() || "";
    const position = formData.position?.trim() || "";
    const joiningDate = formData.joiningDate || "";
    const salary = formData.salary === "" ? "" : Number(formData.salary);
    const address = formData.address?.trim() || "";

    if (!firstName) {
        errors.firstName = "First name is required.";
    } else if (firstName.length < 2) {
        errors.firstName = "First name must be at least 2 characters.";
    } else if (firstName.length > 50) {
        errors.firstName = "First name must be 50 characters or less.";
    } else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(firstName)) {
        errors.firstName = "First name contains invalid characters.";
    }

    if (!lastName) {
        errors.lastName = "Last name is required.";
    } else if (lastName.length < 2) {
        errors.lastName = "Last name must be at least 2 characters.";
    } else if (lastName.length > 50) {
        errors.lastName = "Last name must be 50 characters or less.";
    } else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(lastName)) {
        errors.lastName = "Last name contains invalid characters.";
    }

    if (!email) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Enter a valid email address.";
    }

    if (phone && !/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
        errors.phone = "Enter a valid phone number.";
    }

    if (!department) {
        errors.department = "Please select a department.";
    }

    if (!position) {
        errors.position = "Position is required.";
    } else if (position.length < 2) {
        errors.position = "Position must be at least 2 characters.";
    } else if (position.length > 100) {
        errors.position = "Position must be 100 characters or less.";
    }

    if (!joiningDate) {
        errors.joiningDate = "Joining date is required.";
    }

    if (salary === "" || Number.isNaN(salary)) {
        errors.salary = "Salary is required.";
    } else if (salary < 0) {
        errors.salary = "Salary cannot be negative.";
    } else if (salary > 100000000) {
        errors.salary = "Enter a valid salary amount.";
    }

    if (address.length > 250) {
        errors.address = "Address must be 250 characters or less.";
    }

    return errors;
};

export const hasValidationErrors = (errors) =>
    Object.keys(errors).length > 0;
