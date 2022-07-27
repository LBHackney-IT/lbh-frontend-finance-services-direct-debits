/* eslint-disable */
/* istanbul ignore file */
import React, { Fragment, useCallback, useEffect, useState } from "react";

import { getBatchLog } from "../Api";
import { DataReferences } from "../references/DataReferences";
import { DateFormat } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import { TableHeadHTML, TableSort } from "../templates/Table";

const BatchLog = () => {
  const Ref = "BatchLog";
  const DataRef = DataReferences[Ref];
  const [data, setData] = useState(undefined);
  const [toggle, setToggle] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setSearching(true);
      const result = await getBatchLog();
      setData(result);
      setSearching(false);
    };
    getData();
  }, []);

  // TABLE HEAD
  const [sort, setSort] = useState({ value: DataRef[0].sort, direction: true });
  const onSort = useCallback(
    (val) => {
      setSort(val);
      const dataSort = TableSort(sort, data);
      if (dataSort !== false) {
        setData(dataSort);
      }
    },
    [sort]
  );

  const SearchResults = () => {
    if (searching) {
      return <h4>{TextReferences.TextRef.Searching}</h4>;
    }
    if (data === undefined) {
      return;
    }

    return (
      <table className="govuk-table lbh-table">
        <TableHeadHTML tableHead={Ref} sort={sort} onSort={onSort} />
        <tbody className="govuk-table__body">
          {data.map((data) => {
            return (
              <Fragment key={data.batchId}>
                <tr
                  className={`govuk-table__row row_id_${data.batchId}`}
                  key={data.batchId}
                >
                  <td className="govuk-table__cell">{data.batchId}</td>
                  <td className="govuk-table__cell">{data.processName}</td>
                  <td className="govuk-table__cell">
                    {DateFormat(data.startTime)}
                  </td>
                  <td className="govuk-table__cell">
                    {DateFormat(data.endTime)}
                  </td>
                  <td className="govuk-table__cell">
                    <button
                      className={`lbh-link arrow${
                        [...toggle].includes(data.batchId) ? " active" : ""
                      }`}
                      onClick={() => {
                        const ids = [...toggle];
                        ids.includes(data.batchId)
                          ? ids.splice(ids.indexOf(data.batchId), 1)
                          : ids.push(data.batchId);
                        setToggle(ids);
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr
                  className={`lbh-table-errors ${
                    [...toggle].includes(data.batchId) ? "" : "hide"
                  }`}
                >
                  <td colSpan="5" className="lbh-table-errors-wrap">
                    <table className="govuk-table lbh-table">
                      <thead className="govuk-table__head">
                        <tr className="govuk-table__row lbh-table-errors">
                          <th scope="col" className="govuk-table__header">
                            Type
                          </th>
                          <th scope="col" className="govuk-table__header">
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="govuk-table__body">
                        {data.errors.map((error, key) => {
                          return (
                            <tr
                              className="govuk-table__row lbh-table-errors"
                              key={key}
                            >
                              <td className="govuk-table__cell">
                                {error.type}
                              </td>
                              <td className="govuk-table__cell">
                                {error.message}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }; // dataBody

  return (
    <>
      <h1>{TextReferences.Titles.BatchLog}</h1>
      {SearchResults()}
    </>
  );
};

export default BatchLog;
