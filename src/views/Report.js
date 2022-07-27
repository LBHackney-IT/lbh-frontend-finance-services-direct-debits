import React from 'react'
import { Link } from 'react-router-dom'
import * as TextReferences from '../references/TextReferences'

const Report = () => {

  const blocks = [
    [
      { type: 'block', title: Titles.ReportsAccountBalance, description: 'Create and download account balance reports', route: '/report/account-balance' },
      { type: 'block', title: Titles.ReportsCash, description: 'Create and download cash reports', route: '/report/cash' },
      { type: 'block', title: Titles.ReportCharges, description: 'Create and download charges reports', route: '/report/charges' },
    ], [
      { type: 'block', title: Titles.ReportsSuspenseAccounts, description: 'Create and download cash suspense reports', route: '/report/cash-suspense' },
      { type: 'block', title: Titles.ReportHousingBenefitAcademy, description: 'Create and download housing benefit academy reports', route: '/report/housing-benefit/academy' },
    ]

  ]

  return <>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one">
        <h1>{TextReferences.Titles.Reports}</h1>
        <hr />
      </div>
    </div>
    <div className="govuk-grid-row">
      { [...blocks].map((blockWrap, blockWrapKey) => {
        return <div key={blockWrapKey} className="govuk-grid-row">
          {[...blockWrap].map((block, blockKey) => {
            return <div key={blockKey} className="govuk-grid-column-one-third">
              <div className="lbh-stat">
                <h4>{block.title}</h4>
                <Link to={block.route} className="govuk-button lbh-button">{block.title}</Link>
              </div>
            </div>
          })}
        </div>
      }) }
    </div>
  </>
}

export default Report