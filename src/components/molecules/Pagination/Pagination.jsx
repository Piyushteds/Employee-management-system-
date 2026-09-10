import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";

import "./Pagination.css";

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) {
        return null;
    }

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {
                pages.push(page);
            }

            return pages;
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        const start = Math.max(
            2,
            currentPage - 1
        );

        const end = Math.min(
            totalPages - 1,
            currentPage + 1
        );

        for (
            let page = start;
            page <= end;
            page++
        ) {
            pages.push(page);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="pagination">
            <button
                type="button"
                className="pagination-button"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                aria-label="First page"
            >
                <ChevronsLeft size={16} />
            </button>

            <button
                type="button"
                className="pagination-button"
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </button>

            <div className="pagination-pages">
                {getPageNumbers().map(
                    (page, index) =>
                        page === "..." ? (
                            <span
                                key={`dots-${index}`}
                                className="pagination-dots"
                            >
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
                                onClick={() =>
                                    onPageChange(page)
                                }
                            >
                                {page}
                            </button>
                        )
                )}
            </div>

            <button
                type="button"
                className="pagination-button"
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                disabled={
                    currentPage === totalPages
                }
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button>

            <button
                type="button"
                className="pagination-button"
                onClick={() =>
                    onPageChange(totalPages)
                }
                disabled={
                    currentPage === totalPages
                }
                aria-label="Last page"
            >
                <ChevronsRight size={16} />
            </button>
        </div>
    );
}

export default Pagination;