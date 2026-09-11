import { useEffect, useState } from "react";

import Button from "../../components/atoms/Button/Button";
import Select from "../../components/atoms/Select/Select";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import Pagination from "../../components/molecules/Pagination/Pagination";

import ConfirmDialog from "../../components/organisms/ConfirmDialog/ConfirmDialog";
import EmployeeTable from "../../components/organisms/EmployeeTable/EmployeeTable";
import EmployeeModal from "../../components/organisms/EmployeeModal/EmployeeModal";
import ViewEmployeeModal from "../../components/organisms/ViewEmployeeModal/ViewEmployeeModal";

import useDebounce from "../../hooks/useDebounce";

import {
    Plus,
    SlidersHorizontal,
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
} from "lucide-react";

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
    // ROW / ACTION STATE
    // =========================================

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    // =========================================
    // LOADING / ERROR
    // =========================================

    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================================
    // ADD / EDIT MODAL
    // =========================================

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // =========================================
    // VIEW MODAL
    // =========================================

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewEmployee, setViewEmployee] = useState(null);

    // =========================================
    // DELETE DIALOG
    // =========================================

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    // =========================================
    // FILTER STATE
    // =========================================

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedSalaryRange, setSelectedSalaryRange] = useState("");

    // =========================================
    // PAGINATION
    // =========================================

    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;

    // =========================================
    // LOAD EMPLOYEES
    // =========================================

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                setIsLoading(true);
                setError("");

                const employeeData = await getEmployees();
                setEmployees(employeeData);
            } catch (loadError) {
                console.error("Error loading employees:", loadError);
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
    // FILTER
    // =========================================

    const filteredEmployees = employees.filter((employee) => {
        const search = debouncedSearchTerm.trim().toLowerCase();

        const employeeName = employee.name?.toLowerCase() || "";
        const employeeEmail = employee.email?.toLowerCase() || "";
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
            employee.department === selectedDepartment;

        const matchesStatus =
            selectedStatus === "" ||
            employee.status === selectedStatus;

        const matchesSalaryRange =
            selectedSalaryRange === "" ||
            (selectedSalaryRange === "0-50000" && employee.salary <= 50000) ||
            (selectedSalaryRange === "50001-100000" && employee.salary > 50000 && employee.salary <= 100000);


        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus &&
            matchesSalaryRange
        );
    });

    // =========================================
    // SORT
    // =========================================

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortConfig.key) {
            return 0;
        }

        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        if (sortConfig.key === "joinDate") {
            valueA = new Date(valueA).getTime();
            valueB = new Date(valueB).getTime();
        } else if (sortConfig.key === "salary") {
            valueA = Number(valueA) || 0;
            valueB = Number(valueB) || 0;
        } else {
            valueA = String(valueA ?? "").toLowerCase();
            valueB = String(valueB ?? "").toLowerCase();
        }

        if (valueA < valueB) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }

        return 0;
    });

    // =========================================
    // PAGINATION CALCULATION
    // =========================================

    const totalPages = Math.ceil(
        sortedEmployees.length / employeesPerPage
    );

    const startIndex =
        (currentPage - 1) * employeesPerPage;

    const endIndex = startIndex + employeesPerPage;

    const currentEmployees = sortedEmployees.slice(
        startIndex,
        endIndex
    );

    // =========================================
    // PAGE SAFETY
    // =========================================

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }

        if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    // =========================================
    // SORT HANDLER
    // =========================================

    const handleSort = (key) => {
        setSortConfig((current) => ({
            key,
            direction:
                current.key === key &&
                    current.direction === "asc"
                    ? "desc"
                    : "asc",
        }));

        setCurrentPage(1);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <ArrowUpDown size={15} />;
        }

        return sortConfig.direction === "asc"
            ? <ArrowUp size={15} />
            : <ArrowDown size={15} />;
    };

    // =========================================
    // SEARCH / FILTER
    // =========================================

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setCurrentPage(1);
    };
    const handleSalaryRangeChange = (event) => {
        setSelectedSalaryRange(event.target.value);
        setCurrentPage(1);
    };


    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedDepartment("");
        setSelectedStatus("");
        setSelectedSalaryRange("");
        setCurrentPage(1);
    };

    // =========================================
    // SAVE EMPLOYEE
    // =========================================

    const handleSaveEmployee = async (formData) => {
        try {
            setIsActionLoading(true);
            setError("");

            if (selectedEmployee) {
                const updatedEmployee = {
                    name:
                        `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    phone: formData.phone,
                    department: formData.department,
                    position: formData.position,
                    status: formData.status,
                    joinDate: formData.joiningDate,
                    salary: formData.salary,
                    address: formData.address,
                };

                const savedEmployee = await updateEmployee(
                    selectedEmployee.id,
                    updatedEmployee
                );

                setEmployees((currentEmployees) =>
                    currentEmployees.map((employee) =>
                        employee.id === selectedEmployee.id
                            ? savedEmployee
                            : employee
                    )
                );
            } else {
                const newEmployee = {
                    name:
                        `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    phone: formData.phone,
                    department: formData.department,
                    position: formData.position,
                    status: formData.status,
                    joinDate: formData.joiningDate,
                    salary: formData.salary,
                    address: formData.address,
                };

                const savedEmployee = await addEmployee(newEmployee);

                setEmployees((currentEmployees) => [
                    ...currentEmployees,
                    savedEmployee,
                ]);
            }

            setIsModalOpen(false);
            setSelectedEmployee(null);
            setCurrentPage(1);
        } catch (saveError) {
            console.error("Error saving employee:", saveError);

            setError(
                selectedEmployee
                    ? "Unable to update employee. Please try again."
                    : "Unable to add employee. Please try again."
            );
        } finally {
            setIsActionLoading(false);
        }
    };

    // =========================================
    // ADD / EDIT
    // =========================================

    const handleAddClick = () => {
        setError("");
        setOpenActionMenuId(null);
        setSelectedEmployee(null);
        setIsModalOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setError("");
        setOpenActionMenuId(null);
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    // =========================================
    // DELETE
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

    const handleConfirmDelete = async () => {
        if (!employeeToDelete || isActionLoading) {
            return;
        }

        try {
            setIsActionLoading(true);
            setError("");

            await deleteEmployee(employeeToDelete.id);

            setEmployees((currentEmployees) =>
                currentEmployees.filter(
                    (employee) =>
                        employee.id !== employeeToDelete.id
                )
            );

            setIsDeleteDialogOpen(false);
            setEmployeeToDelete(null);

            setSelectedRowId((currentId) =>
                currentId === employeeToDelete.id
                    ? null
                    : currentId
            );
        } catch (deleteError) {
            console.error(
                "Error deleting employee:",
                deleteError
            );

            setError(
                "Unable to delete employee. Please try again."
            );
        } finally {
            setIsActionLoading(false);
        }
    };

    // =========================================
    // VIEW
    // =========================================

    const handleViewEmployee = (employee) => {
        setOpenActionMenuId(null);
        setViewEmployee(employee);
        setIsViewModalOpen(true);
    };

    // =========================================
    // MODAL CLOSE
    // =========================================

    const handleCloseModal = () => {
        if (isActionLoading) {
            return;
        }

        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setViewEmployee(null);
    };

    // =========================================
    // DATE FORMAT
    // =========================================

    const formatJoinDate = (date) => {
        if (!date) {
            return "-";
        }

        const dateOnly = date.split("T")[0];
        const parts = dateOnly.split("-");

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
            {/* HEADER */}

            <div className="employees-header">
                <div>
                    <h1>Employees</h1>
                    <p>
                        Manage and organize your
                        organization's employees.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="primary"
                    size="medium"
                    icon={<Plus size={18} />}
                    onClick={handleAddClick}
                >
                    Add Employee
                </Button>
            </div>

            {/* TOOLBAR */}

            <div className="employee-toolbar">
                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search employees..."
                />

                <Select
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    placeholder="All Departments"
                    options={[
                        { value: "IT", label: "IT" },
                        { value: "HR", label: "HR" },
                        { value: "Finance", label: "Finance" },
                        {
                            value: "Marketing",
                            label: "Marketing",
                        },
                        {
                            value: "Operations",
                            label: "Operations",
                        },
                    ]}
                />

                <Select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    placeholder="All Status"
                    options={[
                        {
                            value: "Active",
                            label: "Active",
                        },
                        {
                            value: "Inactive",
                            label: "Inactive",
                        },
                        {
                            value: "On Leave",
                            label: "On Leave",
                        },
                    ]}
                />
                <Select
                    value={selectedSalaryRange}
                    onChange={handleSalaryRangeChange}
                    placeholder="All Salary Ranges"
                    options={[
                        { value: "0-50000", label: "$0 - $50,000" },
                        { value: "50001-100000", label: "$50,001 - $100,000" },
                    ]}
                />
                <Button
                    type="button"
                    variant="secondary"
                    size="medium"
                    icon={<SlidersHorizontal size={16} />}
                    onClick={handleClearFilters}
                >
                    Clear Filters
                </Button>
            </div>

            {/* TABLE SECTION */}

            <section className="employee-table-section">
                <div className="table-header">
                    <div>
                        <h2>All Employees</h2>
                        <span>
                            {filteredEmployees.length} employees
                        </span>
                    </div>
                </div>

                {error && (
                    <div
                        className="employee-error"
                        role="alert"
                    >
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
                    hasActiveFilters={Boolean(
                        searchTerm ||
                        selectedDepartment ||
                        selectedStatus ||
                        selectedSalaryRange
                    )}
                />

                {/* PAGINATION MOLECULE */}

                <div className="employee-table-footer">
                    <span>
                        {filteredEmployees.length > 0
                            ? `Showing ${startIndex + 1}–${Math.min(
                                endIndex,
                                filteredEmployees.length
                            )} of ${filteredEmployees.length
                            } employees`
                            : "Showing 0 of 0 employees"}
                    </span>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>

            {/* ADD / EDIT MODAL */}

            <EmployeeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSaveEmployee}
                employee={selectedEmployee}
                isLoading={isActionLoading}
            />

            {/* DELETE CONFIRMATION */}

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

            {/* VIEW MODAL */}

            <ViewEmployeeModal
                isOpen={isViewModalOpen}
                onClose={handleCloseViewModal}
                employee={viewEmployee}
            />
        </div>
    );
}

export default Employees;
