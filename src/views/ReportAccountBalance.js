import React, { useState } from 'react'
import { getReportBalance, postReportBalance } from '../Api'
import * as TextReferences from '../references/TextReferences'
import ReportCall from '../references/ReportCallFunc'

const ReportAccountBalance = () => {
  
  const currentYear = new Date().getFullYear()
  const [args, setArgs] = useState({
    rentGroup: '',
    year: currentYear
  })

  const SearchBar = () => <>
    <select
      value={args.year}
      onChange={e => setArgs({...args, year: Number(e.target.value)})}
      className="govuk-select lbh-select"
    >{ 
      Array(currentYear - 2019)
      .fill('')
      .map((v, k) => currentYear - k)
      .map(opt => <option key={opt} value={opt}>{opt}</option>) 
    }</select>

    <select 
      value={args.rentGroup} 
      onChange={e => {
        const data = {...args}
        data.group = ''
        data.rentGroup = e.target.value
        setArgs(data)
      }}
      className="govuk-select lbh-select"
    >{ 
      TextReferences.ReportAccountBalance_rentGroupOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>) 
    }</select>
  </>
  
  return <ReportCall
    Ref='ReportAccountBalance'
    bar={SearchBar}
    get={getReportBalance}
    post={postReportBalance}
    postArgs={args}
  />

}

export default ReportAccountBalance