import React, { useState, useCallback, useEffect } from 'react'
import { TableSort, TableHTML } from '../templates/Table'
import * as TextReferences from '../references/TextReferences'

const ReportCall = params => {
  
  const { Ref, bar, get, post, postArgs } = params
  const [searching, setSearching] = useState(false)
  const [data, setData] = useState(undefined)

  const onSearch = async () => {
    setSearching(true)
    const response = await get()
    setData(response)
    setSearching(false)
  }

  const onGenerate = async () => {
    const postData = await post(postArgs)
    console.log(postData)
  }

  // TABLE HEAD
  const [sort, setSort] = useState({ value: 'rentGroup', direction: true })
  const onSort = useCallback(val => { 
    setSort(val)
    const dataSort = TableSort(sort, data)
    if( dataSort !== false ) setData(dataSort)
  }, [sort])

  useEffect(() => {
    if( data === undefined ) onSearch()
  })

  const reportGenerateSettings = () => {
    return <div className="date-range-search-bar">
      <div className="bar-component-cont" style={{ display:'flex' }}>
        {bar()}
        <button 
          onClick={() => onGenerate()} 
          className="govuk-button govuk-secondary lbh-button lbh-button--secondary mt-0"
        >{TextReferences.TextRef.GenerateReport}</button>
        <p className='mw-400'>{TextReferences.TextRef.ReportMessage}</p>
      </div>
    </div>
  }

  const SearchResults = () => {

    if( searching ) return <h4>{TextReferences.TextRef.Searching}</h4>
    if( data === undefined ) return
    if( !data.length ) return <p>{TextReferences.TextRef.NothingFound}</p>

    return <TableHTML
        tableHead={Ref}
        sort={sort} 
        onSort={onSort}
        data={data}
      />

  } // searchResults

  return <>
    <h1>{TextReferences.Titles[Ref]}</h1>
    {reportGenerateSettings()}
    {SearchResults()}
  </>

}

export default ReportCall