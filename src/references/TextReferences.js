const Titles = {
  Reports: 'Reports',
  ReportsAccountBalance: 'Account Balance',
  ReportsCash: 'Cash',
  ReportsSuspenseAccounts: 'Suspense Accounts',
  ReportHousingBenefitAcademy: 'Housing Benefit Academy',
  ReportCharges: 'Charges',
  OperatingBalances: 'Operating Balances',
  IndividualLookup: 'Individual Lookup',
  Homepage: 'Hackney Housing Finance',
  IndividualLookupPayments: 'Arrears view',
  BatchLog: 'Batch Logs',

  Login: 'Sign in',
}

const TextRef = {
  Placeholder: '0123456789',
  Search: 'Search',
  Searching: 'Searching...',
  NothingFound: 'No data was found.',
  NoTenantRecords: 'No tenant records found for ',
  Transactions: 'Transactions',
  LastTransactions: 'Last Transactions',
  NoTransactions: 'No transactions to show.',
  StartLabel: 'Start:',
  EndLabel: 'End:',
  SignInButton: 'Sign in with Google',
  Login: 'Sign in',
  Logout: 'Sign out',
  ExportCSV: 'Export CSV',
  AllPaymentsAndArrears: 'See all payments and arrers',
  TenantTitle: 'Tenant Details',
  Tenant: 'Tenant',
  TenantId: 'Tenancy ID',
  CurrentBalance: 'Current Balance',
  ContactInfomation: 'Contact information',
  YearLabel: 'Year',
  GenerateReport: 'Generate Report',
  ReportMessage: 'Reports are added to a que every 30 minutes. Status will be failed until they have finished generating.',
}

const ReportSuspenseAccounts = [
  { value: '', text: 'Select Account Type' },
  { value: 'RENT', text: 'Rent' },
  { value: 'LH', text: 'Leasehold' },
  { value: 'HB', text: 'Housing Benefit' },
]

const ReportAccountBalance_rentGroupOptions = [
  { value: '', text: 'Select Rent Group' },
  { value: 'GPS', text: 'Gar & Park HRA' },
  { value: 'HGF', text: 'Housing Gen Fund' },
  { value: 'HRA', text: 'Housing Revenue' },
  { value: 'LMW', text: 'LH Major Works ' },
  { value: 'LSC', text: 'LH Serv Charges' },
  { value: 'TAG', text: 'Temp Acc Gen Fun' },
  { value: 'TAH', text: 'Temp Accom HRA' },
  { value: 'TRA', text: 'Travel Gen Fund' },
]

const ReportAccountBalance_groupOptions = [
  { value: '', text: 'Select Group' },
  { value: 'LH', text: 'Leasehold' },
  { value: 'RENT', text: 'Rent' },
]

const IndividualLookupSearchOptions = [
  { value: 'rentAccount', text: 'by Rent Account Number' },
  { value: 'tenancyAgreementRef', text: 'by Tenancy Agreement Reference' },
  { value: 'householdRef', text: 'by Household Reference' }, // DOES THIS WORK
]

const ReportCharges_RentGroupOptions = [
  { value: '', text: 'Select Rent Group' },
  { value: 'GPS', text: 'Gar & Park HRA' },
  { value: 'HGF', text: 'Housing Gen Fund' },
  { value: 'HRA', text: 'Housing Revenue' },
  { value: 'LMW', text: 'LH Major Works ' },
  { value: 'LSC', text: 'LH Serv Charges' },
  { value: 'TAG', text: 'Temp Acc Gen Fun' },
  { value: 'TAH', text: 'Temp Accom HRA' },
  { value: 'TRA', text: 'Travel Gen Fund' },
]

const ReportCharges_GroupOptions = [
  { value: '', text: 'Select Group' },
  { value: 'LH', text: 'Leasehold' },
  { value: 'RENT', text: 'Rent' },
]

export {
  Titles,
  TextRef,
  ReportSuspenseAccounts,
  ReportAccountBalance_rentGroupOptions,
  ReportAccountBalance_groupOptions,
  IndividualLookupSearchOptions,
  ReportCharges_RentGroupOptions,
  ReportCharges_GroupOptions,
}