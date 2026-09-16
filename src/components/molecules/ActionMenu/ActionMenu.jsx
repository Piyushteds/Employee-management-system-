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
    entityName,
    isOpen = false,
    isLoading = false,
    onToggle,
    onView,
    onEdit,
    onSendEmail,
    onDelete,
    showEmail = true,
}) {
    const name = entityName || "Employee";

    return (
        <div
            className="action-menu-wrapper"
            onClick={(event) => event.stopPropagation()}
        >
            {/* MORE BUTTON */}
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

            {/* MENU */}
            {isOpen && (
                <div
                    className="action-menu"
                    role="menu"
                    onClick={(event) => event.stopPropagation()}
                >
                    {/* VIEW */}
                    <button
                        type="button"
                        className="action-menu-item"
                        role="menuitem"
                        onClick={onView}
                    >
                        <Eye size={16} />

                        <span>
                            View {name}
                        </span>
                    </button>

                    {/* EDIT */}
                    <button
                        type="button"
                        className="action-menu-item"
                        role="menuitem"
                        disabled={isLoading}
                        onClick={onEdit}
                    >
                        <Pencil size={16} />

                        <span>
                            Edit {name}
                        </span>
                    </button>

                    {/* EMAIL */}
                    {showEmail && (
                        <button
                            type="button"
                            className="action-menu-item"
                            role="menuitem"
                            disabled={isLoading}
                            onClick={onSendEmail}
                        >
                            <Mail size={16} />

                            <span>
                                Send Email
                            </span>
                        </button>
                    )}

                    {/* DELETE */}
                    <button
                        type="button"
                        className="action-menu-item action-menu-delete"
                        role="menuitem"
                        disabled={isLoading}
                        onClick={onDelete}
                    >
                        <Trash2 size={16} />

                        <span>
                            Delete {name}
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ActionMenu;