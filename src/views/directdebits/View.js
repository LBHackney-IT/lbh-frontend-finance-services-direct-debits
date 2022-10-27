import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom"; // Link

import PropertiesList from "../../fragments/PropertiesList";
import TabHeadings from "../../fragments/TabHeadings";
import TenantsList from "../../fragments/TenantsList";
import { DataReferences } from "../../references/DataReferences";
import { CurrencyFormat, DateFormat } from "../../references/Functions";
import * as RouteConstants from "../../references/RouteConstants";
import * as TextReferences from "../../references/TextReferences";
import * as Read from "../../services/Read";
import { descriptionList } from "../../templates/descriptionListHTML";
import { TableBodyHTML } from "../../templates/Table";

const TenantView = (params) => {
  const { tenant, directDebit, searching, searchingTenant } = params;

  if (searching === "loading") {
    return <h4>{TextReferences.TextRef.Searching}</h4>;
  }
  if (searchingTenant === "loading") {
    return <h4>{TextReferences.TextRef.Searching}</h4>;
  }
  if (tenant === undefined) {
    return <h4>{TextReferences.TextRef.NoTenantRecords}</h4>;
  }

  const property = tenant.tenures.filter(
    (ten) => ten.paymentReference === directDebit.paymentReference
  );

  return (
    <>
      <h2>Tenant Details</h2>
      {descriptionList([
        {
          key: "Name",
          val: `${tenant.preferredTitle} ${tenant.preferredFirstName} ${tenant.preferredSurname}`,
        },
        { key: "ID", val: tenant.id },
        { key: "Date of Birth", val: DateFormat(tenant.dateOfBirth) },
      ])}
      <p>
        <Link
          to={`${RouteConstants.TENANT}/${directDebit.targetId}`}
          className="govuk-button lbh-button mt-0"
          data-cy="directDebit-to-edit-link"
        >
          View {`${tenant.preferredFirstName} ${tenant.preferredSurname}`}
        </Link>
      </p>
      <TenantsList data={tenant} targetId={tenant.id} />
      <PropertiesList data={{ tenures: property }} targetId={tenant.id} />
    </>
  );
};

const DirectDebitMaintenance = (params) => {
  const { directDebit } = params;
  const Ref = "DirectDebitMaintenance";
  const maintenance = directDebit?.directDebitMaintenance;

  if (directDebit?.directDebitMaintenance && !maintenance.length) {
    return (
      <>
        <h2>{TextReferences.Titles[Ref]}</h2>
        <p>{TextReferences.TextRef.NothingFound}</p>
      </>
    );
  }

  return (
    <>
      <h2>{TextReferences.Titles[Ref]}</h2>
      <div className="table-wrap">
        <table className="govuk-table lbh-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              {DataReferences[Ref].map((header, key) => {
                return (
                  <th className="govuk-table__header" key={key}>
                    {header.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <TableBodyHTML tableHead={Ref} data={maintenance} />
        </table>
      </div>
    </>
  );
};

const DirectDebitView = () => {
  const params = useParams();
  const history = useHistory();
  const id = params.id ? decodeURIComponent(params.id) : "";
  const [tab, setTab] = useState("status");

  const { data: directDebit, status } = useQuery("directDebitView", () => {
    return Read.DirectDebit({ id });
  });

  const targetId = directDebit?.targetId;
  const { data: tenant, status: searchingTenant } = useQuery(
    "directdebitViewPerson",
    () => {
      return Read.Person({ id: directDebit.targetId });
    },
    {
      enabled: !!targetId,
    }
  );

  const back = (
    <button
      onClick={() => history.goBack()}
      className="mt-0 govuk-button lbh-button lbh-button-secondary"
      style={{ marginLeft: "10px" }}
    >
      {TextReferences.TextRef.Back}
    </button>
  );

  if (status === "loading") {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>{TextReferences.Titles.DirectDebit}</h1>
          <h4>{TextReferences.TextRef.Searching}</h4>
        </div>
        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <p>{back}</p>
        </div>
      </div>
    );
  }

  if (directDebit === undefined) {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>{TextReferences.Titles.DirectDebit}</h1>
          <h4>{TextReferences.TextRef.NothingFound}</h4>
        </div>
        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <p>{back}</p>
        </div>
      </div>
    );
  }

  const statusOptions = ["Cancelled", "Paused"];

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>{TextReferences.Titles.DirectDebit}</h1>
        </div>
        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <p>
            {!statusOptions.includes(directDebit.status) && (
              <Link
                to={`${RouteConstants.DIRECTDEBITSINGLE}/${id}/pause`}
                className="govuk-button lbh-button mt-0"
                data-cy="directDebit-to-pause-link"
              >
                {directDebit.isPaused ? "Unpause" : "Pause"}
              </Link>
            )}

            {!statusOptions.includes(directDebit.status) && (
              <Link
                to={`${RouteConstants.DIRECTDEBITSINGLE}/${id}/edit`}
                className="govuk-button lbh-button mt-0"
                data-cy="directDebit-to-edit-link"
                style={{ marginLeft: "10px" }}
              >
                Edit
              </Link>
            )}
            {back}
          </p>
        </div>
      </div>

      <TabHeadings
        titles={{
          status: "Status Information",
          account: "Account Holder",
          financial: "Financial Details",
          bank: "Bank Details",
          maintenance: "Direct Debit Maintenance",
          tenant: "Tenant & Property",
        }}
        tab={tab}
        setTab={setTab}
      />

      <div
        className="tab_status"
        style={{ display: tab === "status" ? "block" : "none" }}
      >
        <h2>Status Information</h2>
        {descriptionList([
          { key: "ID", val: directDebit.id },
          { key: "Target ID", val: directDebit.targetId },
          { key: "Status", val: directDebit.status },
          { key: "Paused", val: directDebit.isPaused ? "Yes" : "No" },
          { key: "Created Date", val: DateFormat(directDebit.createdDate) },
          { key: "Updated Date", val: DateFormat(directDebit.updatedDate) },
          {
            key: "Cancellation Date",
            val: DateFormat(directDebit.cancellationDate),
          },
          {
            key: "First Payment Date",
            val: DateFormat(directDebit.firstPaymentDate),
          },
          { key: "Type", val: directDebit.targetType },
        ])}
      </div>

      <div
        className="tab_account"
        style={{ display: tab === "account" ? "block" : "none" }}
      >
        <h2>Account Holder</h2>
        {descriptionList([
          { key: "Acc", val: directDebit.acc },
          { key: "Account Holder", val: directDebit.accountHolder },
          { key: "Account Number", val: directDebit.accountNumber },
          { key: "Service User Number", val: directDebit.serviceUserNumber },
        ])}
      </div>

      <div
        className="tab_financial"
        style={{ display: tab === "financial" ? "block" : "none" }}
      >
        <h2>Financial Details</h2>
        {descriptionList([
          { key: "Reference", val: directDebit.reference },
          { key: "Amount", val: CurrencyFormat(directDebit.amount) },
          {
            key: "Additional Amount",
            val: CurrencyFormat(directDebit.additionalAmount),
          },
          { key: "Fixed Amount", val: CurrencyFormat(directDebit.fixedAmount) },
          { key: "Fund", val: directDebit.fund },
          {
            key: "Preferred Date",
            val: TextReferences.CollectionDates[directDebit.preferredDate],
          },
          { key: "Payment Reference (PRN)", val: directDebit.paymentReference },
          { key: "Trans", val: directDebit.trans },
        ])}
      </div>

      <div
        className="tab_bank"
        style={{ display: tab === "bank" ? "block" : "none" }}
      >
        <h2>Bank Details</h2>
        {descriptionList([
          { key: "To", val: directDebit.bankOrBuildingSocietyTo },
          { key: "Branch Sort", val: directDebit.branchSortCode },
          { key: "Bank Account Number", val: directDebit.accountNumber },
          { key: "Bank Name", val: directDebit.bankOrBuildingSocietyName },
          {
            key: "Bank Address",
            val: `${directDebit.bankOrBuildingSocietyAddress1} ${directDebit.bankOrBuildingSocietyAddress2} ${directDebit.bankOrBuildingSocietyAddress3} ${directDebit.bankOrBuildingSocietyPostcode}`,
          },
        ])}
      </div>

      <div
        className="tab_maintenance"
        style={{ display: tab === "maintenance" ? "block" : "none" }}
      >
        <DirectDebitMaintenance directDebit={directDebit} />
      </div>

      <div
        className="tab_tenant"
        style={{ display: tab === "tenant" ? "block" : "none" }}
      >
        <TenantView
          tenant={tenant}
          directDebit={directDebit}
          searching={status}
          searchingTenant={searchingTenant}
        />
      </div>
    </>
  );
};

export default DirectDebitView;
