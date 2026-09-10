import { AlertTriangle, X, Trash2 } from "lucide-react";
import "./ConfirmDialog.css";

function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    employeeName,
    isLoading = false,
}) {
    if (!isOpen) {
        return null;
    }

    const handleConfirm = () => {
        if (isLoading) return;

        onConfirm();
    };

    return (
        <div className="confirm-overlay">
            <div className="confirm-dialog">

                {/* Close Button */}
                <button
                    type="button"
                    className="confirm-close"
                    onClick={onClose}
                    disabled={isLoading}
                    aria-label="Close dialog"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="confirm-icon">
                    <AlertTriangle size={26} />
                </div>

                {/* Content */}
                <div className="confirm-content">

                    <h2>Delete Employee</h2>

                    <p>
                        Are you sure you want to delete
                        <strong> {employeeName}</strong>?
                    </p>

                    <span>
                        This action cannot be undone.
                    </span>

                </div>

                {/* Actions */}
                <div className="confirm-actions">

                    <button
                        type="button"
                        className="confirm-cancel"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="confirm-delete"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="confirm-spinner"></span>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={17} />
                                Delete Employee
                            </>
                        )}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ConfirmDialog;