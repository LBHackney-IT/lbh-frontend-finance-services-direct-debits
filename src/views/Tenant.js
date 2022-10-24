import React from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";

import DirectDebitList from "../fragments/DirectDebitList";
import PropertiesList from "../fragments/PropertiesList";
import { CurrencyFormat, DateFormat } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import * as Read from "../services/Read";
import { descriptionList } from "../templates/descriptionListHTML";

const Tenant = () => {
  const params = useParams();
  const history = useHistory();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";
  const Type = params.type ? params.type : "Tenant";

  const { data: tenants, status } = useQuery("tenant", async () => {
    return Read.Person({ id: TenantId });
  });

  const { data: directDebits } = useQuery("directDebit", async () => {
    return Read.DirectDebits({
      TargetId: TenantId,
      currentPage: 1,
    });
  });

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {status === "loading" && <h1>{TextReferences.Titles.Tenant}</h1>}
          {status !== "loading" && tenants !== undefined && (
            <h1>
              {tenants.preferredTitle} {tenants.preferredFirstName}{" "}
              {tenants.preferredSurname}
            </h1>
          )}
        </div>

        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <button
            onClick={() => history.goBack()}
            className="mt-0 govuk-button lbh-button lbh-button-secondary"
            data-cy="tenant-single-to-back-link"
          >
            {TextReferences.TextRef.Back}
          </button>

          {tenants !== undefined ? (
            <Link
              to={`/${Type}/form/${TenantId}`}
              className="govuk-button lbh-button mt-0"
              data-cy="tenant-single-to-edit-link"
              style={{ marginLeft: "10px" }}
            >
              {TextReferences.TextRef.Edit}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="govuk-grid-row">
        {status === "loading" && (
          <div className="govuk-grid-column-two-thirds">
            <h4>{TextReferences.TextRef.Searching}</h4>
          </div>
        )}

        {status !== "loading" && tenants === null ? (
          <div className="govuk-grid-column-two-thirds">
            <h4>{TextReferences.TextRef.NoTenantRecords}</h4>
          </div>
        ) : (
          ""
        )}

        {status !== "loading" && tenants === undefined ? (
          <div className="govuk-grid-column-two-thirds">
            <h4>{TextReferences.TextRef.NoTenantRecords}</h4>
          </div>
        ) : (
          ""
        )}
      </div>

      {status !== "loading" && tenants !== undefined && tenants.charges ? (
        <>
          <h2>Financial</h2>
          {descriptionList([
            {
              key: "Current Balance",
              val: CurrencyFormat(tenants.charges.currentBalance),
            },
            {
              key: "Weekly Total Charges",
              val: CurrencyFormat(tenants.charges.rent),
            },
            {
              key: "Service Charge",
              val: CurrencyFormat(tenants.charges.serviceCharge),
            },
            { key: "Yearly Rent Debits", val: "" },
            { key: "Housing Benefits", val: "" },
          ])}
        </>
      ) : (
        ""
      )}

      {status !== "loading" && tenants !== undefined ? (
        <>
          <h2>Tenure</h2>
          {descriptionList([
            { key: "Tenure ID", val: tenants.id },
            { key: "Tenure Type", val: tenants.personTypes.join(", ") },
            {
              key: "Tenancy Start Date",
              val: DateFormat(tenants.startOfTenureDate),
            },
            { key: "Date of Birth", val: DateFormat(tenants.dateOfBirth) },
          ])}
          <PropertiesList data={tenants} targetId={tenants.id} />
          <DirectDebitList
            data={directDebits ? { results: directDebits } : undefined}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Tenant;
