import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as TextReferences from '../references/TextReferences'
import { getDirectDebits, updateDirectDebit } from '../routes/Api'
import Form from '../references/Form'
import * as RouteConstants from '../routes/RouteConstants'

const DirectDebitEdit = () => {

  const params = useParams()
  const TenantId = params.id ? decodeURIComponent(params.id) : ''

  const [searching, setSearching] = useState(false)  
  const [data, setData] = useState(undefined)

  // console.log(data)

  useEffect(() => {
    const searchCall = async () => {    
      setSearching(true)
      const request = await getDirectDebits({ TargetId: TenantId })
      setData({
        id: request.results[0].id,
        additionalAmount: request.results[0].additionalAmount ? Number(request.results[0].additionalAmount) : null,
        preferredDate: request.results[0].preferredDate ? Number(request.results[0].preferredDate) : null,
        reason: request.results[0].reason,
        fixedAmount: request.results[0].fixedAmount ? Number(request.results[0].fixedAmount) : null,
      })
      setSearching(false)
    }
    searchCall()
  }, [TenantId])
  
  
  const [validate, setValidate] = useState(false)
  const onSubmit = e => {
    e.preventDefault()
    updateDirectDebit(data)
  }

  const DirectDebitEditForm = () => {
    
    if( searching ) return <h4>{TextReferences.TextRef.Searching}</h4>
    if( data === undefined ) return <h4>{TextReferences.TextRef.NothingFound}</h4>

    return <>
      <h1>Edit {TextReferences.Titles.DirectDebit}</h1>
      <p>You are currently editing Direct Debit {TenantId}.</p>
      <Link 
        to={`${RouteConstants.DIRECTDEBIT}/${TenantId}`}
        className="govuk-button lbh-button lbh-button-secondary"
      >{TextReferences.TextRef.Back}</Link>

      <Form 
        fields={TextReferences.DirectDebitEditFormFields}
        data={data}
        setData={setData}
        validate={validate}
        setValidate={setValidate}
        onSubmit={onSubmit}
      />
    </>

  }
  
  return DirectDebitEditForm()

}

export default DirectDebitEdit