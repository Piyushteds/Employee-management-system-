import {
    Eye,
    Mail,
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";

import "./ActionMenu.css";

function ActionMenu({
    employeeName = "employee",
    isOpen = false,
    isLoading = false,
    onToggle,
    onView,
    onEdit,
    onSendEmail,
    onDelete,
}) {
    return (
        <div
            className="action-menu-wrapper"
            onClick={(event) => event.stopPropagation()}
        >
            <button
                type="button"
                className="action-menu-trigger"
                title="More Actions"
                aria-label={`More actions for ${employeeName}`}
                aria-expanded={isOpen}
                onClick={(event) => {
                    event.stopPropagation();
                    onToggle?.();
                }}
            >
                <MoreVertical size={18} />
            </button>

            {isOpen && (
                <div
                    className="action-menu"
                    role="menu"
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        className="action-menu-item"
                        role="menuitem"
                        onClick={onView}
                    >
                        <Eye size={16} />
                        <span>View Employee</span>
                    </button>

                    <button
                        type="button"
                        className="action-menu-item"
                        role="menuitem"
                        disabled={isLoading}
                        onClick={onEdit}
                    >
                        <Pencil size={16} />
                        <span>Edit Employee</span>
                    </button>

                    <button
                        type="button"
                        className="action-menu-item"
                        role="menuitem"
                        disabled={isLoading}
                        onClick={onSendEmail}
                    >
                        <Mail size={16} />
                        <span>Send Email</span>
                    </button>

                    <button
                        type="button"
                        className="action-menu-item action-menu-delete"
                        role="menuitem"
                        disabled={isLoading}
                        onClick={onDelete}
                    >
                        <Trash2 size={16} />
                        <span>Delete Employee</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ActionMenu;
