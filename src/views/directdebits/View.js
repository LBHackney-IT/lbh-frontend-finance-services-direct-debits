import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"; // Link

import PropertiesList from "../../fragments/PropertiesList";
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

  if (searching) {
    return <h4>{TextReferences.TextRef.Searching}</h4>;
  }
  if (searchingTenant) {
    return <h4>{TextReferences.TextRef.Searching}</h4>;
  }
  if (tenant === null) {
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
  const maintenance = directDebit.directDebitMaintenance;

  if (!maintenance.length) {
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
  const navigate = useLocation();
  const id = params.id ? decodeURIComponent(params.id) : "";

  const [searching, setSearching] = useState(true);
  const [directDebit, setDirectDebit] = useState(undefined);

  const [searchingTenant, setSearchingTenant] = useState(true);
  const [tenant, setTenant] = useState(undefined);

  // const [searchingProperty, setSearchingProperty] = useState(true)
  // const [property, setProperty] = useState(undefined)

  useEffect(() => {
    const searchCall = async () => {
      const call = await Read.DirectDebit({ id });
      setDirectDebit(call);
      setSearching(false);
    };
    searchCall();
  }, [id]);

  useEffect(() => {
    if (searching || directDebit === undefined || directDebit === null) {
      return;
    }

    const searchPerson = async () => {
      const callPerson = await Read.Person({ id: directDebit.targetId });
      setTenant(callPerson);
      setSearchingTenant(false);
    };
    searchPerson();
  }, [searching, directDebit]);

  const back = (
    <button
      onClick={() => navigate(-1)}
      className="mt-0 govuk-button lbh-button lbh-button-secondary"
      style={{ marginLeft: "10px" }}
    >
      {TextReferences.TextRef.Back}
    </button>
  );

  if (searching) {
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

  if (directDebit === undefined || directDebit === null) {
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

      <h2>Account Holder</h2>
      {descriptionList([
        { key: "Acc", val: directDebit.acc },
        { key: "Account Holder", val: directDebit.accountHolder },
        { key: "Account Number", val: directDebit.accountNumber },
        { key: "Service User Number", val: directDebit.serviceUserNumber },
      ])}

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

      <DirectDebitMaintenance directDebit={directDebit} />
      <TenantView
        tenant={tenant}
        directDebit={directDebit}
        searching={searching}
        searchingTenant={searchingTenant}
      />
    </>
  );
};

export default DirectDebitView;
