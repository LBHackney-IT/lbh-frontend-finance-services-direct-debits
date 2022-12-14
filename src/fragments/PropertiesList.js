import React from "react";
import { Link } from "react-router-dom";

import { CurrencyFormat, DateFormat } from "../references/Functions";
import * as RouteConstants from "../references/RouteConstants";
import * as TextReferences from "../references/TextReferences";

const PropertiesList = (params) => {
  const { data, targetId } = params;
  const h2 = <h2>{TextReferences.Titles.Properties}</h2>;

  if (data === undefined) {
    return { h2 };
  }

  if (data === null) {
    return (
      <>
        {h2}
        <h4>{TextReferences.TextRef.NoPropertiesFound}</h4>
      </>
    );
  }

  if (data.tenures.length) {
    return (
      <>
        {h2}
        <div className="table-wrap">
          <table className="govuk-table lbh-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th className="govuk-table__header">Address</th>
                <th className="govuk-table__header">Date</th>
                <th className="govuk-table__header">Balance</th>
                <th className="govuk-table__header">PRN</th>
                <th className="govuk-table__header">Type</th>
                <th className="govuk-table__header">Status</th>
                <th className="govuk-table__header"> </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              {data.tenures.map((tenure) => {
                return (
                  <tr className="govuk-table__row" key={tenure.id}>
                    <td
                      className="govuk-table__cell"
                      style={{ maxWidth: "240px", whiteSpace: "pre-wrap" }}
                    >
                      <Link
                        className="lbh-link"
                        to={`${RouteConstants.PROPERTY}/${tenure.id}`}
                        role="button"
                        data-cy={`tenant-single-to-property-link-${tenure.id}`}
                        aria-label={tenure.assetFullAddress}
                      >
                        {tenure.assetFullAddress}
                      </Link>
                    </td>
                    <td className="govuk-table__cell">
                      {DateFormat(tenure.startDate)} -{" "}
                      {tenure.endDate ? DateFormat(tenure.endDate) : "Current"}
                    </td>
                    <td className="govuk-table__cell">{CurrencyFormat()}</td>
                    <td className="govuk-table__cell">
                      {tenure.paymentReference}
                    </td>
                    <td className="govuk-table__cell">{tenure.type}</td>
                    <td className="govuk-table__cell">
                      {tenure.isActive ? "Active" : "In-Active"}
                    </td>
                    <td className="govuk-table__cell">
                      {tenure.isActive ? (
                        <Link
                          className="govuk-button lbh-button lbh-button-sm mt-0"
                          data-cy={`tenant-single-to-direct-debit-create-link-${targetId}`}
                          to={`${
                            RouteConstants.DIRECTDEBITSINGLE
                          }/${targetId}/${tenure.paymentReference ?? 0}/create`}
                          role="button"
                          aria-label={TextReferences.TextRef.AddDirectDebit}
                        >
                          {TextReferences.TextRef.AddDirectDebit}
                        </Link>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default PropertiesList;
