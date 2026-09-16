import { Search, X } from "lucide-react";

import "./SearchBar.css";

function SearchBar({
    value = "",
    onChange,
    onClear,
    placeholder = "Search...",
    disabled = false,
    name,
    id,
    ariaLabel = "Search",
}) {
    const handleClear = () => {

        if (onClear) {
            onClear();
            return;
        }

        if (onChange) {
            onChange({
                target: {
                    value: "",
                },
            });
        }
    };

    return (
        <div className="search-bar">

            <Search
                className="search-bar-icon"
                size={17}
            />

            <input
                id={id}
                name={name}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                aria-label={ariaLabel}
                className="search-bar-input"
            />

            {value && (
                <button
                    type="button"
                    className="search-bar-clear"
                    onClick={handleClear}
                    disabled={disabled}
                    aria-label="Clear search"
                    title="Clear search"
                >
                    <X size={15} />
                </button>
            )}

        </div>
    );
}

export default SearchBar;