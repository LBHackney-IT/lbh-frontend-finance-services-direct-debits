import React, { useState } from 'react'
import { readRecords } from '../routes/Api'

const SelectFieldLookup = params => {
  
  const { onChangeField, val, id, set } = params
  const apiCall = async lookup => {
    const records = await readRecords({ type: lookup })
    if( records.status ) return records.response
    return 'empty'
  }
  const [options, setOptions] = useState(undefined)
  if( options === undefined ) apiCall(val.lookup).then(data => setOptions(data))

  return <select
    id={id}
    className='form-control form_field mb-3'
    name={val.id}
    value={set}
    onChange={e => onChangeField(e)}
  >
    <option value='' disabled={true}>Please select</option>
    {options !== undefined && options.length && options.map((v, k) => {
      return <option key={k} value={v[val.options[0]]}>{v[val.options[1]]}</option>
    })}
  </select>

}

export default SelectFieldLookup