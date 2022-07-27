/* eslint-disable */
/* istanbul ignore file */
import React from "react";
import NumberFormat from "react-number-format";

import { format } from "date-fns";

// const arrow = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>

const MinusYear = () => {
  const MinusYear = new Date();
  MinusYear.setFullYear(MinusYear.getFullYear() - 1);
  return MinusYear;
};

const DateFormat = (value) => {
  return value ? format(new Date(value), "dd/MM/yyyy") : "--/--/----";
};

const DateTimeFormat = (value) => {
  if (!value) {
    return "--/--/---- 00:00:00";
  }
  let time = value.split("T");
  time = time[1].split(".");
  return `${format(new Date(value), "dd/MM/yyyy")} ${time[0]}`;
};

const CurrencyFormat = (val) => {
  return (
    <NumberFormat
      // style={{color:'#e03c31'}}
      value={val}
      displayType="text"
      thousandSeparator
      prefix="£"
      decimalScale={2}
      fixedDecimalScale
    />
  );
};

export { MinusYear, DateFormat, DateTimeFormat, CurrencyFormat };
