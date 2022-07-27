/* eslint-disable */
/* istanbul ignore file */
import React, { useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DatePicker from "react-date-picker";

import { getOperatingBalances, getTenancySummary } from "../Api";
import { DataReferences } from "../references/DataReferences";
import { MinusYear } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import { TableHTML, TableSort } from "../templates/Table";

const OperatingBalances = () => {
  const Ref = "OperatingBalances";
  const DataRows = DataReferences[Ref];

  const [startDate, setStartDate] = useState(MinusYear);
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(undefined);
  const [searching, setSearching] = useState(false);
  const [CSVSearching, setCSVSearching] = useState(false);
  const [csvData, setCSVData] = useState(undefined);

  // TABLE HEAD
  const [sort, setSort] = useState({
    value: DataRows[0].sort,
    direction: true,
  });
  const onSort = useCallback(
    (val) => {
      setSort(val);
      const dataSort = TableSort(sort, data);
      if (dataSort !== false) {
        setData(dataSort);
      }
    },
    [sort]
  );

  const getData = async () => {
    setSearching(true);
    const response = await getOperatingBalances({
      startDate,
      endDate,
    });
    const filtered =
      response !== undefined && response.length
        ? response.map((item) => {
            const itemOutput = {};
            DataRows.forEach((row) => {
              itemOutput[row.sort] = item[row.sort];
            });
            return itemOutput;
          })
        : [];
    setData(filtered);
    setSearching(false);
  };

  const getCSVData = async () => {
    setCSVSearching(true);
    const response = await getTenancySummary({
      startDate,
      endDate,
    });
    setCSVData(response);
    setCSVSearching(false);
  };

  useEffect(() => {
    getData();
    getCSVData();
  }, [startDate, endDate]);

  const SearchResults = () => {
    if (searching) {
      return <h4>{TextReferences.TextRef.Searching}</h4>;
    }
    if (data === undefined || !data.length) {
      return <h4>{TextReferences.TextRef.NothingFound}</h4>;
    }

    return (
      <TableHTML tableHead={Ref} sort={sort} onSort={onSort} data={data} />
    );
  }; // searchResults

  const SearchBar = () => {
    return (
      <div className="date-range-search-bar">
        <div className="bar-component-cont">
          <label className="govuk-label govuk-date-input__label">Start:</label>
          <DatePicker
            disabled={searching}
            clearIcon={null}
            onChange={setStartDate}
            value={startDate}
            format="dd-MM-y"
          />
          <label className="govuk-label govuk-date-input__label">End:</label>
          <DatePicker
            disabled={searching}
            clearIcon={null}
            onChange={setEndDate}
            value={endDate}
            format="dd-MM-y"
          />
        </div>

        {!CSVSearching && csvData !== undefined && csvData.length && (
          <CSVLink
            data={csvData}
            // headers={}
            className="govuk-button govuk-secondary lbh-button lbh-button--secondary mt-0 ml-auto"
            filename={`operating-balances-${new Date().toLocaleString()}.csv`}
          >
            {TextReferences.TextRef.ExportCSV}
          </CSVLink>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>{TextReferences.Titles.OperatingBalances}</h1>
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default OperatingBalances;
