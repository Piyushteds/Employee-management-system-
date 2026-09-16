import {
    useEffect,
    useState,
} from "react";

import {
    Plus,
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";


import DepartmentSearch
    from "../../components/molecules/DepartmentSearch/DepartmentSearch";

import DepartmentTable
    from "../../components/organisms/DepartmentTable/DepartmentTable";

import DepartmentModal
    from "../../components/organisms/DepartmentModal/DepartmentModal";

import ViewDepartmentModal
    from "../../components/organisms/ViewDepartmentModal/ViewDepartmentModal";

import ConfirmDialog
    from "../../components/organisms/ConfirmDialog/ConfirmDialog";


import useDebounce
    from "../../hooks/useDebounce";


import {
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
} from "../../services/departmentService";


import "./Departments.css";


function Departments() {

    /* =========================================
       DATA
    ========================================= */

    const [departments, setDepartments] =
        useState([]);


    /* =========================================
       LOADING
    ========================================= */

    const [isLoading, setIsLoading] =
        useState(true);

    const [isActionLoading, setIsActionLoading] =
        useState(false);

    /* =========================================
       ERROR
    ========================================= */

    const [error, setError] =
        useState("");


    /* =========================================
       SEARCH
    ========================================= */

    const [searchTerm, setSearchTerm] =
        useState("");

    const debouncedSearchTerm =
        useDebounce(
            searchTerm,
            300
        );


    /* =========================================
       ROW
    ========================================= */

    const [selectedRowId, setSelectedRowId] =
        useState(null);


    /* =========================================
       ACTION MENU
    ========================================= */

    const [openActionMenuId, setOpenActionMenuId] =
        useState(null);


    /* =========================================
       SORT
    ========================================= */

    const [sortConfig, setSortConfig] =
        useState({
            key: null,
            direction: "asc",
        });


    /* =========================================
       ADD / EDIT
    ========================================= */

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [selectedDepartment, setSelectedDepartment] =
        useState(null);


    /* =========================================
       VIEW
    ========================================= */

    const [isViewModalOpen, setIsViewModalOpen] =
        useState(false);

    const [viewDepartment, setViewDepartment] =
        useState(null);


    /* =========================================
       DELETE
    ========================================= */

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
        useState(false);

    const [departmentToDelete, setDepartmentToDelete] =
        useState(null);


    /* =========================================
       PAGINATION
    ========================================= */

    const [currentPage, setCurrentPage] =
        useState(1);

    const departmentsPerPage = 5;


    /* =========================================
       LOAD DATA
    ========================================= */

    useEffect(() => {

        const loadDepartments =
            async () => {

                try {

                    setIsLoading(true);

                    setError("");

                    const data =
                        await getDepartments();

                    setDepartments(
                        Array.isArray(data)
                            ? data
                            : []
                    );

                } catch (loadError) {

                    console.error(
                        "Error loading departments:",
                        loadError
                    );

                    setError(
                        "Unable to load departments. Please try again."
                    );

                } finally {

                    setIsLoading(false);

                }

            };


        loadDepartments();

    }, []);


    /* =========================================
       FILTER
    ========================================= */

    const filteredDepartments =
        departments.filter(
            (department) => {

                const search =
                    debouncedSearchTerm
                        .trim()
                        .toLowerCase();


                return (

                    department.departmentcode
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    department.discription
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    department.employee
                        ?.toLowerCase()
                        .includes(search)

                );

            }
        );


    /* =========================================
       SORT
    ========================================= */

    const sortedDepartments =
        [...filteredDepartments].sort(
            (a, b) => {

                if (!sortConfig.key) {
                    return 0;
                }


                let valueA =
                    a[sortConfig.key];

                let valueB =
                    b[sortConfig.key];


                valueA =
                    String(
                        valueA ?? ""
                    ).toLowerCase();


                valueB =
                    String(
                        valueB ?? ""
                    ).toLowerCase();


                if (valueA < valueB) {

                    return sortConfig.direction ===
                        "asc"
                        ? -1
                        : 1;

                }


                if (valueA > valueB) {

                    return sortConfig.direction ===
                        "asc"
                        ? 1
                        : -1;

                }


                return 0;

            }
        );


    /* =========================================
       PAGINATION
    ========================================= */

    const totalPages =
        Math.ceil(
            sortedDepartments.length /
            departmentsPerPage
        );


    const startIndex =
        (currentPage - 1) *
        departmentsPerPage;


    const endIndex =
        startIndex +
        departmentsPerPage;


    const currentDepartments =
        sortedDepartments.slice(
            startIndex,
            endIndex
        );


    /* =========================================
       PAGE SAFETY
    ========================================= */

    useEffect(() => {

        if (
            totalPages > 0 &&
            currentPage > totalPages
        ) {

            setCurrentPage(
                totalPages
            );

        }


        if (totalPages === 0) {

            setCurrentPage(1);

        }

    }, [
        currentPage,
        totalPages,
    ]);


    /* =========================================
       SORT
    ========================================= */

    const handleSort = (key) => {

        setSortConfig(
            (current) => ({

                key,

                direction:
                    current.key === key &&
                        current.direction === "asc"
                        ? "desc"
                        : "asc",

            })
        );

        setCurrentPage(1);

    };


    const getSortIcon = (key) => {

        if (
            sortConfig.key !== key
        ) {

            return (
                <ArrowUpDown size={15} />
            );

        }


        return sortConfig.direction ===
            "asc"
            ? (
                <ArrowUp size={15} />
            )
            : (
                <ArrowDown size={15} />
            );

    };


    /* =========================================
       SEARCH
    ========================================= */

    const handleSearchChange =
        (event) => {

            setSearchTerm(
                event.target.value
            );

            setCurrentPage(1);

        };


    /* =========================================
       CLEAR
    ========================================= */

    const handleClearFilters = () => {

        setSearchTerm("");

        setCurrentPage(1);

    };


    /* =========================================
       ACTION MENU
    ========================================= */

    const handleToggleActionMenu =
        (id) => {

            setSelectedRowId(id);

            setOpenActionMenuId(
                (currentId) =>
                    currentId === id
                        ? null
                        : id
            );

        };


    /* =========================================
       ADD
    ========================================= */

    const handleAddDepartment =
        () => {

            setError("");

            setSelectedDepartment(
                null
            );

            setOpenActionMenuId(
                null
            );

            setIsModalOpen(
                true
            );

        };


    /* =========================================
       EDIT
    ========================================= */

    const handleEditDepartment =
        (department) => {

            console.log(
                "Editing department:",
                department
            );

            setError("");

            setOpenActionMenuId(
                null
            );

            setSelectedDepartment(
                department
            );

            setIsModalOpen(
                true
            );

        };


    /* =========================================
       VIEW
    ========================================= */

    const handleViewDepartment =
        (department) => {

            setOpenActionMenuId(
                null
            );

            setViewDepartment(
                department
            );

            setIsViewModalOpen(
                true
            );

        };


    /* =========================================
       DELETE OPEN
    ========================================= */

    const handleDeleteDepartment =
        (department) => {

            if (isActionLoading) {
                return;
            }


            setOpenActionMenuId(
                null
            );

            setDepartmentToDelete(
                department
            );

            setIsDeleteDialogOpen(
                true
            );

        };



    /* =========================================
       SAVE / UPDATE
    ========================================= */

    const handleSaveDepartment = async (formData) => {

        try {

            setIsActionLoading(true);

            setError("");


            /* =====================================
               UPDATE
            ===================================== */

            if (selectedDepartment) {

                const updatedDepartment = {

                    id:
                        selectedDepartment.id,

                    departmentcode:
                        formData.departmentcode.trim(),

                    // IMPORTANT:
                    // Backend property is "discription"
                    discription:
                        formData.discription.trim(),

                    employee:
                        formData.employee.trim(),

                };


                console.log(
                    "UPDATE Department Payload:",
                    updatedDepartment
                );


                const savedDepartment =
                    await updateDepartment(
                        updatedDepartment
                    );


                setDepartments(
                    (currentDepartments) =>
                        currentDepartments.map(
                            (department) =>
                                department.id ===
                                    selectedDepartment.id
                                    ? savedDepartment
                                    : department
                        )
                );

            }


            /* =====================================
               CREATE
            ===================================== */

            else {

                const newDepartment = {

                    departmentcode:
                        formData.departmentcode.trim(),

                    // IMPORTANT:
                    // Backend property is "discription"
                    discription:
                        formData.discription.trim(),

                    employee:
                        formData.employee.trim(),

                };


                console.log(
                    "CREATE Department Payload:",
                    newDepartment
                );


                const savedDepartment =
                    await addDepartment(
                        newDepartment
                    );


                console.log(
                    "CREATE Department Response:",
                    savedDepartment
                );


                setDepartments(
                    (currentDepartments) => [

                        ...currentDepartments,

                        savedDepartment,

                    ]
                );

            }


            /* =====================================
               CLOSE MODAL
            ===================================== */

            setIsModalOpen(false);

            setSelectedDepartment(null);

            setCurrentPage(1);


        } catch (saveError) {

            console.error(
                "Error saving department:",
                saveError
            );


            console.error(
                "Backend response:",
                saveError.response?.data
            );


            setError(
                selectedDepartment
                    ? "Unable to update department. Please try again."
                    : "Unable to add department. Please try again."
            );


        } finally {

            setIsActionLoading(false);

        }

    };

    /* =========================================
   CLOSE ADD / EDIT MODAL
========================================= */

    const handleCloseModal = () => {

        if (isActionLoading) {
            return;
        }

        setIsModalOpen(false);

        setSelectedDepartment(null);

    };

    /* =========================================
       CLOSE VIEW MODAL
    ========================================= */

    const handleCloseViewModal = () => {

        setIsViewModalOpen(false);

        setViewDepartment(null);

    };


    /* =========================================
       CONFIRM DELETE
    ========================================= */

    const handleConfirmDelete =
        async () => {

            if (
                !departmentToDelete ||
                isActionLoading
            ) {

                return;

            }


            try {

                setIsActionLoading(
                    true
                );

                setError("");


                await deleteDepartment(
                    departmentToDelete.id
                );


                setDepartments(
                    (currentDepartments) =>
                        currentDepartments.filter(
                            (department) =>
                                department.id !==
                                departmentToDelete.id
                        )
                );


                setIsDeleteDialogOpen(
                    false
                );

                setDepartmentToDelete(
                    null
                );


            } catch (deleteError) {

                console.error(
                    "Error deleting department:",
                    deleteError
                );

                setError(
                    "Unable to delete department. Please try again."
                );

            } finally {

                setIsActionLoading(
                    false
                );

            }

        };


    /* =========================================
       CANCEL DELETE
    ========================================= */

    const handleCancelDelete =
        () => {

            if (isActionLoading) {
                return;
            }


            setIsDeleteDialogOpen(
                false
            );

            setDepartmentToDelete(
                null
            );

        };


    /* =========================================
       PAGINATION
    ========================================= */

    const handlePreviousPage =
        () => {

            if (currentPage > 1) {

                setCurrentPage(
                    currentPage - 1
                );

            }

        };


    const handleNextPage =
        () => {

            if (
                currentPage <
                totalPages
            ) {

                setCurrentPage(
                    currentPage + 1
                );

            }

        };


    const handlePageChange =
        (pageNumber) => {

            setCurrentPage(
                pageNumber
            );

        };


    /* =========================================
       PAGE NUMBERS
    ========================================= */

    const getPageNumbers = () => {

        if (totalPages <= 5) {

            return Array.from(
                {
                    length: totalPages,
                },
                (_, index) =>
                    index + 1
            );

        }


        if (currentPage <= 3) {

            return [
                1,
                2,
                3,
                "...",
                totalPages,
            ];

        }


        if (
            currentPage >=
            totalPages - 2
        ) {

            return [
                1,
                "...",
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];

        }


        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];

    };


    const pageNumbers =
        getPageNumbers();


    const hasActiveFilters =
        Boolean(
            searchTerm.trim()
        );


    /* =========================================
       RENDER
    ========================================= */

    return (

        <div className="departments-page">

            {/* =================================
                HEADER
            ================================= */}

            <div className="departments-header">

                <div>

                    <h1>
                        Departments
                    </h1>

                    <p>
                        Manage and organize your
                        organization's departments.
                    </p>

                </div>


                <button
                    type="button"
                    className="add-department-button"
                    onClick={
                        handleAddDepartment
                    }
                >

                    <Plus size={18} />

                    <span>
                        Add Department
                    </span>

                </button>

            </div>


            {/* =================================
                SEARCH
            ================================= */}

            <DepartmentSearch

                searchTerm={
                    searchTerm
                }

                onSearchChange={
                    handleSearchChange
                }

                onClearFilters={
                    handleClearFilters
                }

                hasActiveFilters={
                    hasActiveFilters
                }

            />


            {/* =================================
                TABLE CARD
            ================================= */}

            <div className="department-table-card">

                {/* HEADER */}

                <div className="table-header">

                    <div>

                        <h2>
                            All Departments
                        </h2>

                        <span>

                            {
                                filteredDepartments.length
                            }

                            {" "}

                            departments

                        </span>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="department-error">

                        {error}

                    </div>

                )}


                {/* TABLE */}

                <DepartmentTable

                    departments={
                        currentDepartments
                    }

                    isLoading={
                        isLoading
                    }

                    selectedRowId={
                        selectedRowId
                    }

                    openActionMenuId={
                        openActionMenuId
                    }

                    isActionLoading={
                        isActionLoading
                    }

                    sortConfig={
                        sortConfig
                    }

                    onRowSelect={
                        setSelectedRowId
                    }

                    onSort={
                        handleSort
                    }

                    getSortIcon={
                        getSortIcon
                    }

                    onToggleActionMenu={
                        handleToggleActionMenu
                    }

                    onView={
                        handleViewDepartment
                    }

                    onEdit={
                        handleEditDepartment
                    }

                    onDelete={
                        handleDeleteDepartment
                    }

                    onClearFilters={
                        handleClearFilters
                    }

                    hasActiveFilters={
                        hasActiveFilters
                    }

                />


                {/* =================================
                    PAGINATION
                ================================= */}

                <div className="pagination">

                    <span>

                        {
                            filteredDepartments.length >
                                0

                                ? `Showing ${startIndex + 1
                                }–${Math.min(
                                    endIndex,
                                    filteredDepartments.length
                                )
                                } of ${filteredDepartments.length
                                } departments`

                                : "Showing 0 of 0 departments"
                        }

                    </span>


                    <div className="pagination-buttons">

                        {/* FIRST */}

                        <button
                            type="button"
                            disabled={
                                currentPage === 1 ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={() =>
                                handlePageChange(1)
                            }
                        >

                            <ChevronsLeft
                                size={16}
                            />

                        </button>


                        {/* PREVIOUS */}

                        <button
                            type="button"
                            disabled={
                                currentPage === 1 ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={
                                handlePreviousPage
                            }
                        >

                            <ChevronLeft
                                size={16}
                            />

                        </button>


                        {/* NUMBERS */}

                        {pageNumbers.map(
                            (
                                pageNumber,
                                index
                            ) =>

                                pageNumber ===
                                    "..." ? (

                                    <span
                                        key={
                                            `ellipsis-${index}`
                                        }
                                        className="pagination-ellipsis"
                                    >
                                        ...
                                    </span>

                                ) : (

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
                                        disabled={
                                            isLoading
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
                        )}


                        {/* NEXT */}

                        <button
                            type="button"
                            disabled={
                                currentPage ===
                                totalPages ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={
                                handleNextPage
                            }
                        >

                            <ChevronRight
                                size={16}
                            />

                        </button>


                        {/* LAST */}

                        <button
                            type="button"
                            disabled={
                                currentPage ===
                                totalPages ||
                                totalPages === 0 ||
                                isLoading
                            }
                            onClick={() =>
                                handlePageChange(
                                    totalPages
                                )
                            }
                        >

                            <ChevronsRight
                                size={16}
                            />

                        </button>

                    </div>

                </div>

            </div>


            {/* =================================
                ADD / EDIT MODAL
            ================================= */}

            <DepartmentModal

                isOpen={
                    isModalOpen
                }

                department={
                    selectedDepartment
                }

                isLoading={
                    isActionLoading
                }

                onClose={
                    handleCloseModal
                }

                onSave={
                    handleSaveDepartment
                }

            />


            {/* =================================
                VIEW MODAL
            ================================= */}

            <ViewDepartmentModal

                isOpen={
                    isViewModalOpen
                }

                department={
                    viewDepartment
                }

                onClose={
                    handleCloseViewModal
                }

            />


            {/* =================================
                DELETE DIALOG
            ================================= */}

            <ConfirmDialog

                isOpen={
                    isDeleteDialogOpen
                }

                onClose={
                    handleCancelDelete
                }

                onConfirm={
                    handleConfirmDelete
                }

                title="Delete Department"

                message={
                    `Are you sure you want to delete "${departmentToDelete?.departmentcode || "this department"}"?`
                }

                confirmText="Delete Department"

                cancelText="Cancel"

                isLoading={
                    isActionLoading
                }

            />

        </div>
    );
}


export default Departments;