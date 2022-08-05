import React from 'react'
import _ from 'lodash'
import { RepeaterField, SelectField, SelectFieldLookup, InputField } from '../formFunction'

const FieldLoop = params => {
  
  const { val, id, changeField, data } = params

  const onChangeField = e => {
    const newData = Array.isArray(data) ? [...data] : {...data}
    newData[e.target.name] = e.target.value
    changeField(newData)
  }

  let set = data[val.id] ?? ''  

  if( val.field === 'title' ) 
    return <h2>{val.label}</h2>
  
  if( val.field === 'input' ) 
    return <InputField onChangeField={onChangeField} val={val} id={id} set={set} />
  
  if( val.field === 'select' && val.type === 'lookup' ) 
    return <SelectFieldLookup onChangeField={onChangeField} val={val} id={id} set={set} />
  
  if( val.field === 'select' && val.type === 'text' ) 
    return <SelectField onChangeField={onChangeField} val={val} id={id} set={set} />
  
  if( val.field === 'repeater' ) 
    return <RepeaterField changeField={changeField} val={val} id={id}data={data} />
  
  return ''

} // FieldLoop

export default FieldLoop