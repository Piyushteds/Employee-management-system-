import {
    AlertTriangle,
    X,
    Trash2,
} from "lucide-react";

import "./ConfirmDialog.css";


function ConfirmDialog({
    isOpen,

    // Existing Employee prop
    onClose,

    // New generic cancel prop
    onCancel,

    onConfirm,

    // Existing Employee prop
    employeeName,

    // Generic entity support
    entityName,

    title,
    message,

    confirmText,
    cancelText,

    isLoading = false,
}) {

    if (!isOpen) {
        return null;
    }


    /* =========================================
       CLOSE / CANCEL HANDLER
    ========================================= */

    const handleClose = () => {

        if (isLoading) {
            return;
        }

        if (onClose) {
            onClose();
            return;
        }

        if (onCancel) {
            onCancel();
        }
    };


    /* =========================================
       CONFIRM HANDLER
    ========================================= */

    const handleConfirm = () => {

        if (isLoading) {
            return;
        }

        onConfirm?.();
    };


    /* =========================================
       DEFAULT VALUES
    ========================================= */

    const finalTitle =
        title ||
        "Delete Employee";


    const finalMessage =
        message ||
        `Are you sure you want to delete ${employeeName || "this employee"}?`;


    const finalConfirmText =
        confirmText ||
        `Delete ${employeeName || "Employee"}`;


    const finalCancelText =
        cancelText ||
        "Cancel";


    return (

        <div
            className="confirm-overlay"
            onMouseDown={handleClose}
        >

            <div
                className="confirm-dialog"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================
                    CLOSE BUTTON
                ================================= */}

                <button
                    type="button"
                    className="confirm-close"
                    onClick={handleClose}
                    disabled={isLoading}
                    aria-label="Close dialog"
                >
                    <X size={20} />
                </button>


                {/* =================================
                    ICON
                ================================= */}

                <div className="confirm-icon">

                    <AlertTriangle size={26} />

                </div>


                {/* =================================
                    CONTENT
                ================================= */}

                <div className="confirm-content">

                    <h2>
                        {finalTitle}
                    </h2>


                    <p>
                        {finalMessage}
                    </p>


                    <span>
                        This action cannot be undone.
                    </span>

                </div>


                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="confirm-actions">

                    {/* CANCEL */}

                    <button
                        type="button"
                        className="confirm-cancel"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        {finalCancelText}
                    </button>


                    {/* DELETE */}

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

                                {finalConfirmText}
                            </>

                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}


export default ConfirmDialog;