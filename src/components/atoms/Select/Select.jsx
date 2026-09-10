import "./Select.css";

function Select({
    value,
    onChange,
    options = [],
    placeholder = "Select",
    disabled = false,
    name,
    id,
}) {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="select"
        >
            <option value="">
                {placeholder}
            </option>

            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;