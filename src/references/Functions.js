import React from 'react'
import NumberFormat from 'react-number-format'
import { format } from 'date-fns'

const searchIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9.6999 10.6C12.0747 10.6 13.9999 8.67482 13.9999 6.3C13.9999 3.92518 12.0747 2 9.6999 2C7.32508 2 5.3999 3.92518 5.3999 6.3C5.3999 8.67482 7.32508 10.6 9.6999 10.6ZM9.6999 12.6C13.1793 12.6 15.9999 9.77939 15.9999 6.3C15.9999 2.82061 13.1793 0 9.6999 0C6.22051 0 3.3999 2.82061 3.3999 6.3C3.3999 9.77939 6.22051 12.6 9.6999 12.6Z"
    fill="#0B0C0C"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.70706 10.7071L1.70706 15.7071L0.292847 14.2929L5.29285 9.29289L6.70706 10.7071Z"
    fill="#0B0C0C"
  />
</svg>

const MinusYear = () => {
  let MinusYear = new Date()
  MinusYear.setFullYear(MinusYear.getFullYear() - 1)
  return MinusYear
}

const DateFormat = value => {
  return value ? format(new Date(value), 'dd/MM/yyyy') : '--/--/----'
}

const DateTimeFormat = value => {
  if( !value ) return '--/--/---- 00:00:00'
  let time = value.split('T')
  time = time[1].split('.')
  return `${format(new Date(value), 'dd/MM/yyyy')} ${time[0]}`
}

const CurrencyFormat = val => {
  return <NumberFormat
    value={val}
    displayType={'text'}
    thousandSeparator={true}
    prefix={'£'}
    decimalScale={2}
    fixedDecimalScale={true}
  />
}

export {
  searchIcon,
  MinusYear,
  DateFormat,
  DateTimeFormat,
  CurrencyFormat,
}
