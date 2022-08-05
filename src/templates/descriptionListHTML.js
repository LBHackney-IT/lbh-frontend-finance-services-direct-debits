import React from 'react'

const descriptionList = map => {
  return <dl className="govuk-summary-list lbh-summary-list">
    { map.map(row => { 
      return <div className="govuk-summary-list__row" key={`name_${Math.random().toString(36).slice(2)}`}>
        <dt className="govuk-summary-list__key">{row.key}</dt>
        <dd className="govuk-summary-list__value">{row.val}</dd>
      </div>
    })}
  </dl>
}

export {
  descriptionList
}