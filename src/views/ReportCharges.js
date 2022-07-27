import React, { useState } from 'react'
import { getReportCharges, postReportCharges } from '../Api'
import * as TextReferences from '../references/TextReferences'
import ReportCall from '../references/ReportCallFunc'

const ReportCharges = () => {

  const rentGroupOptions = TextReferences.ReportCharges_RentGroupOptions
  const groupOptions = TextReferences.ReportCharges_GroupOptions
  const currentYear = new Date().getFullYear()

  const [args, setArgs] = useState({
    year: Number(currentYear),
    rentGroup: rentGroupOptions[1].value,
    group: ''
  })

  const SearchBar = () => {
    return <>
      <select 
        value={args.year}
        onChange={e => setArgs({...args, year: Number(e.target.value)})}
        className="govuk-select lbh-select"
      >{
        Array(currentYear - (currentYear - 10))
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
        rentGroupOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>) 
      }</select>

      <select 
        value={args.group} 
        onChange={e => {
          const data = {...args}
          data.group = e.target.value
          data.rentGroup = ''
          setArgs(data)
        }}
        className="govuk-select lbh-select"
      >{ 
        groupOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>) 
      }</select>
    </>
  } //searchBar

  return <ReportCall 
    Ref='ReportCharges'
    bar={SearchBar}
    get={getReportCharges}
    post={postReportCharges}
    postArgs={args}
  />

}

export default ReportCharges