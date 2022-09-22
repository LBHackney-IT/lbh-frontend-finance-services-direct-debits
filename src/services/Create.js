import * as Calls from "./Api";

const addDirectDebit = async (params) => {
  return Calls.postCall("DIRECTDEBIT", `/api/v1/direct-debit/`, params);
};

const postPerson = async (params) => {
  return Calls.postCall("PERSON", `/api/v2/persons`, params);
};

export { addDirectDebit, postPerson };
