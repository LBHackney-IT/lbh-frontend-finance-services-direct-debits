import * as Calls from "./Api";

const HousingSearchTenant = async (params) => {
  const { personType, search, page } = params;
  return Calls.getCall("HOUSING", "/api/v1/search/persons", {
    personType,
    searchText: search,
    pageSize: 100,
    page,
  });
};

const HousingSearchAsset = async (params) => {
  const { search, page } = params;
  return Calls.getCall("HOUSING", "/api/v1/search/tenures", {
    searchText: search,
    pageSize: 100,
    page,
  });
};

const Tenant = async (params) => {
  const { id } = params;
  return Calls.getCall("ASSET", `/api/v1/assets/${id}`, {});
};

const Property = async (params) => {
  const { id } = params;
  return Calls.getCall("TENURE", `/api/v1/tenures/${id}`, {});
};

const Person = async (params) => {
  const { id } = params;
  return Calls.getCall("PERSON", `/api/v1/persons/${id}`, {});
};

const DirectDebits = async (params) => {
  const { TargetId, currentPage } = params;
  return Calls.getCall("DIRECTDEBIT", "/api/v1/direct-debit", {
    TargetId,
    currentPage,
  });
};

const DirectDebit = async (params) => {
  const { id } = params;
  return Calls.getCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`);
};

const DirectDebitPRN = async (params) => {
  const { prn } = params;
  return Calls.getCall(
    "DIRECTDEBIT",
    `/api/v1/direct-debit/paymentReference/${prn}`
  );
};

export {
  HousingSearchAsset,
  HousingSearchTenant,
  Tenant,
  Property,
  Person,
  DirectDebits,
  DirectDebit,
  DirectDebitPRN,
};
