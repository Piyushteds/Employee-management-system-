import { Search, SlidersHorizontal } from "lucide-react";

import "./DepartmentSearch.css";

function DepartmentSearch({
    searchTerm = "",
    onSearchChange,
    onClearFilters,
    hasActiveFilters = false,
}) {
    return (
        <div className="department-toolbar">

            {/* SEARCH */}
            <div className="department-search">
                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
            </div>

            {/* CLEAR FILTERS */}
            <button
                type="button"
                className="department-filter-button"
                onClick={onClearFilters}
                disabled={!hasActiveFilters}
            >
                <SlidersHorizontal size={17} />

                <span>
                    Clear Filters
                </span>
            </button>

        </div>
    );
}

export default DepartmentSearch;