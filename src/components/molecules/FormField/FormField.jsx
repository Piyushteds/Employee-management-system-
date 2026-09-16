import "./FormField.css";

function FormField({
    label,
    name,
    error,
    required = false,
    children,
    hint,
}) {

    return (
        <div className="form-field">

            {label && (
                <label
                    htmlFor={name}
                    className="form-field-label"
                >
                    {label}

                    {required && (
                        <span className="form-field-required">
                            *
                        </span>
                    )}
                </label>
            )}


            <div className="form-field-control">
                {children}
            </div>


            {error && (
                <span className="form-field-error">
                    {error}
                </span>
            )}


            {!error && hint && (
                <span className="form-field-hint">
                    {hint}
                </span>
            )}

        </div>
    );
}

export default FormField;