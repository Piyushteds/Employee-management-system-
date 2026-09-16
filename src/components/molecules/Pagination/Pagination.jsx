import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import "./Pagination.css";

function Pagination({
    currentPage = 1,
    totalPages = 0,
    onPageChange,
    disabled = false,
}) {

    if (totalPages <= 0) {
        return null;
    }


    const getPageNumbers = () => {

        if (totalPages <= 5) {

            return Array.from(
                {
                    length: totalPages,
                },
                (_, index) => index + 1
            );
        }


        if (currentPage <= 3) {

            return [
                1,
                2,
                3,
                "...",
                totalPages,
            ];
        }


        if (currentPage >= totalPages - 2) {

            return [
                1,
                "...",
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }


        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };


    const pages = getPageNumbers();


    const handlePageChange = (page) => {

        if (disabled) {
            return;
        }

        if (page < 1 || page > totalPages) {
            return;
        }

        if (page === currentPage) {
            return;
        }

        onPageChange?.(page);
    };


    return (
        <div className="pagination">

            {/* FIRST */}
            <button
                type="button"
                className="pagination-button"
                disabled={
                    disabled ||
                    currentPage === 1
                }
                onClick={() =>
                    handlePageChange(1)
                }
                aria-label="First page"
            >
                <ChevronsLeft size={16} />
            </button>


            {/* PREVIOUS */}
            <button
                type="button"
                className="pagination-button"
                disabled={
                    disabled ||
                    currentPage === 1
                }
                onClick={() =>
                    handlePageChange(
                        currentPage - 1
                    )
                }
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </button>


            {/* PAGES */}
            <div className="pagination-pages">

                {pages.map((page, index) =>

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
                                page === currentPage
                                    ? "pagination-page pagination-page-active"
                                    : "pagination-page"
                            }
                            disabled={disabled}
                            onClick={() =>
                                handlePageChange(page)
                            }
                            aria-current={
                                page === currentPage
                                    ? "page"
                                    : undefined
                            }
                        >
                            {page}
                        </button>
                    )
                )}

            </div>


            {/* NEXT */}
            <button
                type="button"
                className="pagination-button"
                disabled={
                    disabled ||
                    currentPage === totalPages
                }
                onClick={() =>
                    handlePageChange(
                        currentPage + 1
                    )
                }
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button>


            {/* LAST */}
            <button
                type="button"
                className="pagination-button"
                disabled={
                    disabled ||
                    currentPage === totalPages
                }
                onClick={() =>
                    handlePageChange(
                        totalPages
                    )
                }
                aria-label="Last page"
            >
                <ChevronsRight size={16} />
            </button>

        </div>
    );
}

export default Pagination;