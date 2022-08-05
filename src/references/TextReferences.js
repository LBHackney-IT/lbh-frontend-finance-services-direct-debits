const Titles = {
  Home: 'Direct Debit',
  DirectDebit: 'Direct Debit',
  DirectDebits: 'Direct Debits',
  DirectDebitForm: 'Direct Debit Form',
  DirectDebitMaintenance: 'Direct Debit Maintenance',
  Tenants: 'Tenants',
  Tenant: 'Tenant',
  TenantForm: 'Tenant Form',
  Property: 'Property',
  Login: 'Sign in',
}

const TextRef = {
  Back: 'Back',
  Edit: 'Edit',
  Placeholder: '0123456789',
  SearchResults: 'Search Results',
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
  AddDirectDebit: 'Add Direct Debit',
  Tenure: 'Tenure',
  Financial: 'Financial',
  TotalCharges: 'Total Charges',
}

const HousingSearch = [
  { value: 'Tenant', text: 'Tenant'},
  { value: 'Leasehold', text: 'Leasehold'},
] // 0 = Leaseholder / 1 = Tenant

const DirectDebitFormFields = [
  [
    { field: 'title', text: 'Bank Details' },
    { field: 'input', required: true, type: 'text', name: 'accountHolder', label: 'Name(s) of account holder(s)' },
    { field: 'input', required: true, type: 'text', name: 'bankAccountNumber', label: 'Bank / building society account number' },
    { field: 'input', required: true, type: 'text', name: 'branchSortCode', label: 'Branch sort code' }
  ], [
    { field: 'input', required: true, type: 'text', name: 'serviceUserNumber', label: 'Service user number' }
  ], [
    { field: 'input', required: true, type: 'text', name: 'paymentReference', label: 'Payment Reference' }
  ], [
    { field: 'title', text: 'Bank / building Society' },
    { field: 'input', required: true, type: 'text', name: 'bankOrBuildingSocietyTo', label: 'To' },
    { field: 'input', required: true, type: 'text', name: 'bankOrBuildingSocietyName', label: 'Building society name' },
    { field: 'input', required: true, type: 'text', name: 'bankOrBuildingSocietyAddress1', label: 'Address' },
    { field: 'input', required: true, type: 'text', name: 'bankOrBuildingSocietyAddress2' },
    { field: 'input', required: true, type: 'text', name: 'bankOrBuildingSocietyAddress3' },
    { field: 'input', required: true, type: 'text', name: 'bankOrBuildingSocietyPostcode', label: 'Postcode' }
  ], [
    { field: 'title', text: 'Terms' },
    { field: 'input', required: false, type: 'text', name: 'additionalAmount', label: 'Additional amount (for arrears collection)' },
    { field: 'input', required: false, type: 'text', name: 'overrideAmount', label: 'Override amount' },
    { field: 'datepicker', required: true, name: 'firstPaymentDate', label: 'First Payment Date' },
    { field: 'select', required: false, options: [
      [1, '1st of the month'], 
      [8, '8th of the month'], 
      [16, '16th of the month'], 
      [25, '25th of the month']
    ], name: 'preferredDate', label: 'Preferred date (optional)' }
  ], [
    { field: 'submit', text: 'Generate Direct Debit form for resident' }
  ]
]

const DirectDebitEditFormFields = [
  [
    { field: 'input', required: false, type: 'number', name: 'additionalAmount', label: 'Additional Amount' },
    { field: 'input', required: false, type: 'number', name: 'fixedAmount', label: 'Fixed Amount' },
    { field: 'select', required: false, options: [
      [1, '1st of the month'], 
      [8, '8th of the month'], 
      [16, '16th of the month'], 
      [25, '25th of the month']
    ], name: 'preferredDate', label: 'Preferred date (optional)' },
    { field: 'input', required: true, type: 'text', name: 'reason', label: 'Reason' },
  ], [
    { field: 'submit', text: 'Update Direct Debit' }
  ]
]

const DirectDebitPauseFormFields = [
  [
    { field: 'input', required: true, type: 'text', name: 'status', label: 'Status', disabled: true },
    { field: 'input', required: true, type: 'number', name: 'pauseDuration', label: 'Pause Duration (months)' },
    { field: 'input', required: true, type: 'text', name: 'reason', label: 'Reason' },
  ], [
    { field: 'submit', text: 'Update Direct Debit' }
  ]
]

const TenantFormFields = [
  [
    { field: 'title', text: 'Person Details' },
    { field: 'input', required: true, type: 'text', name: 'title', label: 'Title' },
    { field: 'input', required: true, type: 'text', name: 'firstName', label: 'First Name' },
    { field: 'input', required: true, type: 'text', name: 'surname', label: 'Surname' },
    { field: 'datepicker', required: true, name: 'dateOfBirth', label: 'Date of Birth' },
  ], [
    { field: 'title', text: 'Preferred Details' },
    { field: 'input', required: true, type: 'text', name: 'preferredTitle', label: 'Preferred Title' },
    { field: 'input', required: true, type: 'text', name: 'preferredFirstName', label: 'Preferred First Name' },
    { field: 'input', required: true, type: 'text', name: 'preferredMiddleName', label: 'Preferred Middle Name' },
    { field: 'input', required: true, type: 'text', name: 'preferredSurname', label: 'Preferred Surname' }
  ], [
    { field: 'title', text: 'Details' },
    { field: 'input', required: true, type: 'text', name: 'reason', label: 'Reason' },
  ], [
    { field: 'submit', text: 'Create Tenant' }
  ]
]

export {
  Titles,
  TextRef,
  HousingSearch,
  DirectDebitFormFields,
  DirectDebitEditFormFields,
  DirectDebitPauseFormFields,
  TenantFormFields
}