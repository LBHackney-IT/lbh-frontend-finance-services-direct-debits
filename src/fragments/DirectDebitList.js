import React from "react";
import { Link } from "react-router-dom";

import * as RouteConstants from "../references/RouteConstants";
import * as TextReferences from "../references/TextReferences";

const DirectDebitList = (params) => {
  const { data } = params;
  const h2 = <h2>{TextReferences.Titles.DirectDebits}</h2>;

  if (data === undefined) {
    return (
      <>
        {h2}
        <p>{TextReferences.TextRef.Searching}</p>
      </>
    );
  }

  if (data?.results.length === 0) {
    return (
      <>
        {h2}
        <p>No direct debits setup yet.</p>
        <hr />
      </>
    );
  }

  return (
    <>
      {h2}
      <div className="table-wrap">
        <table className="govuk-table lbh-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th className="govuk-table__header">Account Holder</th>
              <th className="govuk-table__header">Type</th>
              <th className="govuk-table__header">Status</th>
              <th className="govuk-table__header">Account Number</th>
              <th className="govuk-table__header">Sort Code</th>
              <th className="govuk-table__header">PRN</th>
              <th className="govuk-table__header">Collection Date</th>
              <th className="govuk-table__header"> </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {data.results.map((dd, key) => {
              return (
                <tr className="govuk-table__row" key={key}>
                  <td className="govuk-table__cell">{dd.accountHolder}</td>
                  <td className="govuk-table__cell">{dd.targetType}</td>
                  <td className="govuk-table__cell">{dd.status}</td>
                  <td className="govuk-table__cell">{dd.bankAccountNumber}</td>
                  <td className="govuk-table__cell">{dd.branchSortCode}</td>
                  <td className="govuk-table__cell">{dd.paymentReference}</td>
                  <td className="govuk-table__cell">
                    {TextReferences.CollectionDates[dd.preferredDate]}
                  </td>
                  <td className="govuk-table__cell">
                    <Link
                      to={`${RouteConstants.DIRECTDEBITSINGLE}/${dd.id}`}
                      className="govuk-button lbh-button lbh-button-sm mt-0"
                      title="View Direct Debit"
                      role="button"
                      aria-label="View Direct Debit"
                      data-cy={`directDebit-sublist-to-single-directDebit-${dd.targetId}`}
                    >
                      View Direct Debit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DirectDebitList;
