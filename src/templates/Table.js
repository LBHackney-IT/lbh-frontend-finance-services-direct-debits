/* eslint-disable */
/* istanbul ignore file */
import React from "react";

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

  const tableBody = data.map((val, bodyKey) => {
    const columns = [];
    tableHeaders.forEach((row, key) => {
      // date, time, currency, link, boolean
      let dataFormatted = val[row.sort];
      if (row.format === "date") {
        dataFormatted = DateFormat(val[row.sort]);
      }
      if (row.format === "currency") {
        dataFormatted = CurrencyFormat(val[row.sort]);
      }
      if (row.format === "boolean") {
        dataFormatted = val[row.sort] === true ? "Success" : "Failed";
      }
      if (row.format === "time") {
        dataFormatted = DateTimeFormat(val[row.sort]);
      }
      if (row.format === "link") {
        dataFormatted = (
          <a href={val[row.sort]} title={val[row.sort]}>
            {val[row.sort]}
          </a>
        );
      }

      columns.push(
        <td className={`govuk-table__cell${row.classes}`} key={key}>
          {dataFormatted}
        </td>
      );
    });

    return (
      <tr className="govuk-table__row" key={bodyKey}>
        {columns}
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
