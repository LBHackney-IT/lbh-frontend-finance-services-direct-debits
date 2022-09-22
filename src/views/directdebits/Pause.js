import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Form from "../../references/Form";
import * as RouteConstants from "../../references/RouteConstants";
import * as TextReferences from "../../references/TextReferences";
import * as Read from "../../services/Read";
import * as Update from "../../services/Update";

const DirectDebitPause = () => {
  const params = useParams();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";

  const [searching, setSearching] = useState(true);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const searchCall = async () => {
      const request = await Read.DirectDebit({ id: TenantId });
      setData({
        id: request?.id,
        status: "Paused",
        pauseDuration: 1, // MONTHS
        reason: request?.reason,
      });
      setSearching(false);
    };
    searchCall();
  }, [TenantId]);

  const [validate, setValidate] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    Update.pauseDirectDebit(data);
  };

  const h1 = <h1>Pause {TextReferences.Titles.DirectDebit}</h1>;
  const back = (
    <Link
      to={`${RouteConstants.DIRECTDEBITSINGLE}/${TenantId}`}
      className="govuk-button lbh-button mt-0"
      data-cy="directDebitPause-back-link"
    >
      {TextReferences.TextRef.Back}
    </Link>
  );

  if (searching) {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {h1}
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
    return;
  }

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">{h1}</div>
        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <p>{back}</p>
        </div>
      </div>
      <Form
        fields={TextReferences.DirectDebitPauseFormFields}
        data={data}
        setData={setData}
        validate={validate}
        setValidate={setValidate}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DirectDebitPause;
