import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as TextReferences from '../references/TextReferences'
import Form from '../references/Form'
import { postPerson, getPerson } from '../routes/Api'

const TenantForm = () => {

  const params = useParams()
  const type = params.type ? decodeURIComponent(params.type) : 'Tenant'
  const TenantId = params.id ? decodeURIComponent(params.id) : ''
  const [searching, setSearching] = useState(false)  

  const [data, setData] = useState({
    title: '',
    firstName: '',
    surname: '',
    middleName: '',
    preferredTitle: '',
    preferredFirstName: '',
    preferredMiddleName: '',
    preferredSurname: '',
    dateOfBirth: '',
    reason: '',
    tenures: [],
    personTypes: [type]
  })
  
  useEffect(() => {
    const searchCall = async () => {    
      setSearching(true)
      const response = await getPerson({
        id: TenantId
      })
      setData(response)
      setSearching(false)
    }
    searchCall()
  }, [TenantId])

  const [validate, setValidate] = useState(false)
  
  const onSubmit = async e => {
    e.preventDefault()
    // console.log(data)
    const post = await postPerson(data)
    console.log(post)
  }

  return <>
    <h1>{TextReferences.Titles.TenantForm}</h1>
    { searching ? <h4>{TextReferences.TextRef.Searching}</h4> : <Form 
      fields={TextReferences.TenantFormFields}
      data={data}
      setData={setData}
      validate={validate}
      setValidate={setValidate}
      onSubmit={onSubmit}
    /> }
  </>

}

export default TenantForm