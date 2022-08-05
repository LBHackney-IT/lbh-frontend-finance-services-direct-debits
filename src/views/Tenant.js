import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import * as TextReferences from '../references/TextReferences'
import { getPerson } from '../routes/Api'
import { CurrencyFormat, DateFormat } from '../references/Functions'
import { descriptionList } from '../templates/descriptionListHTML'
import * as RouteConstants from '../routes/RouteConstants'

const Tenant = () => {

  const params = useParams()
  const history = useHistory()
  const TenantId = params.id ? decodeURIComponent(params.id) : ''
  const Type = params.type ? params.type : 'Tenant'

  const [searching, setSearching] = useState(false)  
  const [tenant, setTenant] = useState(undefined)

  useEffect(() => {
    const searchCall = async () => {    
      setSearching(true)
      const callPerson = await getPerson({
        id: TenantId
      })
      setTenant(callPerson)
      setSearching(false)
    }
    searchCall()
  }, [TenantId])

  const TenantView = () => {
    
    const back = <button onClick={() => history.push(-1)} className="mt-0 govuk-button lbh-button lbh-button-secondary">{TextReferences.TextRef.Back}</button>

    if( searching ) return <>
      <h1>{TextReferences.Titles.Tenant}</h1>
      {back}
      <h4>{TextReferences.TextRef.Searching}</h4>
    </>
    
    if( tenant === undefined ) return
    if( tenant === null ) return <h4>{TextReferences.TextRef.NoTenantRecords}</h4>

    return <>
      
      <h1>{TextReferences.Titles.Tenant}: {tenant.preferredTitle} {tenant.preferredFirstName} {tenant.preferredSurname}</h1>
      
      <Link 
        to={`/${Type}/form/${TenantId}`}
        className='govuk-button lbh-button mt-0'
        style={{ marginRight: '10px' }}
      >{TextReferences.TextRef.Edit}</Link>
      
      {back}      
      
      { tenant.charges && <>
        <h2>Financial</h2>
        {descriptionList([
          { key: 'Current Balance', val: CurrencyFormat(tenant.charges.currentBalance) },
          { key: 'Weekly Total Charges', val: CurrencyFormat(tenant.charges.rent) },
          { key: 'Service Charge', val: CurrencyFormat(tenant.charges.serviceCharge) },
          { key: 'Yearly Rent Debits', val: '' },
          { key: 'Housing Benefits', val: '' },
        ])}
      </>}
      <h2>Tenure</h2>
      {descriptionList([
        { key: 'Tenure ID', val: tenant.id },
        { key: 'Tenure Type', val: tenant.personTypes.join(', ') },
        { key: 'Tenancy Start Date', val: DateFormat(tenant.startOfTenureDate) },
        { key: 'Date of Birth', val: DateFormat(tenant.dateOfBirth) }
      ])}
      {tenant.tenures.length && <>
        <h2>Properties</h2>
        <div className="table-wrap">
          <table className='govuk-table lbh-table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th className='govuk-table__header'>Address</th>
                <th className='govuk-table__header'>Date</th>
                <th className='govuk-table__header'>Current Balance</th>
                <th className='govuk-table__header'>Tenancy Type</th>
                <th className='govuk-table__header'></th>
              </tr>
            </thead>
            <tbody className='govuk-table__body'>{
              tenant.tenures.map(tenure => {
                // console.log(tenure)
                return <tr className='govuk-table__row' key={tenure.id}>
                  <td className='govuk-table__cell' style={{ maxWidth: '240px', whiteSpace: 'pre-wrap' }}>
                    <Link className='lbh-link' to={`${RouteConstants.PROPERTY}/${tenure.id}`}>
                      {tenure.assetFullAddress}
                    </Link>
                  </td>
                  <td className='govuk-table__cell'>{DateFormat(tenure.startDate)} - {tenure.endDate ? DateFormat(tenure.endDate) : 'Current'}</td>
                  <td className='govuk-table__cell'>{CurrencyFormat()}</td>
                  <td className='govuk-table__cell'>{tenure.type}</td>
                  <td className='govuk-table__cell'>
                    {tenure.isActive ? <Link 
                      className='govuk-button lbh-button lbh-button-sm mt-0' 
                      to={`${RouteConstants.DIRECTDEBIT}/${tenure.id}/create`}
                      >{TextReferences.TextRef.AddDirectDebit}</Link> : ''
                    }
                  </td>
                </tr>
              })
            }</tbody>
          </table>
        </div>
      </>}


    </>

  }
  
  return <TenantView />

}

export default Tenant