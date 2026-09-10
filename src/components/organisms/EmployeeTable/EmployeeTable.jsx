import {
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
    Eye,
    Mail,
    MoreVertical,
    Pencil,
    Trash2,
    Users,
} from "lucide-react";

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
    const renderSortIcon = (key) => {
        if (typeof getSortIcon === "function") {
            return getSortIcon(key);
        }

        if (sortConfig?.key !== key) {
            return <ArrowUpDown size={15} />;
        }

        return sortConfig.direction === "asc"
            ? <ArrowUp size={15} />
            : <ArrowDown size={15} />;
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
                                {renderSortIcon("name")}
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="employee-sort-button"
                                onClick={() => onSort("department")}
                            >
                                Department
                                {renderSortIcon("department")}
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
                                {renderSortIcon("joinDate")}
                            </button>
                        </th>

                        <th>
                            <button
                                type="button"
                                className="employee-sort-button"
                                onClick={() => onSort("status")}
                            >
                                Status
                                {renderSortIcon("status")}
                            </button>
                        </th>

                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <tr
                                key={`skeleton-${index}`}
                                className="employee-skeleton-row"
                            >
                                <td>
                                    <div className="employee-info">
                                        <div className="skeleton-avatar" />

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
                                    <span className="skeleton-action" />
                                </td>
                            </tr>
                        ))
                    ) : employees.length > 0 ? (
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
                                <td>
                                    <div className="employee-info">
                                        <div className="employee-avatar">
                                            {employee.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <strong>{employee.name}</strong>
                                            <span>{employee.email}</span>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <span className="department-name">
                                        {employee.department}
                                    </span>
                                </td>

                                <td>
                                    <span className="position-name">
                                        {employee.position}
                                    </span>
                                </td>

                                <td>
                                    <span className="join-date">
                                        {formatJoinDate(employee.joinDate)}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`status-badge ${employee.status
                                            ?.toLowerCase()
                                            .replace(/\s+/g, "-")}`}
                                    >
                                        <span className="status-dot" />
                                        {employee.status}
                                    </span>
                                </td>

                                <td>
                                    <div
                                        className="employee-actions"
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    >
                                        <button
                                            type="button"
                                            className="employee-more-button"
                                            title="More Actions"
                                            aria-label={`More actions for ${employee.name}`}
                                            aria-expanded={
                                                openActionMenuId ===
                                                employee.id
                                            }
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onToggleActionMenu(
                                                    employee.id
                                                );
                                            }}
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {openActionMenuId === employee.id && (
                                            <div
                                                className="employee-action-menu"
                                                onClick={(event) =>
                                                    event.stopPropagation()
                                                }
                                            >
                                                <button
                                                    type="button"
                                                    className="employee-menu-item"
                                                    onClick={() =>
                                                        onView(employee)
                                                    }
                                                >
                                                    <Eye size={16} />
                                                    <span>
                                                        View Employee
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="employee-menu-item"
                                                    disabled={isActionLoading}
                                                    onClick={() =>
                                                        onEdit(employee)
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                    <span>
                                                        Edit Employee
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="employee-menu-item"
                                                    disabled={isActionLoading}
                                                    onClick={() =>
                                                        onSendEmail(employee)
                                                    }
                                                >
                                                    <Mail size={16} />
                                                    <span>
                                                        Send Email
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="employee-menu-item employee-menu-delete"
                                                    disabled={isActionLoading}
                                                    onClick={() =>
                                                        onDelete(employee.id)
                                                    }
                                                >
                                                    <Trash2 size={16} />
                                                    <span>
                                                        Delete Employee
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="employee-empty-row">
                            <td colSpan="6">
                                <div className="employee-empty-state">
                                    <div className="employee-empty-icon">
                                        <Users size={28} />
                                    </div>

                                    <h3>No employees found</h3>

                                    <p>
                                        We couldn't find any employees
                                        matching your current search or
                                        filters.
                                    </p>

                                    {hasActiveFilters && (
                                        <button
                                            type="button"
                                            className="empty-clear-button"
                                            onClick={onClearFilters}
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
