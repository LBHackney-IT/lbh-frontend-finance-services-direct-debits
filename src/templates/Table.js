import React from "react";
import { Link } from "react-router-dom";

import { DataReferences } from "../references/DataReferences";
import {
  CurrencyFormat,
  DateFormat,
  DateTimeFormat,
} from "../references/Functions";

const TableSort = (sort, data) => {
  if (data === undefined || !data.length) {
    return false;
  }

  const sorted = data.sort((a, b) => {
    if (a[sort.value] < b[sort.value]) {
      return sort.direction ? -1 : 1;
    }
    if (a[sort.value] > b[sort.value]) {
      return sort.direction ? 1 : -1;
    }
    return 0;
  });

  return sorted;
}; // TableSort

const TableHeadHTML = ({ tableHead, sort, onSort }) => {
  const tableHeaders = DataReferences[tableHead] || [];

  return (
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        {tableHeaders.map((val, key) => {
          return (
            <th
              key={key}
              onClick={(e) => {
                onSort({
                  value: e.target.getAttribute("data-sort"),
                  direction: !sort.direction,
                });
              }}
              data-sort={val.sort}
              scope="col"
              className={`govuk-table__header${val.classes}`}
            >
              {val.title} {/* sortConfig.value === val.sort && arrow */}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}; // TableHeadHTML

const TableBodyHTML = ({ tableHead, data }) => {
  const tableHeaders = DataReferences[tableHead] || [];

  if (data === undefined) {
    return (
      <tr>
        <td>No data</td>
      </tr>
    );
  }

  const tableBody = data.map((val, bodyKey) => {
    return (
      <tr className="govuk-table__row" key={bodyKey}>
        {tableHeaders.map((row, key) => {
          if (row.format === "reference") {
            return (
              <td className={`govuk-table__cell${row.classes}`} key={key}>
                {row.options[val[row.sort]]
                  ? row.options[val[row.sort]]
                  : val[row.sort]}
              </td>
            );
          }

          if (row.format === "date") {
            return (
              <td className={`govuk-table__cell${row.classes}`} key={key}>
                {DateFormat(val[row.sort])}
              </td>
            );
          }

          if (row.format === "currency") {
            return (
              <td className={`govuk-table__cell${row.classes}`} key={key}>
                {CurrencyFormat(val[row.sort])}
              </td>
            );
          }

          if (row.format === "boolean") {
            return (
              <td className={`govuk-table__cell${row.classes}`} key={key}>
                {val[row.sort] === true ? "True" : "False"}
              </td>
            );
          }

          if (row.format === "time") {
            return (
              <td className={`govuk-table__cell${row.classes}`} key={key}>
                {DateTimeFormat(val[row.sort])}
              </td>
            );
          }

          if (row.format === "link") {
            return (
              <td className={`govuk-table__cell${row.classes}`} key={key}>
                <Link
                  data-cy={`${row.dataCy}-${val[row.sort]}`}
                  to={`/${row.linkPrefix}${val[row.sort]}`}
                  className="govuk-button lbh-button lbh-button-sm mt-0"
                  title={val[row.sort]}
                >
                  {row.linkText ? row.linkText : val[row.sort]}
                </Link>
              </td>
            );
          }

          return (
            <td className={`govuk-table__cell${row.classes}`} key={key}>
              {val[row.sort]}
            </td>
          );
        })}
      </tr>
    );
  }); // MAP

  return <tbody className="govuk-table__body">{tableBody}</tbody>;
}; // TableBodyHTML

const TableHTML = ({ tableHead, sort, onSort, data }) => {
  return (
    <div className="table-wrap">
      <table className="govuk-table lbh-table">
        <TableHeadHTML tableHead={tableHead} sort={sort} onSort={onSort} />
        <TableBodyHTML tableHead={tableHead} data={data} />
      </table>
    </div>
  );
};

export { TableHeadHTML, TableBodyHTML, TableHTML, TableSort };
