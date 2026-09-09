import { useEffect, useState } from "react";

import {
    Plus,
    Search,
    SlidersHorizontal,
    Pencil,
    Trash2,
    Eye,
    Mail,
} from "lucide-react";

import EmployeeModal
    from "../../components/organisms/EmployeeModal/EmployeeModal";

import ViewEmployeeModal
    from "../../components/organisms/ViewEmployeeModal/ViewEmployeeModal";

import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../../services/employeeService";

import "./Employees.css";


function Employees() {

    // =========================================
    // EMPLOYEE STATE
    // =========================================

    const [employees, setEmployees] = useState([]);


    // =========================================
    // ERROR STATE
    // =========================================

    const [error, setError] = useState("");


    // =========================================
    // ADD / EDIT MODAL
    // =========================================

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [selectedEmployee, setSelectedEmployee] =
        useState(null);


    // =========================================
    // VIEW MODAL
    // =========================================

    const [isViewModalOpen, setIsViewModalOpen] =
        useState(false);

    const [viewEmployee, setViewEmployee] =
        useState(null);


    // =========================================
    // FILTER STATES
    // =========================================

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedDepartment, setSelectedDepartment] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState("");


    // =========================================
    // PAGINATION
    // =========================================

    const [currentPage, setCurrentPage] =
        useState(1);

    const employeesPerPage = 5;


    // =========================================
    // LOAD EMPLOYEES
    // =========================================

    useEffect(() => {

        const loadEmployees = async () => {

            try {

                // Clear old error
                setError("");

                const employeeData =
                    await getEmployees();

                setEmployees(employeeData);

            } catch (error) {

                console.error(
                    "Error loading employees:",
                    error
                );

                setError(
                    "Unable to load employees. Please try again."
                );

            }

        };


        loadEmployees();

    }, []);


    // =========================================
    // FILTER EMPLOYEES
    // =========================================

    const filteredEmployees =
        employees.filter((employee) => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            const employeeName =
                employee.name?.toLowerCase() || "";

            const employeeEmail =
                employee.email?.toLowerCase() || "";

            const employeeDepartment =
                employee.department?.toLowerCase() || "";

            const employeePosition =
                employee.position?.toLowerCase() || "";


            const matchesSearch =
                employeeName.includes(search) ||
                employeeEmail.includes(search) ||
                employeeDepartment.includes(search) ||
                employeePosition.includes(search);


            const matchesDepartment =
                selectedDepartment === "" ||
                employee.department ===
                selectedDepartment;


            const matchesStatus =
                selectedStatus === "" ||
                employee.status ===
                selectedStatus;


            return (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            );

        });


    // =========================================
    // PAGINATION CALCULATION
    // =========================================

    const totalPages =
        Math.ceil(
            filteredEmployees.length /
            employeesPerPage
        );


    const startIndex =
        (currentPage - 1) *
        employeesPerPage;


    const endIndex =
        startIndex +
        employeesPerPage;


    const currentEmployees =
        filteredEmployees.slice(
            startIndex,
            endIndex
        );


    // =========================================
    // PAGE SAFETY
    // =========================================

    useEffect(() => {

        if (
            totalPages > 0 &&
            currentPage > totalPages
        ) {

            setCurrentPage(totalPages);

        }


        if (totalPages === 0) {

            setCurrentPage(1);

        }

    }, [
        currentPage,
        totalPages,
    ]);


    // =========================================
    // SEARCH
    // =========================================

    const handleSearchChange = (event) => {

        setSearchTerm(
            event.target.value
        );

        setCurrentPage(1);

    };


    // =========================================
    // DEPARTMENT FILTER
    // =========================================

    const handleDepartmentChange = (event) => {

        setSelectedDepartment(
            event.target.value
        );

        setCurrentPage(1);

    };


    // =========================================
    // STATUS FILTER
    // =========================================

    const handleStatusChange = (event) => {

        setSelectedStatus(
            event.target.value
        );

        setCurrentPage(1);

    };


    // =========================================
    // CLEAR FILTERS
    // =========================================

    const handleClearFilters = () => {

        setSearchTerm("");

        setSelectedDepartment("");

        setSelectedStatus("");

        setCurrentPage(1);

    };


    // =========================================
    // PREVIOUS PAGE
    // =========================================

    const handlePreviousPage = () => {

        if (currentPage > 1) {

            setCurrentPage(
                currentPage - 1
            );

        }

    };


    // =========================================
    // NEXT PAGE
    // =========================================

    const handleNextPage = () => {

        if (currentPage < totalPages) {

            setCurrentPage(
                currentPage + 1
            );

        }

    };


    // =========================================
    // PAGE CHANGE
    // =========================================

    const handlePageChange = (pageNumber) => {

        setCurrentPage(pageNumber);

    };


    // =========================================
    // GENERATE EMPLOYEE ID
    // =========================================

    const getNextEmployeeId = () => {

        if (employees.length === 0) {

            return "EMP001";

        }


        const employeeNumbers =
            employees.map((employee) => {

                return Number(
                    employee.id.replace(
                        "EMP",
                        ""
                    )
                );

            });


        const highestNumber =
            Math.max(
                ...employeeNumbers
            );


        return `EMP${String(
            highestNumber + 1
        ).padStart(3, "0")}`;

    };


    // =========================================
    // HANDLE SAVE EMPLOYEE
    // =========================================

    const handleSaveEmployee = async (
        formData
    ) => {

        try {

            // Clear old error
            setError("");


            // =================================
            // EDIT EXISTING EMPLOYEE
            // =================================

            if (selectedEmployee) {

                const updatedEmployee = {

                    name:
                        `${formData.firstName} ${formData.lastName}`,

                    email:
                        formData.email,

                    phone:
                        formData.phone,

                    department:
                        formData.department,

                    position:
                        formData.position,

                    status:
                        formData.status,

                    joinDate:
                        formData.joiningDate,

                    address:
                        formData.address,

                };


                // Service call

                await updateEmployee(
                    selectedEmployee.id,
                    updatedEmployee
                );


                // Update UI

                setEmployees(
                    (currentEmployees) => {

                        return currentEmployees.map(
                            (employee) => {

                                if (
                                    employee.id ===
                                    selectedEmployee.id
                                ) {

                                    return {
                                        ...employee,
                                        ...updatedEmployee,
                                    };

                                }


                                return employee;

                            }
                        );

                    }
                );

            }


            // =================================
            // ADD NEW EMPLOYEE
            // =================================

            else {

                const newEmployee = {

                    id:
                        getNextEmployeeId(),

                    name:
                        `${formData.firstName} ${formData.lastName}`,

                    email:
                        formData.email,

                    phone:
                        formData.phone,

                    department:
                        formData.department,

                    position:
                        formData.position,

                    status:
                        formData.status,

                    joinDate:
                        formData.joiningDate,

                    address:
                        formData.address,

                };


                // Service call

                await addEmployee(
                    newEmployee
                );


                // Update UI

                setEmployees(
                    (currentEmployees) => [

                        ...currentEmployees,

                        newEmployee,

                    ]
                );

            }


            // =================================
            // CLOSE MODAL
            // =================================

            setIsModalOpen(false);

            setSelectedEmployee(null);

            setCurrentPage(1);


        } catch (error) {

            console.error(
                "Error saving employee:",
                error
            );


            // Different message for Add / Edit

            if (selectedEmployee) {

                setError(
                    "Unable to update employee. Please try again."
                );

            } else {

                setError(
                    "Unable to add employee. Please try again."
                );

            }

        }

    };


    // =========================================
    // ADD EMPLOYEE
    // =========================================

    const handleAddClick = () => {

        // Clear previous error
        setError("");

        setSelectedEmployee(null);

        setIsModalOpen(true);

    };


    // =========================================
    // EDIT EMPLOYEE
    // =========================================

    const handleEditEmployee = (
        employee
    ) => {

        // Clear previous error
        setError("");

        setSelectedEmployee(employee);

        setIsModalOpen(true);

    };


    // =========================================
    // DELETE EMPLOYEE
    // =========================================

    const handleDeleteEmployee = async (
        employeeId
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this employee?"
            );


        if (!confirmed) {

            return;

        }


        try {

            // Clear old error
            setError("");


            // Service call

            await deleteEmployee(
                employeeId
            );


            // Update UI

            setEmployees(
                (currentEmployees) => {

                    return currentEmployees.filter(
                        (employee) =>
                            employee.id !==
                            employeeId
                    );

                }
            );


        } catch (error) {

            console.error(
                "Error deleting employee:",
                error
            );


            setError(
                "Unable to delete employee. Please try again."
            );

        }

    };


    // =========================================
    // VIEW EMPLOYEE
    // =========================================

    const handleViewEmployee = (
        employee
    ) => {

        setViewEmployee(employee);

        setIsViewModalOpen(true);

    };


    // =========================================
    // CLOSE ADD / EDIT MODAL
    // =========================================

    const handleCloseModal = () => {

        setIsModalOpen(false);

        setSelectedEmployee(null);

    };


    // =========================================
    // CLOSE VIEW MODAL
    // =========================================

    const handleCloseViewModal = () => {

        setIsViewModalOpen(false);

        setViewEmployee(null);

    };


    // =========================================
    // PAGE NUMBERS
    // =========================================

    const pageNumbers = [];


    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        pageNumbers.push(page);

    }


    // =========================================
    // JSX
    // =========================================

    return (

        <div className="employees-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="employees-header">

                <div>

                    <h1>
                        Employees
                    </h1>

                    <p>
                        Manage and organize your
                        organization's employees.
                    </p>

                </div>


                <button
                    type="button"
                    className="add-employee-button"
                    onClick={handleAddClick}
                >

                    <Plus size={18} />

                    <span>
                        Add Employee
                    </span>

                </button>

            </div>


            {/* =================================
                TOOLBAR
            ================================= */}

            <div className="employee-toolbar">


                {/* SEARCH */}

                <div className="employee-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={
                            handleSearchChange
                        }
                    />

                </div>


                {/* DEPARTMENT */}

                <select
                    className="employee-filter"
                    value={
                        selectedDepartment
                    }
                    onChange={
                        handleDepartmentChange
                    }
                >

                    <option value="">
                        All Departments
                    </option>

                    <option value="IT">
                        IT
                    </option>

                    <option value="HR">
                        HR
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


                {/* STATUS */}

                <select
                    className="employee-filter"
                    value={selectedStatus}
                    onChange={
                        handleStatusChange
                    }
                >

                    <option value="">
                        All Status
                    </option>

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


                {/* CLEAR FILTERS */}

                <button
                    type="button"
                    className="filter-button"
                    onClick={
                        handleClearFilters
                    }
                >

                    <SlidersHorizontal
                        size={17}
                    />

                    <span>
                        Clear Filters
                    </span>

                </button>

            </div>


            {/* =================================
                TABLE CARD
            ================================= */}

            <div className="employee-table-card">


                {/* TABLE HEADER */}

                <div className="table-header">

                    <div>

                        <h2>
                            All Employees
                        </h2>

                        <span>
                            {
                                filteredEmployees.length
                            } employees
                        </span>

                    </div>

                </div>


                {/* =================================
                    ERROR MESSAGE
                ================================= */}

                {error && (

                    <div className="employee-error">

                        {error}

                    </div>

                )}


                {/* TABLE */}

                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Employee
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Position
                                </th>

                                <th>
                                    Join Date
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                currentEmployees.length >
                                    0

                                    ? currentEmployees.map(
                                        (employee) => (

                                            <tr
                                                key={
                                                    employee.id
                                                }
                                            >


                                                {/* EMPLOYEE */}

                                                <td>

                                                    <div
                                                        className="employee-info"
                                                    >

                                                        <div
                                                            className="employee-avatar"
                                                        >

                                                            {
                                                                employee.name
                                                                    ?.charAt(0)
                                                                    .toUpperCase()
                                                            }

                                                        </div>


                                                        <div>

                                                            <strong>

                                                                {
                                                                    employee.name
                                                                }

                                                            </strong>

                                                            <span>

                                                                {
                                                                    employee.email
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* DEPARTMENT */}

                                                <td>

                                                    <span
                                                        className="department-name"
                                                    >

                                                        {
                                                            employee.department
                                                        }

                                                    </span>

                                                </td>


                                                {/* POSITION */}

                                                <td>

                                                    <span
                                                        className="position-name"
                                                    >

                                                        {
                                                            employee.position
                                                        }

                                                    </span>

                                                </td>


                                                {/* JOIN DATE */}

                                                <td>

                                                    <span
                                                        className="join-date"
                                                    >

                                                        {
                                                            employee.joinDate
                                                        }

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={`status-badge ${employee.status
                                                            ?.toLowerCase()
                                                            .replace(
                                                                " ",
                                                                "-"
                                                            )}`}
                                                    >

                                                        <span
                                                            className="status-dot"
                                                        />

                                                        {
                                                            employee.status
                                                        }

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td>

                                                    <div
                                                        className="employee-actions"
                                                    >


                                                        {/* VIEW */}

                                                        <button
                                                            type="button"
                                                            title="View"
                                                            onClick={() =>
                                                                handleViewEmployee(
                                                                    employee
                                                                )
                                                            }
                                                        >

                                                            <Eye
                                                                size={16}
                                                            />

                                                        </button>


                                                        {/* EDIT */}

                                                        <button
                                                            type="button"
                                                            title="Edit"
                                                            onClick={() =>
                                                                handleEditEmployee(
                                                                    employee
                                                                )
                                                            }
                                                        >

                                                            <Pencil
                                                                size={16}
                                                            />

                                                        </button>


                                                        {/* EMAIL */}

                                                        <button
                                                            type="button"
                                                            title="Email"
                                                            onClick={() => {

                                                                window.location.href =
                                                                    `mailto:${employee.email}`;

                                                            }}
                                                        >

                                                            <Mail
                                                                size={16}
                                                            />

                                                        </button>


                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            title="Delete"
                                                            className="delete-action"
                                                            onClick={() =>
                                                                handleDeleteEmployee(
                                                                    employee.id
                                                                )
                                                            }
                                                        >

                                                            <Trash2
                                                                size={16}
                                                            />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                    : (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                style={{
                                                    textAlign:
                                                        "center",

                                                    padding:
                                                        "40px",
                                                }}
                                            >

                                                <strong>
                                                    No employees found
                                                </strong>

                                                <div
                                                    style={{
                                                        marginTop:
                                                            "8px",
                                                    }}
                                                >

                                                    Try changing
                                                    your search
                                                    or filters.

                                                </div>

                                            </td>

                                        </tr>

                                    )
                            }

                        </tbody>

                    </table>

                </div>


                {/* =================================
                    PAGINATION
                ================================= */}

                <div className="pagination">

                    <span>

                        {
                            filteredEmployees.length >
                                0

                                ? `Showing ${startIndex + 1}–${Math.min(
                                    endIndex,
                                    filteredEmployees.length
                                )} of ${filteredEmployees.length} employees`

                                : "Showing 0 of 0 employees"
                        }

                    </span>


                    <div className="pagination-buttons">


                        {/* PREVIOUS */}

                        <button
                            type="button"
                            disabled={
                                currentPage === 1
                            }
                            onClick={
                                handlePreviousPage
                            }
                        >

                            Previous

                        </button>


                        {/* PAGE NUMBERS */}

                        {
                            pageNumbers.map(
                                (pageNumber) => (

                                    <button
                                        key={
                                            pageNumber
                                        }
                                        type="button"
                                        className={
                                            currentPage ===
                                                pageNumber

                                                ? "pagination-active"

                                                : ""
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                pageNumber
                                            )
                                        }
                                    >

                                        {
                                            pageNumber
                                        }

                                    </button>

                                )
                            )
                        }


                        {/* NEXT */}

                        <button
                            type="button"
                            disabled={
                                currentPage ===
                                    totalPages ||
                                totalPages === 0
                            }
                            onClick={
                                handleNextPage
                            }
                        >

                            Next

                        </button>

                    </div>

                </div>

            </div>


            {/* =================================
                ADD / EDIT MODAL
            ================================= */}

            <EmployeeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSaveEmployee}
                employee={selectedEmployee}
            />


            {/* =================================
                VIEW MODAL
            ================================= */}

            <ViewEmployeeModal
                isOpen={isViewModalOpen}
                onClose={
                    handleCloseViewModal
                }
                employee={viewEmployee}
            />

        </div>

    );

}


export default Employees;