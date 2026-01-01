"use client";
import moment from "moment";
import { cloneElement, isValidElement } from "react";
import NoData from "../NoData/NoData";
import PaginationComponent from "../PaginationComponent";
import classes from "./TableStructure.module.css";
import { cn, formatNumber } from "@/helper/HelperFunction";
import { recordsLimit } from "@/constant/constants";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const TableStructure = ({
  isLoading,
  scrollRef,
  headerTitle = "Header",
  tableType = "default",
  headerHandlers = {},
  tableContent = [
    {
      Shadow: <div>1</div>,
      name: <div>Lorem</div>,
      email: "lorem@example.com",
      shadowDuration: "2 hours",
      phone: "+123456789",
    },
  ],
  tableHeaders = [
    
    { label: "Shadow", value: "Shadow" },
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Shadow Duration", value: "shadowDuration" },
    { label: "Phone", value: "phone" }
  ],
  totalRecord = 20,
  recordLimit = recordsLimit,
  noDataMessage = "No Users Found",
  customStyle: tableCustomStyle,
  tableMinWidth,
  page = 1,
  setPage,
  tableFooter,
  setSort,
  sort,
  inBox,
  showPagination = true,
}) => {
  const rows = Array(recordsLimit).fill(0);
  const cols = Array(tableHeaders?.length).fill(0);
  return (
    <div className={cn(classes.main, inBox && classes.inBox)}>
      <div className={headerTitle && classes.table_heading}>
        {Object?.keys(headerHandlers)?.length > 0 && (
          <div className={classes.headerFilterDiv}>
            {Object?.keys(headerHandlers)?.map((e, index) => {
              return headerHandlers[e];
            })}
          </div>
        )}
      </div>
      <div className={classes.scrollWrapper}>
        <div
          ref={scrollRef}
          style={tableCustomStyle}
          className={classes.tableWrapper}
        >
          <table
            className={classes.table}
            style={{ minWidth: `${tableMinWidth}px` }}
          >
            <thead className={classes.tableHeader}>
              <tr className={classes.tableRow}>
                {Array.isArray(tableHeaders) &&
                  tableHeaders?.map((e, index) => {
                    if (!e) {
                      return;
                    }
                    return (
                      <th
                        className={classes.tableHead}
                        style={{
                          width: e?.width,
                          ...e?.headerStyle,
                        }}
                        key={index}
                      >
                        <div
                          className={classes.tableHead__wrapper}
                          onClick={() => {
                            if (!setSort) return;
                            setSort({
                              value: e?.value,
                              order: sort?.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        >
                          {e?.label}
                          {e?.sortable && setSort && (
                            <span className={classes.sortIcon}>
                              <TiArrowSortedUp
                                size={14}
                                className={classes.__icon}
                                color={
                                  sort?.value === e?.value &&
                                  sort?.order === "asc"
                                    ? "var(--text-color)"
                                    : "var(--icon-color)"
                                }
                              />
                              <TiArrowSortedDown
                                size={14}
                                className={classes.__icon}
                                color={
                                  sort?.value === e?.value &&
                                  sort?.order === "desc"
                                    ? "var(--text-color)"
                                    : "var(--icon-color)"
                                }
                              />
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {isLoading ? (
                rows?.map((_, index) => (
                  <tr className={classes.tableRow} key={index}>
                    {cols?.map((_, i) => (
                      <td
                        style={{
                          width: `${100 / tableHeaders?.length}%`,
                        }}
                        className={classes.tableData}
                        key={i}
                      >
                      </td>
                    ))}
                  </tr>
                ))
              ) : tableContent.length > 0 ? (
                tableContent?.map((item, index) => {
                  return (
                    <tr
                      data-style={tableType}
                      key={index}
                      className={cn(classes.tableRow, classes.tr)}
                      style={{
                        "--_border-bottom": "1px solid var(--border-color)",
                        "--_border-width": "0 0 1px 0",
                        "--_background": "var(--background-quinary)",
                      }}
                    >
                      {tableHeaders?.map((e, index) => {
                        if (!e) {
                          return;
                        }
                        const customProps =
                          e?.formatting?.[e.value] &&
                          !isValidElement(item?.[e?.value])
                            ? e?.formatting[e.value](item)
                            : {};
                        const customClasses = customProps.className
                          ? structuredClone(customProps.className)
                          : undefined;
                        const customStyles = customProps.style
                          ? structuredClone(customProps.style)
                          : {};

                        delete customProps["style"];
                        delete customProps["className"];
                        return (
                          <td
                            className={[classes.tableData, customClasses].join(
                              " "
                            )}
                            style={{
                              width: e?.width,
                              ...e?.dataStyle,
                              ...customStyles,
                              ...(tableType === "secondary"
                                ? {
                                    borderBottom:
                                      "1px solid var(--gray-border)",
                                  }
                                : {}),
                            }}
                            key={index}
                            {...customProps}
                          >
                            {e?.type == "amount"
                              ? formatNumber(item?.[e?.value])
                              : item?.[e?.value]}{" "}
                            {e?.symbol === "%" && e?.symbol}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={tableHeaders?.length + 1}>
                    <NoData text={noDataMessage} />
                  </td>
                </tr>
              )}
            </tbody>
            {tableFooter && (
              <tfoot className={classes.tableFooter}>
                <tr className={classes.tableRow}>
                  {Array.isArray(tableFooter) &&
                    tableFooter?.map((e, index) => {
                      return (
                        <th
                          className={classes.tableHead}
                          style={{
                            ...e?.headerStyle,
                            ...(tableType === "secondary"
                              ? {
                                  borderBottom:
                                    "1px solid var( --primary-text-color)",
                                }
                              : {}),
                          }}
                          key={index}
                        >
                          {e}
                        </th>
                      );
                    })}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        {showPagination && tableContent?.length > 0 && page && setPage && (
          <div className={classes.Pagination}>
            <PaginationComponent
              totalPages={Math.ceil(totalRecord / recordLimit)}
              setCurrentPage={setPage}
              currentPage={Number(page)}
              totalRecord={totalRecord}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableStructure;
