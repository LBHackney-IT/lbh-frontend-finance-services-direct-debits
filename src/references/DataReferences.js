import * as RouteContents from "./RouteConstants";
import { CollectionDates } from "./TextReferences";

export const DataReferences = {
  ReportSuspenseAccounts: [
    { title: "Reference", sort: "rentReference", classes: "", format: "" },
    {
      title: "Date",
      sort: "transactionDate",
      classes: " govuk-table__header--numeric",
      format: "date",
    },
    {
      title: "Amount",
      sort: "transactionAmount",
      classes: " govuk-table__header--numeric",
      format: "currency",
    },
    { title: "Account", sort: "originalRentAccount", classes: "", format: "" },
    { title: "Group", sort: "rentGroup", classes: "", format: "" },
    { title: "Type", sort: "transactionType", classes: "", format: "" },
  ],
  DirectDebitList: [
    { title: "Bank Acc #", sort: "bankAccountNumber", classes: "", format: "" },
    { title: "Sort Code", sort: "branchSortCode", classes: "", format: "" },
    { title: "Status", sort: "status", classes: "", format: "" },
    // { title: 'ID', sort: 'id', classes: '', format: '' },
    { title: "Account Holder", sort: "accountHolder", classes: "", format: "" },
    { title: "Amount", sort: "amount", classes: "", format: "currency" },
    {
      title: "Additional",
      sort: "additionalAmount",
      classes: "",
      format: "currency",
    },
    { title: "Fixed", sort: "fixedAmount", classes: "", format: "currency" },
    {
      title: " ",
      sort: "id",
      classes: "",
      format: "link",
      linkPrefix: RouteContents.DIRECTDEBITSINGLE,
      linkText: "View Direct Debit",
      dataCy: "direct-debit-list-to-single-link",
    },
  ],
  DirectDebitMaintenance: [
    { title: "Created Date", sort: "createdDate", classes: "", format: "" },
    { title: "Created By", sort: "createdBy", classes: "", format: "" },
    {
      title: "New Additional Amount",
      sort: "newAdditionalAmount",
      classes: "",
      format: "currency",
    },
    {
      title: "New Fixed Amount",
      sort: "newFixedAmount",
      classes: "",
      format: "currency",
    },
    {
      title: "New Preferred Date",
      sort: "newPreferredDate",
      classes: "",
      format: "reference",
      options: CollectionDates,
    },
    { title: "New Status", sort: "newStatus", classes: "", format: "" },
    { title: "Pause Duration", sort: "pauseDuration", classes: "", format: "" },
    {
      title: "Previous Additional Amount",
      sort: "previousAdditionalAmount",
      classes: "",
      format: "currency",
    },
    {
      title: "Previous Fixed Amount",
      sort: "previousFixedAmount",
      classes: "",
      format: "currency",
    },
    {
      title: "Previous Preferred Date",
      sort: "previousPreferredDate",
      classes: "",
      format: "reference",
      options: CollectionDates,
    },
    {
      title: "Previous Status",
      sort: "previousStatus",
      classes: "",
      format: "",
    },
    { title: "Reason", sort: "reason", classes: "", format: "" },
  ],
};
