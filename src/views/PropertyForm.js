import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as TextReferences from '../references/TextReferences'
import Form from '../references/Form'
import { postPerson } from '../routes/Api'

const PropertyForm = () => {

  const params = useParams()
  const type = params.type ? decodeURIComponent(params.type) : 'Tenant'
  // const id = params.id ? decodeURIComponent(params.id) : ''

  const [data, setData] = useState({
    title: '',
    firstName: '',
    surname: '',
    preferredTitle: '',
    preferredFirstName: '',
    preferredMiddleName: '',
    preferredSurname: '',
    dateOfBirth: '',
    reason: '',
    tenures: [],
    personTypes: [type]
  })
  
  const [validate, setValidate] = useState(false)
  const onSubmit = async e => {
    e.preventDefault()
    // console.log(data)
    const post = await postPerson(data)
    console.log(post)
  }

  return <>
    <h1>{TextReferences.Titles.TenantForm}</h1>
    <Form 
      fields={TextReferences.TenantFormFields}
      data={data}
      setData={setData}
      validate={validate}
      setValidate={setValidate}
      onSubmit={onSubmit}
    />
  </>

}

export default PropertyForm