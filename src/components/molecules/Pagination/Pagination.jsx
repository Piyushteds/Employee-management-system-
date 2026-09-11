import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";

import "./Pagination.css";

function Pagination({ currentPage = 1, totalPages = 0, onPageChange }) {
    if (totalPages <= 1) return null;

    const goToPage = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    const getPageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const pages = [1];

        if (currentPage > 3) pages.push("left-ellipsis");

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let page = start; page <= end; page++) {
            if (!pages.includes(page)) pages.push(page);
        }

        if (currentPage < totalPages - 2) pages.push("right-ellipsis");
        pages.push(totalPages);

        return pages;
    };

    return (
        <nav className="pagination" aria-label="Employee pagination">
            <button
                type="button"
                className="pagination-button"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                aria-label="First page"
            >
                <ChevronsLeft size={16} />
            </button>

            <button
                type="button"
                className="pagination-button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </button>

            <div className="pagination-pages">
                {getPageNumbers().map((page, index) =>
                    typeof page === "string" ? (
                        <span key={page} className="pagination-dots" aria-hidden="true">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            className={
                                currentPage === page
                                    ? "pagination-page pagination-page-active"
                                    : "pagination-page"
                            }
                            onClick={() => goToPage(page)}
                            aria-current={currentPage === page ? "page" : undefined}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                type="button"
                className="pagination-button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button>

            <button
                type="button"
                className="pagination-button"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
            >
                <ChevronsRight size={16} />
            </button>
        </nav>
    );
}

export default Pagination;
