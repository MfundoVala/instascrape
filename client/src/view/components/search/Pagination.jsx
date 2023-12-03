import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
};

function Pagination({ items, onChangePage, initialPage }) {
  const [pager, setPager] = useState({});

  useEffect(() => {
    // set page if items array isn't empty
    if (items && items.length) {
      setPage(initialPage);
    }
  }, [items, initialPage]);

  useEffect(() => {
    // reset page if items array has changed
    setPage(initialPage);
  }, [items]);

  const setPage = (page) => {
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    const newPager = getPager(items.length, page);

    // get new page of items from items array
    const pageOfItems = items.slice(newPager.startIndex, newPager.endIndex + 1);

    // update state
    setPager(newPager);

    // call change page function in parent component
    onChangePage(pageOfItems);
  };

  const getPager = (totalItems, currentPage, pageSize) => {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;

    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  };

  return (
    <ul className="pagination">
      <li className={pager.currentPage === 1 ? "disabled" : ""}>
        <button onClick={() => setPage(1)}>First</button>
      </li>
      <li className={pager.currentPage === 1 ? "disabled" : ""}>
        <button onClick={() => setPage(pager.currentPage - 1)}>Previous</button>
      </li>
      {pager.pages &&
        pager.pages.map((page, index) => (
          <li
            key={index}
            className={pager.currentPage === page ? "active" : ""}
          >
            <button onClick={() => setPage(page)}>{page}</button>
          </li>
        ))}
      <li className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
        <button onClick={() => setPage(pager.currentPage + 1)}>Next</button>
      </li>
      <li className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
        <button onClick={() => setPage(pager.totalPages)}>Last</button>
      </li>
    </ul>
  );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
