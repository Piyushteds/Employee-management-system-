import { Users } from "lucide-react";

import Avatar from "../../atoms/Avatar/Avatar";
import Badge from "../../atoms/Badge/Badge";
import ActionMenu from "../../molecules/ActionMenu/ActionMenu";

import "./EmployeeTable.css";

function EmployeeTable({
    employees = [],
    isLoading = false,
    selectedRowId,
    openActionMenuId,
    isActionLoading = false,
    sortConfig,
    onRowSelect,
    onSort,
    getSortIcon,
    onToggleActionMenu,
    onView,
    onEdit,
    onSendEmail,
    onDelete,
    formatJoinDate,
    onClearFilters,
    hasActiveFilters = false,
}) {
    const getStatusVariant = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "success";

            case "inactive":
                return "danger";

            case "on leave":
                return "warning";

            default:
                return "default";
        }
    };

    return (
        <div className="employee-table-wrapper">
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>
                            <button
                                type="button"
                                className="employee-sort-button"
                                onClick={() => onSort("name")}
                            >
                                Employee
                                {getSortIcon("name")}
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="employee-sort-button"
                                onClick={() => onSort("department")}
                            >
                                Department
                                {getSortIcon("department")}
                            </button>
                        </th>

                        <th>Position</th>

                        <th>
                            <button
                                type="button"
                                className="employee-sort-button"
                                onClick={() => onSort("joinDate")}
                            >
                                Join Date
                                {getSortIcon("joinDate")}
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="employee-sort-button"
                                onClick={() => onSort("status")}
                            >
                                Status
                                {getSortIcon("status")}
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="employee-sort-button"
                                onClick={() => onSort("salary")}
                            >
                                Salary
                                {getSortIcon("salary")}
                            </button>
                        </th>

                        <th>Address</th>

                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {/* =========================================
                        LOADING / SKELETON
                    ========================================= */}

                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <tr
                                key={`skeleton-${index}`}
                                className="employee-skeleton-row"
                            >
                                <td>
                                    <div className="employee-info">
                                        <span className="skeleton-avatar" />

                                        <div className="skeleton-employee-text">
                                            <span className="skeleton-line skeleton-name" />
                                            <span className="skeleton-line skeleton-email" />
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <span className="skeleton-line skeleton-department" />
                                </td>

                                <td>
                                    <span className="skeleton-line skeleton-position" />
                                </td>

                                <td>
                                    <span className="skeleton-line skeleton-date" />
                                </td>

                                <td>
                                    <span className="skeleton-line skeleton-status" />
                                </td>

                                <td>
                                    <span className="skeleton-line skeleton-salary" />
                                </td>

                                <td>
                                    <span className="skeleton-line skeleton-address" />
                                </td>

                                <td>
                                    <span className="skeleton-action" />
                                </td>
                            </tr>
                        ))
                    ) : employees.length > 0 ? (
                        /* =========================================
                           EMPLOYEE ROWS
                        ========================================= */

                        employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className={
                                    selectedRowId === employee.id
                                        ? "employee-row employee-row-selected"
                                        : "employee-row"
                                }
                                onClick={() => onRowSelect(employee.id)}
                            >
                                {/* EMPLOYEE */}

                                <td>
                                    <div className="employee-info">
                                        <Avatar
                                            name={employee.name}
                                            size="medium"
                                        />

                                        <div className="employee-text">
                                            <strong>
                                                {employee.name}
                                            </strong>

                                            <span>
                                                {employee.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* DEPARTMENT */}

                                <td>
                                    <span className="department-name">
                                        {employee.department}
                                    </span>
                                </td>

                                {/* POSITION */}

                                <td>
                                    <span className="position-name">
                                        {employee.position}
                                    </span>
                                </td>

                                {/* JOIN DATE */}

                                <td>
                                    <span className="join-date">
                                        {formatJoinDate(
                                            employee.joinDate
                                        )}
                                    </span>
                                </td>

                                {/* STATUS */}

                                <td>
                                    <Badge
                                        variant={getStatusVariant(
                                            employee.status
                                        )}
                                    >
                                        {employee.status}
                                    </Badge>
                                </td>

                                {/* SALARY */}

                                <td>
                                    <span className="salary-name">
                                        ${employee.salary}
                                    </span>
                                </td>

                                {/* ADDRESS */}

                                <td>
                                    <span className="address-name">
                                        {employee.address}
                                    </span>
                                </td>

                                {/* ACTION MENU */}

                                <td>
                                    <ActionMenu
                                        employeeName={employee.name}
                                        isOpen={
                                            openActionMenuId ===
                                            employee.id
                                        }
                                        isLoading={isActionLoading}
                                        onToggle={() =>
                                            onToggleActionMenu(
                                                employee.id
                                            )
                                        }
                                        onView={() =>
                                            onView(employee)
                                        }
                                        onEdit={() =>
                                            onEdit(employee)
                                        }
                                        onSendEmail={() =>
                                            onSendEmail(employee)
                                        }
                                        onDelete={() =>
                                            onDelete(employee.id)
                                        }
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        /* =========================================
                           EMPTY STATE
                        ========================================= */

                        <tr className="employee-empty-row">
                            <td colSpan="8">
                                <div className="employee-empty-state">
                                    <div className="employee-empty-icon">
                                        <Users size={28} />
                                    </div>

                                    <h3>
                                        No employees found
                                    </h3>

                                    <p>
                                        We couldn't find any
                                        employees matching
                                        your current search
                                        or filters.
                                    </p>

                                    {hasActiveFilters && (
                                        <button
                                            type="button"
                                            className="empty-clear-button"
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

export default EmployeeTable;