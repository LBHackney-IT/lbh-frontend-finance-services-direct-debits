import React, { useState } from 'react'
import { getReportCashSuspense, postReportCashSuspense } from '../Api'
import * as TextReferences from '../references/TextReferences'
import ReportCall from '../references/ReportCallFunc'

const ReportSuspenseAccounts = () => {

  const currentYear = new Date().getFullYear()
  const [args, setArgs] = useState({
    year: currentYear,
    rentGroup: ''
  })
  
  const SearchBar = () => {
    return <>
      <select
        value={args.year}
        onChange={e => setArgs({ ...args, year: e.target.value })}
        className="govuk-select lbh-select"
      >{ 
        Array(currentYear - 2019)
        .fill('')
        .map((v, k) => currentYear - k)
        .map(opt => <option key={opt} value={opt}>{opt}</option>) 
      }</select>

      <select 
        value={args.rentGroup} 
        onChange={e => setArgs({ ...args, rentGroup: e.target.value })}
        className="govuk-select lbh-select"
      >{ 
        TextReferences.ReportSuspenseAccounts.map(opt => {
          return <option key={opt.value} value={opt.value}>{opt.text}</option>
        })
      }</select>
    </>
  }

  return <ReportCall
    Ref='ReportSuspenseAccounts'
    bar={SearchBar}
    get={getReportCashSuspense}
    post={postReportCashSuspense}
    postArgs={args}
  />

}

export default ReportSuspenseAccounts