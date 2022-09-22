import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useNavigate

import Form from "../references/Form";
import * as TextReferences from "../references/TextReferences";
import * as Create from "../services/Create";
import * as Read from "../services/Read";

const TenantForm = () => {
  const params = useParams();
  const type = params.type ? decodeURIComponent(params.type) : "Tenant";
  const TenantId = params.id ? decodeURIComponent(params.id) : "";
  const [searching, setSearching] = useState(false);

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

  useEffect(() => {
    const searchCall = async () => {
      setSearching(true);
      const response = await Read.Person({
        id: TenantId,
      });
      setData(response);
      setSearching(false);
    };
    searchCall();
  }, [TenantId]);

  const [validate, setValidate] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(data)
    const post = await Create.postPerson(data);
    console.log(post);
  };

  return (
    <>
      <h1>{TextReferences.Titles.TenantForm}</h1>
      {searching ? (
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
