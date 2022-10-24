import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import Form from "../../references/Form";
import * as RouteConstants from "../../references/RouteConstants";
import * as TextReferences from "../../references/TextReferences";
import * as Read from "../../services/Read";
import * as Update from "../../services/Update";

const DirectDebitEdit = () => {
  const params = useParams();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";
  const [data, setData] = useState(undefined);

  const { status } = useQuery("search", async () => {
    const request = await Read.DirectDebit({ id: TenantId });
    setData({
      id: request?.id,
      additionalAmount: request?.additionalAmount
        ? Number(request?.additionalAmount)
        : null,
      preferredDate: request?.preferredDate
        ? Number(request?.preferredDate)
        : null,
      reason: request?.reason,
      fixedAmount: request?.fixedAmount ? Number(request?.fixedAmount) : null,
    });
  });

  const [validate, setValidate] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    Update.updateDirectDebit(data);
  };

  const h1 = <h1>Edit {TextReferences.Titles.DirectDebit}</h1>;
  const editMsg = <p>You are currently editing Direct Debit {TenantId}.</p>;
  const back = (
    <Link
      to={`${RouteConstants.DIRECTDEBITSINGLE}/${TenantId}`}
      className="govuk-button lbh-button lbh-button-secondary"
      style={{ marginTop: 0 }}
      data-cy="directDebit-edit-back-link"
    >
      {TextReferences.TextRef.Back}
    </Link>
  );

  if (status === "loading") {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {h1}
          {editMsg}
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

  if (data === undefined) {
    return <h4>{TextReferences.TextRef.NothingFound}</h4>;
  }

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {h1}
          {editMsg}
        </div>
        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <p>{back}</p>
        </div>
      </div>
      <Form
        fields={TextReferences.DirectDebitEditFormFields}
        data={data}
        setData={setData}
        validate={validate}
        setValidate={setValidate}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DirectDebitEdit;
