import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { CurrencyFormat, DateFormat } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import { getDirectDebits, getPerson, getProperty } from "../routes/Api";
import * as RouteConstants from "../routes/RouteConstants";
import { descriptionList } from "../templates/descriptionListHTML";

const Property = () => {
  const params = useParams();
  const history = useHistory();
  const PropertyId = params.id ? decodeURIComponent(params.id) : "";
  const [searching, setSearching] = useState(false);
  const [property, setProperty] = useState(undefined);
  const [tenants, setTenants] = useState(undefined);
  const [directDebits, setDirectDebits] = useState(undefined);

  useEffect(() => {
    const searchCall = async () => {
      setSearching(true);
      const response = await getProperty({
        id: PropertyId,
      });
      setProperty(response);
      setSearching(false);
    };
    searchCall();
  }, [PropertyId]);

  useEffect(() => {
    if (property === undefined) {
      return;
    }
    const items = async () => {
      return Promise.all(
        property.householdMembers.map((member) => {
          const person = getPerson(member);
          return person;
        })
      );
    };
    items().then((response) => setTenants(response));

    const directDebit = async () => {
      const response = await getDirectDebits({
        TargetId: PropertyId,
      });
      setDirectDebits(response);
    };
    directDebit();
  }, [property, PropertyId]);

  const tenantsHTML = () => {
    if (tenants === undefined) {
      return;
    }

    return (
      <>
        <h2>{TextReferences.Titles.Tenants}</h2>
        <table className="govuk-table lbh-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th className="govuk-table__header">Name</th>
              <th className="govuk-table__header">Tenancy ID</th>
              <th className="govuk-table__header">Tenancy Type</th>
              <th className="govuk-table__header">Time in property</th>
              <th className="govuk-table__header">Start Date</th>
              <th className="govuk-table__header"> </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {tenants.map((tenant) => {
              const address = tenant.tenures.filter(
                (tenure) => tenure.id === PropertyId
              );
              const directDebitLink = () =>
                history.push(
                  `${RouteConstants.DIRECTDEBIT}/${tenant.id}/create`
                );

              return (
                <tr className="govuk-table__row" key={tenant.id}>
                  <td
                    className="govuk-table__cell"
                    data-address={JSON.stringify(address)}
                  >
                    <Link
                      className="lbh-link"
                      to={`${RouteConstants.TENANT}/${tenant.id}`}
                    >
                      {tenant.preferredTitle
                        ? tenant.preferredTitle
                        : tenant.title}{" "}
                      {tenant.preferredFirstName
                        ? tenant.preferredFirstName
                        : tenant.firstName}{" "}
                      {tenant.preferredSurname
                        ? tenant.preferredSurname
                        : tenant.surname}
                    </Link>
                  </td>
                  <td className="govuk-table__cell">{address[0].uprn}</td>
                  <td className="govuk-table__cell">{address[0].type}</td>
                  <td className="govuk-table__cell">
                    {DateFormat(address[0].startDate)} -{" "}
                    {address[0].endDate
                      ? `${DateFormat(address[0].endDate)}`
                      : "Current"}
                  </td>
                  <td className="govuk-table__cell">
                    {DateFormat(address[0].startDate)}
                  </td>
                  <td className="govuk-table__cell">
                    <Link
                      className="govuk-button lbh-button lbh-button-sm mt-0"
                      to={directDebitLink}
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

  const directDebitView = () => {
    const intro = <h2>{TextReferences.Titles.DirectDebits}</h2>;
    let results = <p>{TextReferences.TextRef.Searching}</p>;
    if (directDebits !== undefined && directDebits.totalCount === 0) {
      results = <p>No direct debits setup yet.</p>;
    }
    if (directDebits !== undefined && directDebits.totalCount !== 0) {
      results = <p>Results.</p>;
    }

    return (
      <>
        {intro}
        {results}
        <hr />
      </>
    );
  };

  const propertyView = () => {
    if (searching) {
      return <h4>{TextReferences.TextRef.Searching}</h4>;
    }
    if (property === undefined) {
      return;
    }
    if (property === null) {
      return <h4>{TextReferences.TextRef.NoTenantRecords}</h4>;
    }

    const TotalCharge = () => {
      if (!property.charges) {
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
        <h1>
          {TextReferences.Titles.Property}: {property.tenuredAsset.fullAddress}
        </h1>
        <p>ID: {property.id}</p>
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
          { key: "PRN", val: property.paymentReference },
          { key: "Tenancy Type", val: property.tenureType.description },
          {
            key: "Tenancy Start Date",
            val: DateFormat(property.startOfTenureDate),
          },
          {
            key: "Property Reference #",
            val: property.tenuredAsset.propertyReference,
          },
        ])}
        {directDebitView()}
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
