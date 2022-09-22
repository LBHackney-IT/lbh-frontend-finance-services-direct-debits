import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Form from "../../references/Form";
import * as TextReferences from "../../references/TextReferences";
import * as Create from "../../services/Create";

const DirectDebitCreate = () => {
  const params = useParams();
  const history = useHistory();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";
  const PaymentRef = params.prn ? decodeURIComponent(params.prn) : "";

  const [sentResp, setSentResp] = useState(undefined);
  const [errors, setErrors] = useState([]);
  const [directDebits, setDirectDebits] = useState({
    targetType: "Tenant",
    targetId: TenantId, // 3fa85f64-5717-4562-b3fc-2c963f66afa6
    accountHolder: "",
    reference: "",
    paymentReference: PaymentRef,
    bankAccountNumber: "",
    branchSortCode: "",
    serviceUserNumber: "",
    bankOrBuildingSocietyTo: "Hackney",
    bankOrBuildingSocietyName: "",
    bankOrBuildingSocietyAddress1: "",
    bankOrBuildingSocietyAddress2: "",
    bankOrBuildingSocietyAddress3: "",
    bankOrBuildingSocietyPostcode: "",
    additionalAmount: 0,
    overrideAmount: null,
    firstPaymentDate: new Date(), // 2022-07-22T16:04:44.333Z
    preferredDate: 1,
  });

  const [validate, setValidate] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(directDebits);
    Create.addDirectDebit(directDebits).then((data) => setSentResp(data));
  };

  if (sentResp !== undefined && sentResp.id) {
    navigate(-1);
  }

  if (sentResp !== undefined && sentResp.errors) {
    setErrors(
      <div className="mt-2">
        {Object.keys(sentResp.errors).map((err, key) => {
          return (
            <p key={key} className="govuk-error-message lbh-error-message">
              <span className="govuk-visually-hidden">Error:</span>{" "}
              {sentResp.errors[err]}
            </p>
          );
        })}
      </div>
    );
    window.scrollTo(0, 0);
    setSentResp(undefined);
  }

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>{TextReferences.Titles.DirectDebitForm}</h1>
        </div>
        <div
          className="govuk-grid-column-one-thirds"
          style={{ textAlign: "right" }}
        >
          <button
            onClick={() => history.push(-1)}
            className="mt-0 govuk-button lbh-button lbh-button-secondary"
          >
            {TextReferences.TextRef.Back}
          </button>
        </div>
      </div>
      {errors}
      <Form
        fields={TextReferences.DirectDebitFormFields}
        data={directDebits}
        setData={setDirectDebits}
        validate={validate}
        setValidate={setValidate}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DirectDebitCreate;
