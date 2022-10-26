import React from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";

import DirectDebitList from "../fragments/DirectDebitList";
import { CurrencyFormat, DateFormat } from "../references/Functions";
import * as RouteConstants from "../references/RouteConstants";
import * as TextReferences from "../references/TextReferences";
import * as Read from "../services/Read";
import { descriptionList } from "../templates/descriptionListHTML";

const Property = () => {
  const params = useParams();
  const history = useHistory();
  const PropertyId = params.id ? decodeURIComponent(params.id) : "";

  const { data: property, status } = useQuery("search", async () => {
    return Read.Property({ id: PropertyId });
  });

  const prn = property?.paymentReference;

  const { data: directDebits } = useQuery(
    "directDebit",
    async () => {
      return Read.DirectDebitPRN({ prn: property.paymentReference });
    },
    {
      enabled: !!prn,
    }
  );

  const tenantsHTML = () => {

    console.log(property)

    if (property === undefined) {
      return <h4>{TextReferences.TextRef.NothingFound}</h4>;
    }

    if (property?.householdMembers && property.householdMembers.length === 0) {
      return <h4>{TextReferences.TextRef.Searching}</h4>;
    }

    return (
      <>
        <h2>{TextReferences.Titles.Tenants}</h2>
        <table className="govuk-table lbh-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th className="govuk-table__header">Name</th>
              <th className="govuk-table__header">Tenancy Type</th>
              <th className="govuk-table__header"> </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {property.householdMembers.map((tenant) => {
              return (
                <tr className="govuk-table__row" key={tenant.id}>
                  <td className="govuk-table__cell">
                    <Link
                      className="lbh-link"
                      aria-label="Tenant ID"
                      to={`${RouteConstants.TENANT}/${tenant.id}`}
                      data-cy="propertyList-to-single-link"
                    >
                      {tenant.fullName}
                    </Link>
                  </td>
                  <td className="govuk-table__cell">
                    {tenant.personTenureType}
                  </td>
                  <td className="govuk-table__cell">
                    <Link
                      to={`${RouteConstants.DIRECTDEBITSINGLE}/${tenant.id}/${
                        property.paymentReference ?? 0
                      }/create`}
                      className="govuk-button lbh-button lbh-button-sm mt-0"
                      title={TextReferences.TextRef.AddDirectDebit}
                      data-cy="propertyList-to-directDebitCreate-link"
                    >
                      {TextReferences.TextRef.AddDirectDebit}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  const propertyView = () => {
    const back = (
      <button
        onClick={() => history.goBack()}
        className="mt-0 govuk-button lbh-button lbh-button-secondary"
      >
        {TextReferences.TextRef.Back}
      </button>
    );

    if (status === "loading") {
      return (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1>{TextReferences.Titles.Property}</h1>
            <h4>{TextReferences.TextRef.Searching}</h4>
          </div>
          <div
            className="govuk-grid-column-one-thirds"
            style={{ textAlign: "right" }}
          >
            {back}
          </div>
        </div>
      );
    }

    if (property === undefined) {
      return;
    }
    if (property === null) {
      return <h4>{TextReferences.TextRef.NoTenantRecords}</h4>;
    }

    const TotalCharge = () => {
      if (property?.charges) {
        return 0;
      }
      return (
        property.charges.combinedRentCharges +
        property.charges.combinedServiceCharges +
        property.charges.currentBalance +
        property.charges.originalRentCharge +
        property.charges.originalServiceCharge +
        property.charges.otherCharges +
        property.charges.rent +
        property.charges.serviceCharge +
        property.charges.tenancyInsuranceCharge
      );
    };

    return (
      <>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1>{property?.tenuredAsset?.fullAddress}</h1>
          </div>
          <div
            className="govuk-grid-column-one-thirds"
            style={{ textAlign: "right" }}
          >
            <p>{back}</p>
          </div>
        </div>
        {property.charges && (
          <>
            <h2>{TextReferences.TextRef.Financial}</h2>
            {descriptionList([
              {
                key: "Current Balance",
                val: CurrencyFormat(property.charges.currentBalance),
              },
              { key: "Rent", val: CurrencyFormat(property.charges.rent) },
              { key: "Year to Date", val: "" },
              {
                key: `${property.charges.billingFrequency} ${TextReferences.TextRef.TotalCharges}`,
                val: CurrencyFormat(TotalCharge()),
              },
              {
                key: "Service Charge",
                val: CurrencyFormat(property.charges.serviceCharge),
              },
              { key: "Yearly Rent Debits", val: "" },
              { key: "Housing Benefits", val: "" },
            ])}
          </>
        )}
        <h2>{TextReferences.TextRef.Tenure}</h2>
        {descriptionList([
          { key: "PRN", val: property?.paymentReference },
          { key: "Tenancy Type", val: property?.tenureType?.description },
          {
            key: "Tenancy Start Date",
            val: DateFormat(property?.startOfTenureDate),
          },
          {
            key: "Property Reference #",
            val: property?.tenuredAsset?.propertyReference,
          },
          { key: "Start Date", val: DateFormat(property?.startOfTenureDate) },
        ])}
        <DirectDebitList
          data={
            Array.isArray(directDebits)
              ? { results: [...directDebits] }
              : undefined
          }
        />
      </>
    );
  };
  return (
    <>
      {propertyView()}
      {tenantsHTML()}
    </>
  );
};

export default Property;
