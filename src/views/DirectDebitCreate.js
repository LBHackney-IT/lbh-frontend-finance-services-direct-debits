import React, { useState } from "react"; // useEffect
import { useParams } from "react-router-dom"; // useParams

import Form from "../references/Form";
import * as TextReferences from "../references/TextReferences";
import { addDirectDebit } from "../routes/Api";

const DirectDebitCreate = () => {
  const params = useParams();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";

  const [directDebits, setDirectDebits] = useState({
    targetType: "Tenant",
    targetId: TenantId, // 3fa85f64-5717-4562-b3fc-2c963f66afa6
    accountHolder: "",
    paymentReference: "",
    bankAccountNumber: "",
    branchSortCode: "",
    serviceUserNumber: "",
    bankOrBuildingSocietyTo: "Hackney",
    bankOrBuildingSocietyName: "",
    bankOrBuildingSocietyAddress1: "",
    bankOrBuildingSocietyAddress2: "",
    bankOrBuildingSocietyAddress3: "",
    bankOrBuildingSocietyPostcode: "",
    additionalAmount: null,
    overrideAmount: null,
    firstPaymentDate: "2022-07-22T16:04:44.333Z", // 2022-07-22T16:04:44.333Z
    preferredDate: 1,
  });

  const [validate, setValidate] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    addDirectDebit(directDebits);
  };

  return (
    <>
      <h1>{TextReferences.Titles.DirectDebitForm}</h1>
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
