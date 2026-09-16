import {
    Building2,
} from "lucide-react";

import ActionMenu
    from "../../molecules/ActionMenu/ActionMenu";

import "./DepartmentTable.css";


function DepartmentTable({
    departments = [],

    isLoading = false,

    selectedRowId = null,

    openActionMenuId = null,

    isActionLoading = false,

    onRowSelect,

    onSort,

    getSortIcon,

    onToggleActionMenu,

    onView,

    onEdit,

    onDelete,

    onClearFilters,

    hasActiveFilters = false,
}) {

    return (

        <div className="department-table-wrapper">

            <table className="department-table">

                {/* =========================================
                    TABLE HEADER
                ========================================= */}

                <thead>

                    <tr>

                        {/* DEPARTMENT CODE */}

                        <th>

                            <button
                                type="button"
                                className="department-sort-button"
                                onClick={() =>
                                    onSort(
                                        "departmentcode"
                                    )
                                }
                            >

                                <span>
                                    Department Code
                                </span>

                                {getSortIcon(
                                    "departmentcode"
                                )}

                            </button>

                        </th>


                        {/* discription */}

                        <th>

                            <button
                                type="button"
                                className="department-sort-button"
                                onClick={() =>
                                    onSort(
                                        "discription"
                                    )
                                }
                            >

                                <span>
                                    discription
                                </span>

                                {getSortIcon(
                                    "discription"
                                )}

                            </button>

                        </th>


                        {/* EMPLOYEE */}

                        <th>

                            <button
                                type="button"
                                className="department-sort-button"
                                onClick={() =>
                                    onSort(
                                        "employee"
                                    )
                                }
                            >

                                <span>
                                    Employee
                                </span>

                                {getSortIcon(
                                    "employee"
                                )}

                            </button>

                        </th>


                        {/* ACTIONS */}

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                {/* =========================================
                    TABLE BODY
                ========================================= */}

                <tbody>

                    {/* =====================================
                        LOADING
                    ===================================== */}

                    {isLoading ? (

                        Array.from({
                            length: 5,
                        }).map(
                            (_, index) => (

                                <tr
                                    key={
                                        `department-skeleton-${index}`
                                    }
                                    className="department-skeleton-row"
                                >

                                    <td>
                                        <span className="department-skeleton-line department-code-skeleton" />
                                    </td>

                                    <td>
                                        <span className="department-skeleton-line department-discription-skeleton" />
                                    </td>

                                    <td>
                                        <span className="department-skeleton-line department-employee-skeleton" />
                                    </td>

                                    <td>
                                        <span className="department-skeleton-action" />
                                    </td>

                                </tr>

                            )
                        )

                    ) : departments.length > 0 ? (

                        /* =================================
                           DEPARTMENT ROWS
                        ================================= */

                        departments.map(
                            (department) => (

                                <tr
                                    key={
                                        department.id
                                    }

                                    className={
                                        selectedRowId ===
                                            department.id
                                            ? "department-row department-row-selected"
                                            : "department-row"
                                    }

                                    onClick={() =>
                                        onRowSelect?.(
                                            department.id
                                        )
                                    }
                                >

                                    {/* =================================
                                        DEPARTMENT CODE
                                    ================================= */}

                                    <td>

                                        <span className="department-code">

                                            {
                                                department.departmentcode
                                            }

                                        </span>

                                    </td>


                                    {/* =================================
                                        discription

                                        IMPORTANT:
                                        Backend field = discription
                                    ================================= */}

                                    <td>

                                        <span className="department-discription">

                                            {
                                                department.discription
                                            }

                                        </span>

                                    </td>


                                    {/* =================================
                                        EMPLOYEE
                                    ================================= */}

                                    <td>

                                        <span className="department-employee">

                                            {
                                                department.employee
                                            }

                                        </span>

                                    </td>


                                    {/* =================================
                                        ACTIONS
                                    ================================= */}

                                    <td>

                                        <ActionMenu

                                            employeeName={
                                                department.departmentcode ||
                                                "department"
                                            }

                                            isOpen={
                                                openActionMenuId ===
                                                department.id
                                            }

                                            isLoading={
                                                isActionLoading
                                            }

                                            onToggle={() =>
                                                onToggleActionMenu(
                                                    department.id
                                                )
                                            }

                                            onView={() =>
                                                onView(
                                                    department
                                                )
                                            }

                                            onEdit={() =>
                                                onEdit(
                                                    department
                                                )
                                            }

                                            onDelete={() =>
                                                onDelete(
                                                    department
                                                )
                                            }

                                        />

                                    </td>

                                </tr>

                            )

                        )

                    ) : (

                        /* =================================
                           EMPTY STATE
                        ================================= */

                        <tr>

                            <td
                                colSpan="4"
                            >

                                <div className="department-empty-state">

                                    <div className="department-empty-icon">

                                        <Building2
                                            size={28}
                                        />

                                    </div>


                                    <h3>
                                        No departments found
                                    </h3>


                                    <p>
                                        We couldn't find any
                                        departments matching
                                        your current search.
                                    </p>


                                    {hasActiveFilters && (

                                        <button
                                            type="button"
                                            className="department-empty-clear-button"
                                            onClick={
                                                onClearFilters
                                            }
                                        >
                                            Clear Filters
                                        </button>

                                    )}

                                </div>

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );
}


export default DepartmentTable;