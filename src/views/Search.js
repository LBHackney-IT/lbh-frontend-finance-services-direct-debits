import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import { CurrencyFormat } from "../references/Functions";
import Pagination from "../references/Pagination";
import * as RouteConstants from "../references/RouteConstants";
import * as TextReferences from "../references/TextReferences";
import * as Read from "../services/Read";

const Tenants = () => {
  const Ref = "HousingSearch";
  const params = useParams();
  const search = params.search ? decodeURIComponent(params.search) : "";
  const page = params.page ? Number(params.page) : 1;
  const Type = params.type ? params.type : "Tenant";

  const { data, status } = useQuery("search", async () => {
    let personType = 0;
    TextReferences[Ref].forEach((val, key) => {
      if (Type === val.value) {
        personType = key;
      }
    });
    return Read.HousingSearchTenant({
      personType,
      page,
      search,
    });
  });

  const searchResults = () => {
    if (status === "loading") {
      return <h4>{TextReferences.TextRef.Searching}</h4>;
    }
    if (data === undefined || data?.results?.persons.length === 0) {
      const searchTypeName = TextReferences[Ref].filter(
        (opt) => Type === opt.value
      );
      return (
        <h4>
          {TextReferences.TextRef.NoTenantRecords} &quot;{Type}&quot; in &quot;
          {searchTypeName[0].text}&quot;.
        </h4>
      );
    }

    return (
      <>
        <table className="govuk-table lbh-table">
          <thead>
            <tr className="govuk-table__row">
              <th className="govuk-table__header">Name</th>
              <th className="govuk-table__header">Tenure Type</th>
              <th className="govuk-table__header">Total Balance</th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {data.results.persons.map((tenant) => {
              return (
                <Fragment key={tenant.id}>
                  <tr className={`govuk-table__row ${tenant.id}`}>
                    <td className="govuk-table__cell">
                      <Link
                        className="lbh-link"
                        data-cy={`tenant-search-to-single-link-${tenant.id}`}
                        to={`/${Type}/${tenant.id}`}
                      >
                        <strong>
                          {tenant.title} {tenant.preferredFirstname}{" "}
                          {tenant.preferredSurname}
                        </strong>
                      </Link>
                    </td>
                    <td className="govuk-table__cell">
                      {tenant.personTypes.join(" / ")} ({Type})
                    </td>
                    <td className="govuk-table__cell">
                      {CurrencyFormat(tenant.totalBalance)}
                    </td>
                  </tr>
                  {/* {tenant.tenures.length && tenant.tenures.map(tenure => {
                return <tr key={tenure.id} className={`govuk-table__row ${tenure.id}`}>
                  <td className='govuk-table__cell'>
                    <Link 
                      className='lbh-link' 
                      to={`${RouterConstants.PROPERTY}/${tenure.id}`}
                    >{tenure.assetFullAddress}</Link>
                  </td>
                  <td className='govuk-table__cell'>{tenure.type}</td>
                  <td className='govuk-table__cell'>{tenure.paymentReference}</td>
                  <td className='govuk-table__cell'>{CurrencyFormat(tenure.totalBalance)}</td>
                </tr>
              })} */}
                </Fragment>
              );
            })}
          </tbody>
        </table>

        <Pagination
          total={data.total}
          page={page}
          prefix={`${RouteConstants.SEARCH}/${Type}/${search}`}
          divided={
            Math.round(data.total / 12) > 1 ? Math.round(data.total / 12) : 1
          }
        />
      </>
    );
  }; // SearchResults

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one">
          <h1>
            {TextReferences.TextRef.SearchResults}: {Type} for &quot;{search}
            &quot;
          </h1>
          <hr />
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one">{searchResults()}</div>
      </div>
    </>
  );
};

export default Tenants;
