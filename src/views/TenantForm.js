import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import Form from "../references/Form";
import * as TextReferences from "../references/TextReferences";
import * as Create from "../services/Create";
import * as Read from "../services/Read";

const TenantForm = () => {
  const params = useParams();
  const type = params.type ? decodeURIComponent(params.type) : "Tenant";
  const TenantId = params.id ? decodeURIComponent(params.id) : "";

  const [data, setData] = useState({
    title: "",
    firstName: "",
    surname: "",
    middleName: "",
    preferredTitle: "",
    preferredFirstName: "",
    preferredMiddleName: "",
    preferredSurname: "",
    dateOfBirth: "",
    reason: "",
    tenures: [],
    personTypes: [type],
  });

  const { status } = useQuery("search", async () => {
    const response = await Read.Person({ id: TenantId });
    setData(response);
  });

  const [validate, setValidate] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const post = await Create.postPerson(data);
    console.log(post);
  };

  return (
    <>
      <h1>{TextReferences.Titles.TenantForm}</h1>
      {status === "loading" ? (
        <h4>{TextReferences.TextRef.Searching}</h4>
      ) : (
        <Form
          fields={TextReferences.TenantFormFields}
          data={data}
          setData={setData}
          validate={validate}
          setValidate={setValidate}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default TenantForm;
