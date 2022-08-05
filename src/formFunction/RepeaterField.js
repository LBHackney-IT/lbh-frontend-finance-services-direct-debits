import React from 'react'
import FieldLoop from './FieldLoop'

const AddButton = params => {
  
  const { data, val, changeField } = params
  const addField = () => {
    const newData = {...data}
    const structure = JSON.parse(val.structure)
    newData[val.id] = [...newData[val.id], structure]
    changeField(newData)
  }

  return <p>
    <a 
      href="#added" 
      onClick={() => addField()} 
      className="btn btn-primary"
    >Add Field</a>
  </p>

}

const ActionButton = params => {

  const { data, changeField, direction, k, val, obj } = params
  const directions = { u: '↑', d: '↓', r: '✗' }

  const onOrderField = () => {
    const newData = {...data}
    if( direction === 'r' ) newData[val.id].splice(k, 1)
    if( direction === 'u' ) [newData[val.id][k], newData[val.id][k - 1]] = [newData[val.id][k - 1], newData[val.id][k]]
    if( direction === 'd' ) [newData[val.id][k], newData[val.id][k + 1]] = [newData[val.id][k + 1], newData[val.id][k]]
    changeField(newData)
  }

  return <span 
    onClick={() => onOrderField()}
    data-id={obj.id}
    className={`btn btn-sm btn-secondary ml-1`}
  >
    {directions[direction]}
  </span>

}

const RepeaterField = params => {

  const { changeField, id, val, data } = params

  const set = data[val.id]

  return <>
    {set.length !== 0 && set.map((v, k) => {
      const obj = JSON.parse(val.default)

      return <div key={`${id}${k}`} className='d-flex' style={{ alignItems: 'baseline' }}>
        {obj.map((item, item_key) => {
          item.id = `${val.id}.${k}.${item_key}`
          return <div className="mr-1" key={`${id}${k}${item_key}`}>
              <FieldLoop 
                val={item} 
                id={`${id}${k}${item_key}`} 
                changeField={changeField} 
                data={data} 
              />
            </div>
        })}

        { set.length !== 1 && k !== 0 && <ActionButton 
          data={data} 
          changeField={changeField} 
          direction='u' 
          k={k} 
          val={val} 
          obj={obj} 
        /> }

        { set.length !== 1 && (k + 1) !== set.length && <ActionButton 
          data={data} 
          changeField={changeField} 
          direction='d' 
          k={k} 
          val={val} 
          obj={obj} 
        /> }

        <ActionButton 
          data={data} 
          changeField={changeField} 
          direction='r' 
          k={k} 
          val={val} 
          obj={obj} 
        />
      </div>
    })}
    <AddButton 
      data={data}
      val={val}
      changeField={changeField}
    />
  </>
}

export default RepeaterField