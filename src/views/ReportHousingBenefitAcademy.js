import React, { useState, useCallback, useEffect } from 'react'
import { getReportHousingBenefitAcademy, postReportHousingBenefitAcademy } from '../Api'
import { TableSort, TableHTML } from '../templates/Table'
import { DataReferences } from '../references/DataReferences'
import * as TextReferences from '../references/TextReferences'

const ReportHousingBenefitAcademy = () => {
  
  const currentYear = new Date().getFullYear()
  const yearOptions = Array(currentYear - 2019).fill('').map((v, k) => currentYear - k)

  const Ref = 'ReportHousingBenefitAcademy'
  const DataRows = DataReferences[Ref]
  const [year, setYear] = useState(currentYear)
  const [data, setData] = useState(undefined)

  const [searching, setSearching] = useState(false)

  // TABLE HEAD
  const [sort, setSort] = useState({ value: DataRows[0].sort, direction: true })
  const onSort = useCallback(val => { 
    setSort(val)
    const dataSort = TableSort(sort, data)
    if( dataSort !== false ) setData(dataSort)
  }, [sort])
  
  // API CALL
  const onSearch = async () => {
    setSearching(true)
    const getData = await getReportHousingBenefitAcademy()
    setData(getData)
    setSearching(false)
  }

  const onGenerate = async () => {
    const postData = await postReportHousingBenefitAcademy({ year })
    console.log(postData)
  }

  useEffect(() => {
    if( data === undefined ) onSearch()
  })

  const SearchBar = () => {
    return <>
      <div className="date-range-search-bar">
        <div className="bar-component-cont" style={{ display:'flex' }}>
          <select
            disabled={searching}
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="govuk-select lbh-select"
          >{ yearOptions.map(opt => <option key={opt} value={opt}>{opt}</option>) }</select>

          <button 
            onClick={() => onGenerate()} 
            disabled={searching}
            className="govuk-button govuk-secondary lbh-button lbh-button--secondary mt-0"
          >{TextReferences.TextRef.GenerateReport}</button>

          <p style={{ 
            marginLeft:'10px',
            marginTop: '5px'
          }}>{TextReferences.TextRef.ReportMessage}</p>

        </div>
      </div>
    </>
  }

  const SearchResults = () => {

    if( searching ) return <h4>{TextReferences.TextRef.Searching}</h4>
    if( data === undefined ) return
    if( !data.length ) return <h4>{TextReferences.TextRef.NothingFound}</h4>

    return <TableHTML 
      tableHead={Ref}
      sort={sort} 
      onSort={onSort}
      data={data} 
    />

  } // searchResults

  return <>
    <h1>{TextReferences.Titles.ReportHousingBenefitAcademy}</h1>
    {SearchBar()}
    {SearchResults()}
  </>

}

export default ReportHousingBenefitAcademy