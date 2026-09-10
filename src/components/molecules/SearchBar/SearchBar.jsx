import { Search, X } from "lucide-react";
import "./SearchBar.css";

function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
}) {
    return (
        <div className="search-bar">
            <Search
                size={18}
                className="search-bar-icon"
            />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="search-bar-input"
            />

            {value && (
                <button
                    type="button"
                    className="search-bar-clear"
                    onClick={() =>
                        onChange({
                            target: {
                                value: "",
                            },
                        })
                    }
                    aria-label="Clear search"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}

export default SearchBar;