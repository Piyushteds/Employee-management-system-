import api from "./api";


// =========================================
// GET ALL DEPARTMENTS
// =========================================

export const getDepartments = async () => {

    try {

        const response = await api.get(
            "/Department/getall"
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching departments:",
            error
        );

        throw error;
    }
};


// =========================================
// GET DEPARTMENT BY ID
// =========================================

export const getDepartmentById = async (id) => {

    try {

        const response = await api.get(
            `/Department/get/${id}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching department:",
            error
        );

        throw error;
    }
};


// =========================================
// CREATE DEPARTMENT
// =========================================

export const addDepartment = async (department) => {

    try {

        const payload = {

            departmentcode:
                String(
                    department.departmentcode ?? ""
                ).trim(),

            discription:
                String(
                    department.discription ??
                    department.discription ??
                    ""
                ).trim(),

            employee:
                String(
                    department.employee ?? ""
                ).trim(),

        };


        console.log(
            "CREATE Department Payload:",
            payload
        );


        const response = await api.post(
            "/Department/create",
            payload
        );


        return response.data;

    } catch (error) {

        console.error(
            "CREATE Department Error:",
            error
        );

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Backend Response:",
            error.response?.data
        );

        throw error;
    }
};


// =========================================
// UPDATE DEPARTMENT
// =========================================

export const updateDepartment = async (department) => {

    try {

        const payload = {

            // ID must be present
            id: Number(department.id),

            departmentcode:
                String(
                    department.departmentcode ?? ""
                ).trim(),

            // IMPORTANT
            // Backend property = discription
            discription:
                String(
                    department.discription ??
                    department.discription ??
                    ""
                ).trim(),

            employee:
                String(
                    department.employee ?? ""
                ).trim(),

        };


        console.log(
            "UPDATE Department Payload:",
            payload
        );


        const response = await api.put(
            "/Department/update",
            payload
        );


        console.log(
            "UPDATE Department Success:",
            response.data
        );


        return response.data;

    } catch (error) {

        console.error(
            "UPDATE Department Error:",
            error
        );

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Backend Response:",
            error.response?.data
        );

        throw error;
    }
};


// =========================================
// DELETE DEPARTMENT
// =========================================

export const deleteDepartment = async (id) => {

    try {

        await api.delete(
            `/Department/delete/${id}`
        );

        return true;

    } catch (error) {

        console.error(
            "DELETE Department Error:",
            error
        );

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Backend Response:",
            error.response?.data
        );

        throw error;
    }
};