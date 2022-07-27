/* eslint-disable */
/* istanbul ignore file */
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DatePicker from "react-date-picker";
import { useParams } from "react-router-dom";

import { getTenancy, getTenancySummary, getTenancyTransactions } from "../Api";
import { CurrencyFormat, DateFormat, MinusYear } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";

const IndividualLookupPayments = () => {
  const params = useParams();
  const tenancyAgreementRef = params.tenancyAgreementRef
    ? decodeURIComponent(params.tenancyAgreementRef)
    : params.tenancyAgreementRef;

  const [searchingCSV, setCSVSearching] = useState(false);
  const [searchingTenant, setTenantSearching] = useState(false);
  const [searchingTransaction, setTransactionSearching] = useState(false);
  const [startDate, setStartDate] = useState(MinusYear);
  const [endDate, setEndDate] = useState(new Date());
  const [tenant, setTenant] = useState(undefined);
  const [transactions, setTransactions] = useState(undefined);
  const [csvData, setCSVData] = useState(undefined);

  const getTenant = async () => {
    setTenantSearching(true);
    const tenantResult = await getTenancy({
      tenancyAgreementRef,
    });
    setTenant(tenantResult);
    setTenantSearching(false);
  };

  const getTransactions = async () => {
    setTransactionSearching(true);
    const transactionsResult = await getTenancyTransactions({
      tenancyAgreementRef,
      count: 100,
    });
    setTransactions(transactionsResult);
    setTransactionSearching(false);
  };

  useEffect(() => {
    if (!tenancyAgreementRef) {
      return;
    }
    getTenant();
    getTransactions();
  }, [tenancyAgreementRef]);

  const getCSVData = async () => {
    setCSVSearching(true);
    const response = await getTenancySummary({ startDate, endDate });
    setCSVData(response);
    setCSVSearching(false);
  };

  useEffect(() => {
    getCSVData();
  }, [startDate, endDate]);

  const SearchBar = () => {
    return (
      <div className="date-range-search-bar">
        <div className="bar-component-cont">
          <label className="govuk-label govuk-date-input__label">
            CSV Export
          </label>
          <label className="govuk-label govuk-date-input__label">Start:</label>
          <DatePicker
            disabled={searchingCSV}
            clearIcon={null}
            onChange={setStartDate}
            value={startDate}
            format="dd-MM-y"
          />

          <label className="govuk-label govuk-date-input__label">End:</label>
          <DatePicker
            disabled={searchingCSV}
            clearIcon={null}
            onChange={setEndDate}
            value={endDate}
            format="dd-MM-y"
          />
        </div>

        {!searchingCSV && csvData !== undefined && csvData.length && (
          <CSVLink
            data={csvData}
            className="govuk-button govuk-secondary lbh-button lbh-button--secondary mt-0 ml-auto"
            filename={`individual-lookup-payments-${new Date().toLocaleString()}.csv`}
          >
            {TextReferences.TextRef.ExportCSV}
          </CSVLink>
        )}
      </div>
    );
  }; // SearchBar

  const SearchResults = () => {
    if (searchingTenant) {
      return <h4>{TextReferences.TextRef.Searching}</h4>;
    }
    if (tenant === undefined) {
      return;
    }
    if (tenant === null) {
      return (
        <h4>
          {TextReferences.TextRef.NoTenantRecords}"{tenancyAgreementRef}".
        </h4>
      );
    }

    return (
      <>
        <h3>Tenant</h3>
        <dl className="govuk-summary-list lbh-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Tenant</dt>
            <dd className="govuk-summary-list__value">
              {tenant.title} {tenant.forename} {tenant.surname}
            </dd>
          </div>

          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Tenancy ID</dt>
            <dd className="govuk-summary-list__value">
              {tenant.tenancyAgreementRef}
            </dd>
          </div>
        </dl>
        {searchingTransaction ? (
          <h4>{TextReferences.TextRef.Searching}</h4>
        ) : transactions !== undefined && transactions.length ? (
          <>
            <h3>{TextReferences.TextRef.Transactions}</h3>
            <table className="govuk-table lbh-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header">
                    Week Beginning
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-table__cell--numeric"
                  >
                    Charge
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-table__cell--numeric"
                  >
                    Paid
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-table__cell--numeric"
                  >
                    HB Cont.
                  </th>
                  <th
                    scope="col"
                    className="govuk-table__header govuk-table__cell--numeric"
                  >
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {transactions.map((data, key) => {
                  return (
                    <tr className="govuk-table__row" key={key}>
                      <td className="govuk-table__cell">
                        {DateFormat(data.weekBeginning)}
                      </td>
                      <td className="govuk-table__cell govuk-table__cell--numeric">
                        {CurrencyFormat(data.totalCharged)}
                      </td>
                      <td className="govuk-table__cell govuk-table__cell--numeric">
                        {CurrencyFormat(data.totalPaid)}
                      </td>
                      <td className="govuk-table__cell govuk-table__cell--numeric">
                        {CurrencyFormat(data.totalHB)}
                      </td>
                      <td className="govuk-table__cell govuk-table__cell--numeric">
                        {CurrencyFormat(data.weekBalance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <p>{TextReferences.TextRef.NoTransactions}</p>
        )}
      </>
    );
  }; // CONST

  return (
    <>
      <h1>{TextReferences.Titles.IndividualLookupPayments}</h1>
      {SearchBar()}
      {SearchResults()}
    </>
  );
};

export default IndividualLookupPayments;
