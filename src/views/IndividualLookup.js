import React, { useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { getTenancy, getTenancyTransactions } from '../Api'
import RouteConstants from '../routes/RouteConstants'
import { CurrencyFormat, DateFormat } from '../references/Functions'
import { TableSort, TableHeadHTML } from '../templates/Table'
import * as TextReferences from '../references/TextReferences'

const IndividualLookup = () => {
  
  let navigate = useNavigate()
  const params = useParams()
  const search = params.search ? decodeURIComponent(params.search) : ''
  const searchOptions = TextReferences.IndividualLookupSearchOptions
  const searchId = params.searchId ? params.searchId : searchOptions[0].value
  
  const [searching, setSearching] = useState(false)  
  const [tenant, setTenant] = useState(undefined)
  const [transactions, setTransactions] = useState(undefined)
  const [searchType, setSearchType] = useState(searchId)
  const [searchTerm, setSearchTerm] = useState(search)

  // TABLE HEAD
  const [sort, setSort] = useState({ value: 'rentGroup', direction: true })
  const onSort = useCallback(val => { 
    setSort(val)
    const dataSort = TableSort(sort, transactions)
    if( dataSort !== false ) setTransactions(dataSort)
  }, [sort])
  
  // API CALL
  const searchCall = async () => {    
    let args = { 
      tenancyAgreementRef: null, 
      rentAccount: null, 
      householdRef: null 
    }
    args[searchType] = searchTerm
    setSearching(true)
    const getTenants = await getTenancy(args)
    const getTransactions = await getTenancyTransactions(args)
    setTenant(getTenants)
    setTransactions(getTransactions)
    setSearching(false)
  } // searchCall

  const runSearch = () => {
    if( !searchTerm ) return
    navigate(`${RouteConstants.INDIVIDUAL_LOOKUP}/${searchType}/${encodeURIComponent(searchTerm)}`, { replace: false })
    if( searchTerm && searchType ) searchCall()  
  } // runSearch

  const SearchForm = () => {
    
    return <div className="find-property-search-bar">
      <div className="govuk-form-group lbh-form-group lbh-search-box">
        <select 
          disabled={searching}
          value={searchType} 
          onChange={e => setSearchType(e.target.value)}
          className="govuk-select lbh-select"
        >{ searchOptions.map(opt => { 
          return <option key={opt.value} value={opt.value}>{opt.text}</option> 
        }) }</select>
        <span style={{position: 'relative'}}>
          <input
            onChange={e => setSearchTerm(e.target.value) }
            className="govuk-input lbh-input govuk-input--width-10"
            name='propSearchInput'
            value={searchTerm}
            type={searching ? 'disabled' : 'text'}
            disabled={searching}
            placeholder={TextReferences.TextRef.Placeholder}
            onKeyPress={e => e.key === 'Enter' && runSearch() }
          />
          <button 
            onClick={() => runSearch()} 
            className="lbh-search-box__action"
          >
            <span className="govuk-visually-hidden">{TextReferences.TextRef.Search}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.6999 10.6C12.0747 10.6 13.9999 8.67482 13.9999 6.3C13.9999 3.92518 12.0747 2 9.6999 2C7.32508 2 5.3999 3.92518 5.3999 6.3C5.3999 8.67482 7.32508 10.6 9.6999 10.6ZM9.6999 12.6C13.1793 12.6 15.9999 9.77939 15.9999 6.3C15.9999 2.82061 13.1793 0 9.6999 0C6.22051 0 3.3999 2.82061 3.3999 6.3C3.3999 9.77939 6.22051 12.6 9.6999 12.6Z"
                fill="#0B0C0C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.70706 10.7071L1.70706 15.7071L0.292847 14.2929L5.29285 9.29289L6.70706 10.7071Z"
                fill="#0B0C0C"
              />
            </svg>
          </button>
        </span>
      </div>

    </div>
  }

  const SearchResults = () => {

    if( searching ) return <h4>{TextReferences.TextRef.Searching}</h4>
    if( tenant === undefined ) return

    if( tenant === null ) {
      let searchTypeName = searchOptions.filter(opt => searchType === opt.value)
      console.log(tenant)
      return <h4>{TextReferences.TextRef.NoTenantRecords} "{searchTerm}" in "{searchTypeName[0].text}".</h4>
    }

    return <>
      <hr />
      <h3>{TextReferences.TextRef.TenantTitle}</h3>
      <dl className="govuk-summary-list lbh-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{TextReferences.TextRef.Tenant}</dt>
          <dd className="govuk-summary-list__value">{`${tenant.title} ${tenant.forename} ${tenant.surname}`}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{TextReferences.TextRef.TenantId}</dt>
          <dd className="govuk-summary-list__value">{tenant.tenancyAgreementRef}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{TextReferences.TextRef.CurrentBalance}</dt>
          <dd className="govuk-summary-list__value">{CurrencyFormat(tenant.currentBalance)}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{TextReferences.TextRef.ContactInfomation}</dt>
          <dd className="govuk-summary-list__value">
            <p className="govuk-body">
              {tenant.address1}<br />
              {tenant.address2}<br />
              {tenant.address3}<br />
              {tenant.address4}<br />
              {tenant.postCode}<br />
            </p>
          </dd>
        </div>
      </dl>
      <h3>{TextReferences.TextRef.LastTransactions}</h3>
      { transactions.length ? <>
        <table className='govuk-table lbh-table'>
          <TableHeadHTML
            tableHead={'IndividualLookup'}
            sort={sort}
            onSort={onSort}
          />
          <tbody className='govuk-table__body'>
            {transactions.map((transaction, key) => {
              return <tr className='govuk-table__row' key={key}>
                <td className='govuk-table__cell'>{DateFormat(transaction.weekBeginning)}</td>
                <td className='govuk-table__cell govuk-table__cell--numeric'>{CurrencyFormat(transaction.totalCharged)}</td>
                <td className='govuk-table__cell govuk-table__cell--numeric'>{CurrencyFormat(transaction.totalPaid)}</td>
                <td className='govuk-table__cell govuk-table__cell--numeric'>{CurrencyFormat(transaction.totalHB)}</td>
                <td className='govuk-table__cell govuk-table__cell--numeric'>{CurrencyFormat(transaction.weekBalance)}</td>
              </tr>
            })}
          </tbody>
        </table>
        <p>
          <Link 
            to={`${RouteConstants.INDIVIDUAL_LOOKUP_PAYMENTS}/${encodeURIComponent(tenant.tenancyAgreementRef)}`} 
            className="govuk-button lbh-button"
          >{TextReferences.TextRef.AllPaymentsAndArrears}</Link>
        </p>
      </> : <p>{TextReferences.TextRef.NoTransactions}</p> }
    </>
  
  } // rentAccountView

  return <>
    <h1>{TextReferences.Titles.IndividualLookup}</h1>
    {SearchForm()}
    {SearchResults()}
  </>
}

export default IndividualLookup