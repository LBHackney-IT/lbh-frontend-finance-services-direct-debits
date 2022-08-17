import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Form from "../references/Form";
import * as TextReferences from "../references/TextReferences";
import { getDirectDebits, pauseDirectDebit } from "../routes/Api";
import * as RouteConstants from "../routes/RouteConstants";

const DirectDebitPause = () => {
  const params = useParams();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";

  const [searching, setSearching] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const searchCall = async () => {
      setSearching(true);
      const request = await getDirectDebits({ TargetId: TenantId });
      // console.log(request)
      setData({
        id: request.results[0].id,
        status: "Paused",
        pauseDuration: 1, // MONTHS
        reason: request.results[0].reason,
      });
      setSearching(false);
    };
    searchCall();
  }, [TenantId]);

  const [validate, setValidate] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    pauseDirectDebit(data);
  };

  const directDebitEditForm = () => {
    const h1 = <h1>Pause {TextReferences.Titles.DirectDebit}</h1>;
    const back = (
      <Link
        to={`${RouteConstants.DIRECTDEBIT}/${TenantId}`}
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
      return (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {h1}
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

  return directDebitEditForm();
};

export default DirectDebitPause;
