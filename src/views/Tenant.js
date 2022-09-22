import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DirectDebitList from "../fragments/DirectDebitList";
import PropertiesList from "../fragments/PropertiesList";
import { CurrencyFormat, DateFormat } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import * as Read from "../services/Read";
import { descriptionList } from "../templates/descriptionListHTML";

const Tenant = () => {
  const params = useParams();
  const navigate = useNavigate();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";
  const Type = params.type ? params.type : "Tenant";

  const [searching, setSearching] = useState(false);
  const [tenantData, setTenant] = useState(undefined);
  const [directDebits, setDirectDebits] = useState(undefined);

  useEffect(() => {
    const call = async () => {
      setSearching(true);
      const callPerson = await Read.Person({ id: TenantId });
      setTenant(callPerson);
      setSearching(false);
    };
    call();
  }, [TenantId]);

  useEffect(() => {
    const call = async () => {
      const callDirectDebit = await Read.DirectDebits({
        TargetId: TenantId,
        currentPage: 1,
      });
      setDirectDebits(callDirectDebit);
      console.log(callDirectDebit);
    };
    call();
  }, [TenantId]);

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {searching && <h1>{TextReferences.Titles.Tenant}</h1>}
          {!searching && tenantData !== undefined && (
            <h1>
              {tenantData.preferredTitle} {tenantData.preferredFirstName}{" "}
              {tenantData.preferredSurname}
            </h1>
          )}
        </div>

        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <button
            onClick={() => navigate(-1)}
            className="mt-0 govuk-button lbh-button lbh-button-secondary"
            data-cy="tenant-single-to-back-link"
          >
            {TextReferences.TextRef.Back}
          </button>

          {tenantData !== undefined ? (
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
        {searching && (
          <div className="govuk-grid-column-two-thirds">
            <h4>{TextReferences.TextRef.Searching}</h4>
          </div>
        )}

        {!searching && tenantData === null ? (
          <div className="govuk-grid-column-two-thirds">
            <h4>{TextReferences.TextRef.NoTenantRecords}</h4>
          </div>
        ) : (
          ""
        )}

        {!searching && tenantData === undefined ? (
          <div className="govuk-grid-column-two-thirds">
            <h4>{TextReferences.TextRef.NoTenantRecords}</h4>
          </div>
        ) : (
          ""
        )}
      </div>

      {!searching && tenantData !== undefined && tenantData.charges ? (
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
      ) : (
        ""
      )}

      {!searching && tenantData !== undefined ? (
        <>
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
          <PropertiesList data={tenantData} targetId={tenantData.id} />
          <DirectDebitList data={directDebits} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Tenant;
