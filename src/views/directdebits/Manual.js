import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "../../references/Form";
import * as RouteConstants from "../../references/RouteConstants";
import * as TextReferences from "../../references/TextReferences";
import * as Update from "../../services/Update";

const DirectDebitManual = () => {
  const [data, setData] = useState({
    preferredDate: "",
  });
  const [validate, setValidate] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    Update.pauseDirectDebit(data);
  };

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>Submit {TextReferences.Titles.DirectDebit}s Manually</h1>
        </div>
        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <p>
            <Link
              to={`${RouteConstants.DIRECTDEBIT}`}
              className="govuk-button lbh-button mt-0"
              data-cy="manualsubmission-back-link"
            >
              {TextReferences.TextRef.Back}
            </Link>
          </p>
        </div>
      </div>
      <Form
        fields={TextReferences.DirectDebitManualSubmit}
        data={data}
        setData={setData}
        validate={validate}
        setValidate={setValidate}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DirectDebitManual;
