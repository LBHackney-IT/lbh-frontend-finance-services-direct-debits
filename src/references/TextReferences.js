const Titles = {
  Home: "Direct Debit",
  DirectDebit: "Direct Debit",
  DirectDebits: "Direct Debits",
  DirectDebitForm: "Direct Debit Form",
  DirectDebitMaintenance: "Direct Debit Maintenance",
  Tenants: "Tenants",
  Tenant: "Tenant",
  TenantForm: "Tenant Form",
  Property: "Property",
  Properties: "Properties",
  Login: "Sign in",
};

const TextRef = {
  Back: "Back",
  Edit: "Edit",
  Placeholder: "0123456789",
  SearchResults: "Search Results",
  Search: "Search",
  Searching: "Searching...",
  NothingFound: "No data was found.",
  NoTenantRecords: "No tenant records found for ",
  Transactions: "Transactions",
  LastTransactions: "Last Transactions",
  NoTransactions: "No transactions to show.",
  NoPropertiesFound: "No properties to show.",
  StartLabel: "Start:",
  EndLabel: "End:",
  SignInButton: "Sign in with Google",
  Login: "Sign in",
  Logout: "Sign out",
  ExportCSV: "Export CSV",
  AllPaymentsAndArrears: "See all payments and arrers",
  TenantTitle: "Tenant Details",
  Tenant: "Tenant",
  TenantId: "Tenancy ID",
  CurrentBalance: "Current Balance",
  ContactInfomation: "Contact information",
  AddDirectDebit: "Add Direct Debit",
  Tenure: "Tenure",
  Financial: "Financial",
  TotalCharges: "Total Charges",
};

const HousingSearch = [
  { value: "Tenant", text: "Tenant" },
  { value: "Leasehold", text: "Leasehold" },
]; // 0 = Leaseholder / 1 = Tenant

const CollectionDates = {
  1: "1st of the month",
  8: "8th of the month",
  16: "16th of the month",
  25: "25th of the month",
};
const CollectionDatesArray = [
  [1, "1st of the month"],
  [8, "8th of the month"],
  [16, "16th of the month"],
  [25, "25th of the month"],
];

const DirectDebitFormFields = [
  [
    { field: "title", text: "Bank Details" },
    {
      field: "input",
      required: true,
      type: "text",
      name: "accountHolder",
      label: "Name(s) of account holder(s)",
      dataCy: "directDebitForm-accountHolder-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "bankAccountNumber",
      label: "Bank / building society account number",
      dataCy: "directDebitForm-bankAccountNumber-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "branchSortCode",
      label: "Branch sort code",
      dataCy: "directDebitForm-branchSortCode-input",
    },
  ],
  [
    {
      field: "input",
      required: true,
      type: "text",
      name: "serviceUserNumber",
      label: "Service user number",
      dataCy: "directDebitForm-serviceUserNumber-input",
    },
  ],
  [
    {
      field: "input",
      required: true,
      type: "text",
      name: "reference",
      label: "Reference",
      dataCy: "directDebitForm-reference-input",
    },
  ],
  [
    { field: "title", text: "Bank / building Society" },
    {
      field: "input",
      required: true,
      type: "text",
      name: "bankOrBuildingSocietyTo",
      label: "To",
      dataCy: "directDebitForm-bankOrBuildingSocietyTo-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "bankOrBuildingSocietyName",
      label: "Building society name",
      dataCy: "directDebitForm-bankOrBuildingSocietyName-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "bankOrBuildingSocietyAddress1",
      label: "Address",
      dataCy: "directDebitForm-bankOrBuildingSocietyAddress1-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "bankOrBuildingSocietyAddress2",
      dataCy: "directDebitForm-bankOrBuildingSocietyAddress2-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "bankOrBuildingSocietyAddress3",
      dataCy: "directDebitForm-bankOrBuildingSocietyAddress3-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "bankOrBuildingSocietyPostcode",
      label: "Postcode",
      dataCy: "directDebitForm-bankOrBuildingSocietyPostcode-input",
    },
  ],
  [
    { field: "title", text: "Terms" },
    {
      field: "input",
      required: false,
      type: "number",
      name: "additionalAmount",
      label: "Additional amount (for arrears collection)",
      dataCy: "directDebitForm-additionalAmount-input",
    },
    {
      field: "input",
      required: false,
      type: "number",
      name: "overrideAmount",
      label: "Override amount",
      dataCy: "directDebitForm-overrideAmount-input",
    },
    {
      field: "datepicker",
      required: true,
      name: "firstPaymentDate",
      label: "First Payment Date",
      dataCy: "directDebitForm-firstPaymentDate-datepicker",
    },
    {
      field: "select",
      required: false,
      options: CollectionDatesArray,
      name: "preferredDate",
      label: "Preferred date (optional)",
      dataCy: "directDebitForm-preferredDate-select",
    },
  ],
  [
    {
      field: "submit",
      text: "Add Direct Debit",
      dataCy: "directDebitForm-submit",
    },
  ],
];

const DirectDebitEditFormFields = [
  [
    {
      field: "input",
      required: false,
      type: "number",
      name: "additionalAmount",
      label: "Additional Amount",
      dataCy: "directDebitEditForm-additionalAmount-input",
    },
    {
      field: "input",
      required: false,
      type: "number",
      name: "fixedAmount",
      label: "Fixed Amount",
      dataCy: "directDebitEditForm-fixedAmount-input",
    },
    {
      field: "select",
      required: false,
      options: CollectionDatesArray,
      name: "preferredDate",
      label: "Preferred date (optional)",
      dataCy: "directDebitEditForm-preferredDate-select",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "reason",
      label: "Reason",
      dataCy: "directDebitEditForm-reason-input",
    },
  ],
  [
    {
      field: "submit",
      text: "Update Direct Debit",
      dataCy: "directDebitEditForm-submit",
    },
  ],
];

const DirectDebitPauseFormFields = [
  [
    {
      field: "input",
      required: true,
      type: "text",
      name: "status",
      label: "Status",
      disabled: true,
      dataCy: "directDebitPauseForm-status-input",
    },
    {
      field: "input",
      required: true,
      type: "number",
      name: "pauseDuration",
      label: "Pause Duration (months)",
      dataCy: "directDebitPauseForm-pauseDuration-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "reason",
      label: "Reason",
      dataCy: "directDebitPauseForm-reason-input",
    },
  ],
  [
    {
      field: "submit",
      text: "Update Direct Debit",
      dataCy: "directDebitPauseForm-submit",
    },
  ],
];

const DirectDebitManualSubmit = [
  [
    {
      field: "select",
      required: false,
      options: CollectionDatesArray,
      name: "preferredDate",
      label: "Preferred date (optional)",
    },
  ],
  [{ field: "submit", text: "Send to PTX" }],
];

const TenantFormFields = [
  [
    { field: "title", text: "Person Details" },
    {
      field: "input",
      required: true,
      type: "text",
      name: "title",
      label: "Title",
      dataCy: "tenantForm-title-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "firstName",
      label: "First Name",
      dataCy: "tenantForm-firstName-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "surname",
      label: "Surname",
      dataCy: "tenantForm-surname-input",
    },
    {
      field: "datepicker",
      required: true,
      name: "dateOfBirth",
      label: "Date of Birth",
      dataCy: "tenantForm-dateOfBirth-datepicker",
    },
  ],
  [
    { field: "title", text: "Preferred Details" },
    {
      field: "input",
      required: true,
      type: "text",
      name: "preferredTitle",
      label: "Preferred Title",
      dataCy: "tenantForm-preferredTitle-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "preferredFirstName",
      label: "Preferred First Name",
      dataCy: "tenantForm-preferredFirstName-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "preferredMiddleName",
      label: "Preferred Middle Name",
      dataCy: "tenantForm-preferredMiddleName-input",
    },
    {
      field: "input",
      required: true,
      type: "text",
      name: "preferredSurname",
      label: "Preferred Surname",
      dataCy: "tenantFormpreferredSurname-input",
    },
  ],
  [
    { field: "title", text: "Details" },
    {
      field: "input",
      required: true,
      type: "text",
      name: "reason",
      label: "Reason",
      dataCy: "tenantForm-reason-input",
    },
  ],
  [{ field: "submit", text: "Create Tenant", dataCy: "tenantForm-submit" }],
];

export {
  Titles,
  TextRef,
  CollectionDates,
  CollectionDatesArray,
  HousingSearch,
  DirectDebitFormFields,
  DirectDebitEditFormFields,
  DirectDebitPauseFormFields,
  DirectDebitManualSubmit,
  TenantFormFields,
};
