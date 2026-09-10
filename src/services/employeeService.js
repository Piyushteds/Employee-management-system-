import api from "./api";

// =========================================
// GET ALL EMPLOYEES
// =========================================

export const getEmployees = async () => {
    try {
        const response = await api.get("/Employee/getall");

        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};


// =========================================
// GET EMPLOYEE BY ID
// =========================================

export const getEmployeeById = async (employeeId) => {
    try {
        const response = await api.get(`/Employee/get/${employeeId}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw error;
    }
};


// =========================================
// ADD EMPLOYEE
// =========================================

export const addEmployee = async (employee) => {
    try {
        const response = await api.post(
            "/Employee/create",
            employee
        );

        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
};


// =========================================
// UPDATE EMPLOYEE
// =========================================

export const updateEmployee = async (employeeId, updatedEmployee) => {
    try {
        const response = await api.put(
            "/Employee/update",
            {
                id: employeeId,
                ...updatedEmployee,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};

// =========================================
// DELETE EMPLOYEE
// =========================================

export const deleteEmployee = async (employeeId) => {

    try {

        await api.delete(
            `/Employee/delete/${employeeId}`
        );

        return true;

    } catch (error) {

        console.error(
            "Error deleting employee:",
            error
        );

        throw error;
    }

};