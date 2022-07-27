import React, { useState } from 'react'
import { getReportCashImport, postReportCashImport } from '../Api'
import DatePicker from 'react-date-picker'
import { MinusYear } from '../references/Functions'
import * as TextReferences from '../references/TextReferences'
import ReportCall from '../references/ReportCallFunc'

const ReportCash = () => {

  const [start, setStart] = useState(MinusYear)
  const [end, setEnd] = useState(new Date())

  const SearchBar = () => {
    return <>
      <label className="govuk-label govuk-date-input__label">{TextReferences.TextRef.StartLabel}</label>
      <DatePicker
        clearIcon={null}
        onChange={setStart}
        value={start}
        format="dd-MM-y"
      />
      <label className="govuk-label govuk-date-input__label">{TextReferences.TextRef.EndLabel}</label>
      <DatePicker
        clearIcon={null}
        onChange={setEnd}
        value={end}
        format="dd-MM-y"
      />
    </>
  }

  return <ReportCall
    Ref='ReportCashImport'
    bar={SearchBar}
    get={getReportCashImport}
    post={postReportCashImport}
    postArgs={{ startDate: start, endDate: end }}
  />

}

export default ReportCash