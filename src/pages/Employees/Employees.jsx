import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/organisms/ConfirmDialog/ConfirmDialog";
import EmployeeTable
    from "../../components/organisms/EmployeeTable/EmployeeTable";
import useDebounce from "../../hooks/useDebounce";
import {
    Plus,
    Search,
    SlidersHorizontal,
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
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
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    // =========================================
    // EMPLOYEE STATE
    // =========================================

    const [employees, setEmployees] = useState([]);

    // =========================================
    // SELECTED ROW STATE
    // =========================================

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });


    // =========================================
    // LOADING STATE
    // =========================================

    const [isLoading, setIsLoading] = useState(true);


    // =========================================
    // ERROR STATE
    // =========================================

    const [error, setError] = useState("");

    // =========================================
    // ACTION LOADING STATE
    // =========================================

    const [isActionLoading, setIsActionLoading] = useState(false);
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

    const debouncedSearchTerm =
        useDebounce(searchTerm, 300);

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

                setIsLoading(true);

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

            } finally {

                setIsLoading(false);

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
                debouncedSearchTerm
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


    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortConfig.key) return 0;
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];
        if (sortConfig.key === "joinDate") {
            valueA = new Date(valueA).getTime();
            valueB = new Date(valueB).getTime();
        } else {
            valueA = String(valueA ?? "").toLowerCase();
            valueB = String(valueB ?? "").toLowerCase();
        }
        if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const currentEmployees = sortedEmployees.slice(startIndex, endIndex);

    // =========================================
    // SORT
    // =========================================

    const handleSort = (key) => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
        }));
        setCurrentPage(1);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={15} />;
        return sortConfig.direction === "asc" ? <ArrowUp size={15} /> : <ArrowDown size={15} />;
    };


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
    // HANDLE SAVE EMPLOYEE
    // =========================================
    const handleSaveEmployee = async (formData) => {

        try {

            setIsActionLoading(true);
            setError("");

            // =================================
            // EDIT EXISTING EMPLOYEE
            // =================================

            if (selectedEmployee) {

                const updatedEmployee = {

                    name:
                        `${formData.firstName} ${formData.lastName}`.trim(),

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


                const savedEmployee =
                    await updateEmployee(
                        selectedEmployee.id,
                        updatedEmployee
                    );


                setEmployees(
                    (currentEmployees) => {

                        return currentEmployees.map(
                            (employee) => {

                                if (
                                    employee.id ===
                                    selectedEmployee.id
                                ) {

                                    return savedEmployee;

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

                    name:
                        `${formData.firstName} ${formData.lastName}`.trim(),

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


                const savedEmployee =
                    await addEmployee(
                        newEmployee
                    );


                setEmployees(
                    (currentEmployees) => [

                        ...currentEmployees,

                        savedEmployee,

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


            if (selectedEmployee) {

                setError(
                    "Unable to update employee. Please try again."
                );

            } else {

                setError(
                    "Unable to add employee. Please try again."
                );

            }

        } finally {

            setIsActionLoading(false);

        }

    }

    // =========================================
    // ADD EMPLOYEE
    // =========================================

    const handleAddClick = () => {

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

        setError("");

        setSelectedEmployee(employee);

        setIsModalOpen(true);

    };


    // =========================================
    // DELETE EMPLOYEE
    // =========================================

    const handleDeleteEmployee = (employeeId) => {

        if (isActionLoading) {
            return;
        }


        const employee = employees.find(
            (item) => item.id === employeeId
        );


        if (!employee) {
            return;
        }


        setEmployeeToDelete(employee);

        setIsDeleteDialogOpen(true);

    };

    // =========================================
    // CONFIRM DELETE EMPLOYEE
    // =========================================

    const handleConfirmDelete = async () => {

        if (!employeeToDelete || isActionLoading) {
            return;
        }

        try {

            setIsActionLoading(true);
            setError("");

            await deleteEmployee(
                employeeToDelete.id
            );

            setEmployees(
                (currentEmployees) => {

                    return currentEmployees.filter(
                        (employee) =>
                            employee.id !== employeeToDelete.id
                    );

                }
            );

            setIsDeleteDialogOpen(false);
            setEmployeeToDelete(null);

        } catch (error) {

            console.error(
                "Error deleting employee:",
                error
            );

            setError(
                "Unable to delete employee. Please try again."
            );

        } finally {

            setIsActionLoading(false);

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

    const getPageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
        if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
        if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    const pageNumbers = getPageNumbers();


    // =========================================
    // FORMAT DATE
    // =========================================

    const formatJoinDate = (date) => {

        if (!date) {
            return "-";
        }

        const dateOnly =
            date.split("T")[0];

        const parts =
            dateOnly.split("-");

        if (parts.length !== 3) {
            return date;
        }

        return `${parts[2]}/${parts[1]}/${parts[0]}`;

    };


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

                <div className="table-header">
                    <div>
                        <h2>All Employees</h2>
                        <span>
                            {filteredEmployees.length} employees
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="employee-error">
                        {error}
                    </div>
                )}

                <EmployeeTable
                    employees={currentEmployees}
                    isLoading={isLoading}
                    selectedRowId={selectedRowId}
                    openActionMenuId={openActionMenuId}
                    isActionLoading={isActionLoading}
                    sortConfig={sortConfig}
                    onRowSelect={setSelectedRowId}
                    onSort={handleSort}
                    getSortIcon={getSortIcon}
                    onToggleActionMenu={(employeeId) => {
                        setSelectedRowId(employeeId);
                        setOpenActionMenuId((currentId) =>
                            currentId === employeeId
                                ? null
                                : employeeId
                        );
                    }}
                    onView={(employee) => {
                        setOpenActionMenuId(null);
                        handleViewEmployee(employee);
                    }}
                    onEdit={(employee) => {
                        setOpenActionMenuId(null);
                        handleEditEmployee(employee);
                    }}
                    onSendEmail={(employee) => {
                        setOpenActionMenuId(null);
                        window.location.href =
                            `mailto:${employee.email}`;
                    }}
                    onDelete={(employeeId) => {
                        setOpenActionMenuId(null);
                        handleDeleteEmployee(employeeId);
                    }}
                    formatJoinDate={formatJoinDate}
                    onClearFilters={handleClearFilters}
                    hasActiveFilters={
                        Boolean(
                            searchTerm ||
                            selectedDepartment ||
                            selectedStatus
                        )
                    }
                />

                <div className="pagination">
                    <span>
                        {filteredEmployees.length > 0
                            ? `Showing ${startIndex + 1}–${Math.min(
                                endIndex,
                                filteredEmployees.length
                            )} of ${filteredEmployees.length} employees`
                            : "Showing 0 of 0 employees"}
                    </span>

                    <div className="pagination-buttons">
                        <button
                            type="button"
                            title="First Page"
                            aria-label="First Page"
                            disabled={
                                currentPage === 1 ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={() => handlePageChange(1)}
                        >
                            <ChevronsLeft size={16} />
                        </button>

                        <button
                            type="button"
                            title="Previous Page"
                            aria-label="Previous Page"
                            disabled={
                                currentPage === 1 ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={handlePreviousPage}
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {pageNumbers.map((pageNumber, index) =>
                            pageNumber === "..." ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="pagination-ellipsis"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    className={
                                        currentPage === pageNumber
                                            ? "pagination-active"
                                            : ""
                                    }
                                    disabled={isLoading}
                                    onClick={() =>
                                        handlePageChange(pageNumber)
                                    }
                                >
                                    {pageNumber}
                                </button>
                            )
                        )}

                        <button
                            type="button"
                            title="Next Page"
                            aria-label="Next Page"
                            disabled={
                                currentPage === totalPages ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={handleNextPage}
                        >
                            <ChevronRight size={16} />
                        </button>

                        <button
                            type="button"
                            title="Last Page"
                            aria-label="Last Page"
                            disabled={
                                currentPage === totalPages ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={() => handlePageChange(totalPages)}
                        >
                            <ChevronsRight size={16} />
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
                isLoading={isActionLoading}
            />

            {/* =================================
                DELETE CONFIRMATION DIALOG
            ================================= */}

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    if (isActionLoading) {
                        return;
                    }

                    setIsDeleteDialogOpen(false);
                    setEmployeeToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                employeeName={employeeToDelete?.name || ""}
                isLoading={isActionLoading}
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