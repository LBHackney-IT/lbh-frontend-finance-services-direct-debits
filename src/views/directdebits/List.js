import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import { DataReferences } from "../../references/DataReferences";
import { CurrencyFormat } from "../../references/Functions";
import Pagination from "../../references/Pagination";
import * as RouteContents from "../../references/RouteConstants";
import * as TextReferences from "../../references/TextReferences";
import * as Read from "../../services/Read";
import { TableBodyHTML } from "../../templates/Table";

const DirectDebitList = () => {
  const params = useParams();
  const pagination = params.pagination
    ? decodeURIComponent(params.pagination)
    : 1;

  const [toggle, setToggle] = useState([]);
  // const [page, setPage] = useState(1)
  const [exportForm, setExportForm] = useState(false);
  const [exportFile, setExportFile] = useState({ type: "csv", date: 1 });
  const [filterForm, setFilterForm] = useState({ date: 1 });
  const Ref = "DirectDebitList";
  const DataRows = DataReferences[Ref];

  const { data, status } = useQuery("dd", async () => {
    const call = await Read.DirectDebits({
      TargetId: "",
      currentPage: pagination,
    });
    return call;
  });

  const exportHTMLForm = () => {
    return (
      <div className="background_EEE">
        <div className="d-flex">
          <div>
            <h3>Export</h3>
          </div>

          <div>
            <label htmlFor="fileType">File Type</label>
            <select
              id="fileType"
              className="govuk-input lbh-input w-100 mt-2 govuk-input--standard"
              name="exportType"
              aria-label="File Type"
              value={exportFile.type}
              onChange={(e) =>
                setExportFile({ ...exportFile, type: e.target.value })
              }
            >
              <option value="csv">CSV</option>
              <option value="dat">DAT</option>
            </select>
          </div>

          <div>
            <label>Date of Collection</label>
            <select
              className="govuk-input lbh-input w-100 mt-2 govuk-input--standard"
              name="exportType"
              value={exportFile.type}
              onChange={(e) =>
                setExportFile({ ...exportFile, type: e.target.value })
              }
            >
              {TextReferences.CollectionDatesArray.map((val) => {
                return (
                  <option value={val[0]} key={val[0]}>
                    {val[1]}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <button
              onClick={() => console.log(exportFile)}
              className="govuk-button lbh-button mt-0"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    );
  };

  const directDebitExport = () => {
    const totalRecords =
      data !== undefined && status !== "loading" ? data.totalCount : "Unknown";
    const totalResidents =
      data !== undefined && status !== "loading" ? data.residents : "Unknown";
    const totalAmount =
      data !== undefined && status !== "loading"
        ? CurrencyFormat(data.totalAmount)
        : "Unknown";

    return (
      <>
        {exportForm ? exportHTMLForm() : ""}
        <div className="background_EEE">
          <div className="d-flex">
            <div>
              <h3>Totals</h3>
            </div>
            <div>
              <h4>{totalRecords} </h4>
              <p style={{ marginTop: "0" }}>Direct Debits</p>
            </div>
            <div>
              <h4>{totalResidents} </h4>
              <p style={{ marginTop: "0" }}>Residents</p>
            </div>
            <div>
              <h4>{totalAmount} </h4>
              <p style={{ marginTop: "0" }}>Total Amount</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const directDebitFilter = () => {
    return (
      <div className="background_EEE">
        <div className="d-flex">
          <div>
            <h3>Filter</h3>
          </div>
          <div>
            <label forhtml="filterDate">Date</label>
            <select
              className="govuk-input lbh-input w-100 mt-2 govuk-input--standard"
              name="filterDate"
              value={filterForm.date}
              onChange={(e) =>
                setFilterForm({ ...filterForm, date: e.target.value })
              }
              data-cy="directDebitFilter-date-select"
            >
              {TextReferences.CollectionDatesArray.map((val) => {
                return (
                  <option value={val[0]} key={val[0]}>
                    {val[1]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  };

  const directDebitView = () => {
    if (status === "loading") {
      return <h4>{TextReferences.TextRef.Searching}</h4>;
    }
    if (data === undefined) {
      return <h4>{TextReferences.TextRef.NothingFound}</h4>;
    }

    return (
      <div className="table-wrap">
        <table className="govuk-table lbh-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              {DataRows.map((row, key) => {
                return (
                  <th className="govuk-table__header" key={key}>
                    {row.title}
                  </th>
                );
              })}
              <th className="govuk-table__header"> </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {data.results.map((directDebit, trKey) => {
              return (
                <Fragment key={trKey}>
                  <tr className="govuk-table__row">
                    {DataRows.map((record, tdKey) => {
                      return (
                        <td className="govuk-table__cell" key={tdKey}>
                          {record.format === "" && directDebit[record.sort]}

                          {record.format === "currency" &&
                            CurrencyFormat(directDebit[record.sort])}

                          {record.format === "link" && (
                            <Link
                              to={`${record.linkPrefix}/${
                                directDebit[record.sort]
                              }`}
                              className="govuk-button lbh-button lbh-button-sm mt-0"
                              title={directDebit[record.sort]}
                              data-cy={`directDebit-list-to-single-link-${
                                directDebit[record.sort]
                              }`}
                            >
                              {record.linkText ?? directDebit[record.sort]}
                            </Link>
                          )}
                        </td>
                      );
                    })}
                    <td className="govuk-table__cell">
                      {directDebit.directDebitMaintenance.length ? (
                        <button
                          className="lbh-link"
                          data-cy={`directDebit-list-maintenance-toggle-${directDebit.id}`}
                          onClick={() => {
                            const ids = [...toggle];
                            if (ids.includes(directDebit.id)) {
                              ids.splice(ids.indexOf(directDebit.id), 1);
                            } else {
                              ids.push(directDebit.id);
                            }
                            setToggle(ids);
                          }}
                        >
                          {[...toggle].includes(directDebit.id)
                            ? "Hide"
                            : "Show"}
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>

                  {directDebit.directDebitMaintenance.length ? (
                    <tr
                      className={`lbh-table-errors ${
                        [...toggle].includes(directDebit.id) ? "" : "hide"
                      }`}
                    >
                      <td colSpan="9" className="lbh-table-errors-wrap">
                        <div className="table-wrap">
                          <table className="govuk-table lbh-table">
                            <thead className="govuk-table__head">
                              <tr className="govuk-table__row lbh-table-errors">
                                {DataReferences.DirectDebitMaintenance.map(
                                  (header, key) => {
                                    return (
                                      <th
                                        className="govuk-table__header"
                                        key={key}
                                      >
                                        {header.title}
                                      </th>
                                    );
                                  }
                                )}
                              </tr>
                            </thead>
                            <TableBodyHTML
                              tableHead="DirectDebitMaintenance"
                              data={directDebit.directDebitMaintenance}
                            />
                          </table>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>

        <Pagination
          total={data.totalCount}
          page={data.currentPage}
          prefix="/direct-debit"
          divided={data.totalPages}
        />
      </div>
    );
  };

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>{TextReferences.Titles.DirectDebits}</h1>
        </div>
        <div
          className="govuk-grid-column-one-third"
          style={{ textAlign: "right" }}
        >
          <Link
            to={`${RouteContents.DIRECTDEBIT}${RouteContents.MANUALSUBMIT}`}
            className="govuk-button lbh-button lbh-button-md mt-0"
            style={{ marginRight: "10px" }}
            title="Manual Submit"
            data-cy="directDebit-to-manualsubmission-link"
          >
            Manual Submit
          </Link>
          <button
            onClick={() => setExportForm(!exportForm)}
            className="govuk-button lbh-button lbh-button-md mt-0"
            data-cy="directDebit-exportForm-toggle"
          >
            {exportForm ? "Hide" : "Show"} Export
          </button>
        </div>
      </div>
      {directDebitExport()}
      {directDebitFilter()}
      {directDebitView()}
    </>
  );
};

export default DirectDebitList;
