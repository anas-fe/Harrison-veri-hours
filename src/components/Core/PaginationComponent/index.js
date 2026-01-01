import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "../Button";
import classes from "./pagination.module.css";
import { recordsLimit } from "@/constant/constants";

const totalPagesToDisplay = 10;

const PaginationComponent = ({
  totalRecord,
  currentPage,
  setCurrentPage,
  limit = recordsLimit,
  customClass,
  loading,
}) => {
  const totalPages = Math.ceil(totalRecord / limit);
  const showLeftEllipsis = currentPage - 1 > totalPagesToDisplay / 2;
  const showRightEllipsis =
    totalPages - currentPage + 1 > totalPagesToDisplay / 2;
  const getPageNumbers = () => {
    if (totalPages <= totalPagesToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const half = Math.floor(totalPagesToDisplay / 2);
      let start = currentPage - half;
      let end = currentPage + half;
      if (start < 1) {
        start = 1;
        end = totalPagesToDisplay;
      }
      if (end > totalPages) {
        start = totalPages - totalPagesToDisplay + 1;
        end = totalPages;
      }
      if (showLeftEllipsis) {
        start++;
      }
      // If showRightEllipsis is true, add an ellipsis after the end page
      if (showRightEllipsis) {
        end--;
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  };

  const renderPaginationItems = () => {
    const pageNumbers = getPageNumbers();
    return pageNumbers.map((pageNumber) => (
      <Button
        key={pageNumber}
        onClick={() => {
          if (pageNumber === currentPage) return;
          setCurrentPage(pageNumber);
        }}
        className={pageNumber === currentPage ? classes.active : ""}
        variant={"link"}
        customStyle={{ height: "26px", width: "26px" }}
        isSimpleHover={false}
      >
        {pageNumber}
      </Button>
    ));
  };

  // Calculate the indices of the first and last records on the current page
  const lowerLimit = (currentPage - 1) * limit + 1; // starts from 1, not 0
  const upperLimit =
    currentPage * limit > totalRecord ? totalRecord : currentPage * limit;

  return loading ? (
    <div className={classes.paginationContainer}>
    </div>
  ) : (
    <div
      className={[classes.paginationContainer, customClass && customClass].join(
        " "
      )}
    >
      <p>
        Showing Results: {lowerLimit} - {upperLimit} of {totalRecord}
      </p>
      <div className={classes.pagination}>
        <Button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          aria-disabled={currentPage === 1}
          variant="link"
          isSimpleHover={false}
          className={classes.paginationBtn}
        >
          <FaChevronLeft size={12} color="var(--main-color)" />
        </Button>
        {showLeftEllipsis && <span className={classes.ellipsis}>...</span>}
        {renderPaginationItems()}
        {showRightEllipsis && <span className={classes.ellipsis}>...</span>}
        <Button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          variant="link"
          isSimpleHover={false}
          className={classes.paginationBtn}
        >
          <FaChevronRight size={12} color="var(--main-color)" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationComponent;
