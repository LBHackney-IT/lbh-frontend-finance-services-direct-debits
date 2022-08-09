import React from "react";

import * as TextReferences from "../references/TextReferences";

const TenantsList = (params) => {
  const { data } = params;
  const h2 = <h2>{TextReferences.Titles.Tenants}</h2>;

  if (data === undefined) {
    return (
      <>
        {h2}
        <p>{TextReferences.TextRef.Searching}</p>
      </>
    );
  }

  if (data !== undefined && data.lenght) {
    return (
      <>
        {h2}
        <p>{TextReferences.TextRef.NoTenantRecords}</p>
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
              <th className="govuk-table__header">Name</th>
              <th className="govuk-table__header">Tenancy ID</th>
              <th className="govuk-table__header">Tenancy Type</th>
              <th className="govuk-table__header">Time in property</th>
              <th className="govuk-table__header">Start Date</th>
              <th className="govuk-table__header"> </th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default TenantsList;
