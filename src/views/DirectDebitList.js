import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as TextReferences from '../references/TextReferences'
import { getDirectDebits } from '../routes/Api'
import { DataReferences } from "../references/DataReferences"
import { CurrencyFormat } from '../references/Functions'
import { TableBodyHTML } from '../templates/Table'
import Pagination from '../references/Pagination'

const DirectDebitList = () => {

  const [searching, setSearching] = useState(false)
  const [toggle, setToggle] = useState([])
  const [exportForm, setExportForm] = useState(false)
  const [exportFile, setExportFile] = useState({ type: 'csv', date: 1 })
  const [directDebits, setDirectDebits] = useState(undefined)
  const Ref = 'DirectDebitList'
  const DataRows = DataReferences[Ref]
  
  useEffect(() => {
    const searchCall = async () => {    
      setSearching(true)
      const call = await getDirectDebits({
        TargetId: ''
      })
      setDirectDebits(call)
      setSearching(false)
    }
    searchCall()
  }, [])

  const exportHTMLForm = () => {
    return <div className='background_EEE'>
      <div className='d-flex'>
        <div>
          <h3>Export</h3>
        </div>

        <div>
          <label>File Type</label>
          <select
            className='govuk-input lbh-input w-100 mt-2 govuk-input--standard'
            name='exportType'
            value={exportFile.type}
            onChange={e => setExportFile({...exportFile, type: e.target.value })}
          >
            <option value="csv">CSV</option>
            <option value="dat">DAT</option>
          </select>
        </div>
        
        <div>
          <label>Date of Collection</label>
          <select
            className='govuk-input lbh-input w-100 mt-2 govuk-input--standard'
            name='exportType'
            value={exportFile.type}
            onChange={e => setExportFile({...exportFile, type: e.target.value })}
          >
            <option value="1">1st of the Month</option>
            <option value="8">8th of the Month</option>
            <option value="16">16th of the Month</option>
            <option value="25">25th of the Month</option>
          </select>
        </div>

        <div>
          <button 
            onClick={(e) => console.log(exportFile)}
            className='govuk-button lbh-button mt-0' 
          >Export</button>
        </div>

      </div>
    </div>
  }

  const DirectDebitFilter = () => {

    let totalRecords, totalResidents, totalAmount
    totalRecords = totalResidents = totalAmount = 'Unknown'
    if( directDebits !== undefined && directDebits !== null && !searching ) {
      totalRecords = directDebits.totalCount
      totalResidents = directDebits.residents
      totalAmount = CurrencyFormat(directDebits.totalAmount)
    }

    return <>
      { exportForm ? exportHTMLForm() : '' } 
      <div className='background_EEE'>
        <div className='d-flex'>
          <div>
            <h3>Totals</h3>
          </div>
          <div>
            <h4>{totalRecords} </h4>
            <p style={{ marginTop: '0' }}>Direct Debits</p>
          </div>
          <div>
            <h4>{totalResidents} </h4>
            <p style={{ marginTop: '0' }}>Residents</p>
          </div>
          <div>
            <h4>{totalAmount} </h4>
            <p style={{ marginTop: '0' }}>Total Amount</p>
          </div>
        </div>
      </div>
    </>
  }

  const DirectDebitView = () => {
    if( searching ) return <h4>{TextReferences.TextRef.Searching}</h4>
    if( directDebits === undefined ) return
    if( directDebits === null ) return <h4>{TextReferences.TextRef.NothingFound}</h4>
    
    return <div className="table-wrap">
      <table className='govuk-table lbh-table'>
      <thead className='govuk-table__head'>
        <tr className='govuk-table__row'>
          {DataRows.map((row, key) => {
            return <th className='govuk-table__header' key={key}>{row.title}</th>
          })}
          <th className='govuk-table__header'></th>
        </tr>
      </thead>
      <tbody className='govuk-table__body'>{
        directDebits.results.map((directDebit, trKey) => {
          return <Fragment key={trKey}>
            <tr className='govuk-table__row'>
            
              {DataRows.map((record, tdKey) => {
                return <td className='govuk-table__cell' key={tdKey}>
                  { record.format === '' && directDebit[record.sort] }
                  { record.format === 'currency' && CurrencyFormat(directDebit[record.sort]) }
                  { record.format === 'link' && <Link 
                    to={`/${record.linkPrefix}${directDebit[record.sort]}`}
                    className='govuk-button lbh-button lbh-button-sm mt-0' 
                    title={directDebit[record.sort]}
                  >{record.linkText ?? directDebit[record.sort]}</Link>}
                </td>
              })}

              <td className='govuk-table__cell'>
                { directDebit.directDebitMaintenance.length ?
                    <button 
                      className={`lbh-link arrow${([...toggle].includes(directDebit.id) ? ' active' : '')}`}
                      onClick={() => { 
                        let ids = [...toggle]
                        ids.includes(directDebit.id) ? ids.splice(ids.indexOf(directDebit.id), 1) : ids.push(directDebit.id)
                        setToggle(ids)
                      }}
                    >
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                      </svg>
                    </button>
                : '' }
              </td> 

            </tr>

            { directDebit.directDebitMaintenance.length ?
              <tr className={`lbh-table-errors ${([...toggle].includes(directDebit.id) ? '' : 'hide')}`}>
                <td colSpan="9" className="lbh-table-errors-wrap">
                  <div className="table-wrap">
                    <table className='govuk-table lbh-table'>
                      <thead className='govuk-table__head'>
                        <tr className='govuk-table__row lbh-table-errors'>
                          {DataReferences['DirectDebitMaintenance'].map((header, key) => {
                            return <th className="govuk-table__header" key={key}>{header.title}</th>
                          })}
                        </tr>
                      </thead>
                      <TableBodyHTML 
                        tableHead={'DirectDebitMaintenance'} 
                        data={directDebit.directDebitMaintenance} 
                      />
                    </table>
                  </div>
                </td>
              </tr> 
            : '' }
          </Fragment>
        })
      }</tbody>
      </table>
      <Pagination 
        total={directDebits.totalCount} 
        page={directDebits.currentPage} 
        prefix={'/direct-debit'} 
        divided={directDebits.totalPages}
      />
    </div>
  }
  
  return <>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1>{TextReferences.Titles.DirectDebits}</h1>
      </div>
      <div className="govuk-grid-column-one-third" style={{textAlign: 'right'}}>
        <button
          onClick={() => setExportForm(!exportForm)}
          className='govuk-button lbh-button mt-0' 
        >{exportForm ? 'Hide' : 'Show'} Export Form</button>
      </div>
    </div>
    {DirectDebitFilter()}
    {DirectDebitView()}
  </>

}

export default DirectDebitList