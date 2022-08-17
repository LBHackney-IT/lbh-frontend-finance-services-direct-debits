import React from "react";
import { Link } from "react-router-dom";

const Pagination = (params) => {
  const { total, page, prefix, divided } = params;

  const beginning = page > 10 ? page - 10 : 1;
  const finish = page + 10 < divided ? page + 10 : divided;
  const range = (start, end, step) =>
    Array.from(
      Array.from(Array(Math.ceil((end - start) / step)).keys()),
      (x) => start + x * step
    );

  return (
    <>
      <div className="pagination_wrap">
        <ul className="pagination">
          {range(beginning, finish, 1).map((num) => {
            return (
              <li
                key={`pagination_${num}`}
                className={`page-item${num === page ? " active" : ""}`}
              >
                <Link
                  className="page-link"
                  to={`${prefix}/${num}`}
                  data-cy={`pagination-${prefix}-${num}`}
                >
                  {num}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-center color_999">Total Results: {total}</p>
    </>
  );
};

export default Pagination;
