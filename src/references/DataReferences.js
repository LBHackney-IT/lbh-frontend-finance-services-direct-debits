const DataReferences = {
  ReportSuspenseAccounts: [
    { title: 'ID', sort:'id', classes: '', format: '', },
    { title: 'Year', sort:'year', classes: '', format: '', },
    { title: 'Type', sort:'suspenseAccountType', classes: '', format: '', },
    { title: 'Link', sort:'link', classes: '', format: 'link', linkText: 'Download Report' },
    { title: 'Start Time', sort:'startTime', classes: '', format: 'time', },
    { title: 'End Time', sort:'endTime', classes: '', format: 'time', },
    { title: 'Success', sort:'isSuccess', classes: '', format: 'boolean', },
  ],
  OperatingBalances: [
    { title: 'Service', sort: 'rentGroup', classes: '', format: '' },
    { title: 'Total Charged', sort: 'totalCharged', classes: ' govuk-table__header--numeric', format: 'currency'  },
    { title: 'Total Paid', sort: 'totalPaid', classes: ' govuk-table__cell--numeric', format: 'currency' },
    { title: 'Total Balance', sort: 'totalBalance', classes: ' govuk-table__cell--numeric', format: 'currency' },
  ],
  BatchLog: [
    { title: 'Batch Id', sort: 'batchId', classes: '', format: '' },
    { title: 'Process Name', sort: 'processName', classes: '', format: '' },
    { title: 'Start Time', sort: 'startTime', classes: '', format: 'date' },
    { title: 'End Time', sort: 'endTime', classes: '', format: 'date' },
    { title: '', sort: 'toggle', classes: '', format: '' }
  ],
  ReportCash: [
    { title: 'Rent Group', sort: 'rentGroup', classes: '' },
    { title: 'Total Charged', sort: 'totalCharged', classes: ' govuk-table__header--numeric' },
    { title: 'Total Paid', sort: 'totalPaid', classes: ' govuk-table__cell--numeric'},
    { title: 'Total Balance', sort: 'totalBalance', classes: ' govuk-table__header--numeric' },
    { title: 'Charged YTD', sort: 'chargedYTD', classes: ' govuk-table__cell--numeric'},
    { title: 'Paid YTD', sort: 'paidYTD', classes: ' govuk-table__cell--numeric'},
    { title: 'Arrears YTD', sort: 'arrearsYTD', classes: ' govuk-table__cell--numeric'},
  ],
  IndividualLookup: [
    { title: 'Week Beginning', sort: 'weekBeginning', classes: '' },
    { title: 'Charge', sort: 'totalCharged', classes: ' govuk-table__header--numeric' },
    { title: 'Paid', sort: 'totalPaid', classes: ' govuk-table__header--numeric' },
    { title: 'HB Cont.', sort: 'totalHB', classes: ' govuk-table__header--numeric' },
    { title: 'Balance', sort: 'weekBalance', classes: ' govuk-table__header--numeric' },
  ],
  ReportCharges: [
    { title: 'ID', sort:'id', classes: '', format: '', },
    { title: 'Year', sort:'year', classes: '', format: '', },
    { title: 'Link', sort:'link', classes: '', format: 'link', linkText: 'Download Report' },
    { title: 'Start Time', sort:'startTime', classes: '', format: 'time', },
    { title: 'End Time', sort:'endTime', classes: '', format: 'time', },
    { title: 'Success', sort:'isSuccess', classes: '', format: 'boolean', },
  ],
  ReportAccountBalance: [
    { title: 'ID', sort:'id', classes: '', format: '', },
    { title: 'Year', sort:'year', classes: '', format: '', },
    { title: 'Rent Group', sort:'rentGroup', classes: '', format: '', },
    { title: 'Link', sort:'link', classes: '', format: 'link', linkText: 'Download Report' },
    { title: 'Start Time', sort:'startTime', classes: '', format: 'time', },
    { title: 'End Time', sort:'endTime', classes: '', format: 'time', },
    { title: 'Success', sort:'isSuccess', classes: '', format: 'boolean', },
  ],
  ReportCashImport: [
    { title: 'ID', sort:'id', classes: '', format: '', },
    { title: 'Year', sort:'year', classes: '', format: '', },
    { title: 'Link', sort:'link', classes: '', format: 'link', linkText: 'Download Report' },
    { title: 'Start Time', sort:'startTime', classes: '', format: 'time', },
    { title: 'End Time', sort:'endTime', classes: '', format: 'time', },
    { title: 'Success', sort:'isSuccess', classes: '', format: 'boolean', },
  ],
  ReportHousingBenefitAcademy: [
    { title: 'ID', sort:'id', classes: '', format: '', },
    { title: 'Year', sort:'year', classes: '', format: '', },
    { title: 'Link', sort:'link', classes: '', format: 'link', linkText: 'Download Report', },
    { title: 'Start Time', sort:'startTime', classes: '', format: 'time', },
    { title: 'End Time', sort:'endTime', classes: '', format: 'time', },
    { title: 'Success', sort:'isSuccess', classes: '', format: 'boolean', },
  ]
}
export {
  DataReferences
}