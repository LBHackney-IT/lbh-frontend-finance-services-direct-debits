import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { CurrencyFormat, DateFormat } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import { getPerson } from "../routes/Api";
import * as RouteConstants from "../routes/RouteConstants";
import { descriptionList } from "../templates/descriptionListHTML";

const Tenant = () => {
  const params = useParams();
  const history = useHistory();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";
  const Type = params.type ? params.type : "Tenant";

  const [searching, setSearching] = useState(false);
  const [tenantData, setTenant] = useState(undefined);

  useEffect(() => {
    const searchCall = async () => {
      setSearching(true);
      const callPerson = await getPerson({
        id: TenantId,
      });
      setTenant(callPerson);
      setSearching(false);
    };
    searchCall();
  }, [TenantId]);

  if (searching) {
    return (
      <>
        <h1>{TextReferences.Titles.Tenant}</h1>
        <button
          onClick={() => history.push(-1)}
          className="mt-0 govuk-button lbh-button lbh-button-secondary"
        >
          {TextReferences.TextRef.Back}
        </button>
        <h4>{TextReferences.TextRef.Searching}</h4>
      </>
    );
  }

  if (tenantData === undefined) {
    return (
      <>
        <h1>{TextReferences.Titles.Tenant}</h1>
        <button
          onClick={() => history.push(-1)}
          className="mt-0 govuk-button lbh-button lbh-button-secondary"
        >
          {TextReferences.TextRef.Back}
        </button>
        <h4>Tenant data could not be found.</h4>
      </>
    );
  }

  if (tenantData === null) {
    return <h4>{TextReferences.TextRef.NoTenantRecords}</h4>;
  }

  return (
    <>
      <h1>
        {TextReferences.Titles.Tenant}: {tenantData.preferredTitle}{" "}
        {tenantData.preferredFirstName} {tenantData.preferredSurname}
      </h1>

      <Link
        to={`/${Type}/form/${TenantId}`}
        className="govuk-button lbh-button mt-0"
        style={{ marginRight: "10px" }}
      >
        {TextReferences.TextRef.Edit}
      </Link>

      <button
        onClick={() => history.push(-1)}
        className="mt-0 govuk-button lbh-button lbh-button-secondary"
      >
        {TextReferences.TextRef.Back}
      </button>

      {tenantData.charges && (
        <>
          <h2>Financial</h2>
          {descriptionList([
            {
              key: "Current Balance",
              val: CurrencyFormat(tenantData.charges.currentBalance),
            },
            {
              key: "Weekly Total Charges",
              val: CurrencyFormat(tenantData.charges.rent),
            },
            {
              key: "Service Charge",
              val: CurrencyFormat(tenantData.charges.serviceCharge),
            },
            { key: "Yearly Rent Debits", val: "" },
            { key: "Housing Benefits", val: "" },
          ])}
        </>
      )}
      <h2>Tenure</h2>
      {descriptionList([
        { key: "Tenure ID", val: tenantData.id },
        { key: "Tenure Type", val: tenantData.personTypes.join(", ") },
        {
          key: "Tenancy Start Date",
          val: DateFormat(tenantData.startOfTenureDate),
        },
        { key: "Date of Birth", val: DateFormat(tenantData.dateOfBirth) },
      ])}
      {tenantData.tenures.length && (
        <>
          <h2>Properties</h2>
          <div className="table-wrap">
            <table className="govuk-table lbh-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th className="govuk-table__header">Address</th>
                  <th className="govuk-table__header">Date</th>
                  <th className="govuk-table__header">Current Balance</th>
                  <th className="govuk-table__header">Tenancy Type</th>
                  <th className="govuk-table__header"> </th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {tenantData.tenures.map((tenure) => {
                  return (
                    <tr className="govuk-table__row" key={tenure.id}>
                      <td
                        className="govuk-table__cell"
                        style={{ maxWidth: "240px", whiteSpace: "pre-wrap" }}
                      >
                        <Link
                          className="lbh-link"
                          to={`${RouteConstants.PROPERTY}/${tenure.id}`}
                        >
                          {tenure.assetFullAddress}
                        </Link>
                      </td>
                      <td className="govuk-table__cell">
                        {DateFormat(tenure.startDate)} -{" "}
                        {tenure.endDate
                          ? DateFormat(tenure.endDate)
                          : "Current"}
                      </td>
                      <td className="govuk-table__cell">{CurrencyFormat()}</td>
                      <td className="govuk-table__cell">{tenure.type}</td>
                      <td className="govuk-table__cell">
                        {tenure.isActive ? (
                          <Link
                            className="govuk-button lbh-button lbh-button-sm mt-0"
                            to={`${RouteConstants.DIRECTDEBIT}/${tenure.id}/create`}
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
      )}
    </>
  );
};

export default Tenant;
