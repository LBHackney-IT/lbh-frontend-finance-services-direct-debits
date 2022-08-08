import React from "react";
import { Link } from "react-router-dom";

const range = (start, end, step) => {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    (x) => start + x * step
  );
}

const Pagination = (params) => {
  const { total, page, prefix, divided } = params;

  // const beginning = page > 10 ? page - 10 : 1;
  // const finish = page + 10 < divided ? page + 10 : divided;

  // const r = range(beginning, finish, 1)
  const r = [1]

  return (
    <>
      <div className="pagination_wrap">
        <ul className="pagination">
          {r.map((num) => {
            return (
              <li
                key={`pagination_${num}`}
                className={`page-item${num === page ? " active" : ""}`}
              >
                <Link className="page-link" to={`${prefix}/${num}`}>
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
