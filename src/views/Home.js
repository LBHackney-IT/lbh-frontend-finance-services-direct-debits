import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { searchIcon } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import * as RouteConstants from "../routes/RouteConstants";
// import IntroText from '../references/IntroText'

const Home = () => {
  const navigate = useNavigate();
  const Ref = "HousingSearch";
  const searchOptions = TextReferences[Ref];
  const [searchType, setSearchType] = useState(searchOptions[0].value);
  const [searchTerm, setSearchTerm] = useState("");

  const runSearch = () => {
    if (!searchTerm) {
      return;
    }
    navigate(
      `${RouteConstants.SEARCH}/${searchType}/${encodeURIComponent(
        searchTerm
      )}/1`,
      { replace: false }
    );
  };

  return (
    <>
      {/* <IntroText /> */}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>{TextReferences.Titles.Home}</h1>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="find-property-search-bar">
            <div className="govuk-form-group lbh-form-group lbh-search-box">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="govuk-select lbh-select"
                style={{ width: "200px" }}
              >
                {searchOptions.map((opt) => {
                  return (
                    <option key={opt.value} value={opt.value}>
                      {opt.text}
                    </option>
                  );
                })}
              </select>
              <span style={{ position: "relative" }}>
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="govuk-input lbh-input govuk-input--width-10"
                  style={{ width: "360px" }}
                  name="propSearchInput"
                  value={searchTerm}
                  placeholder={TextReferences.TextRef.Placeholder}
                  onKeyPress={(e) => e.key === "Enter" && runSearch()}
                />
                <button
                  onClick={() => runSearch()}
                  className="lbh-search-box__action"
                >
                  <span className="govuk-visually-hidden">
                    {TextReferences.TextRef.Search}
                  </span>
                  {searchIcon}
                </button>
              </span>
            </div>
          </div>
        </div>
        <div
          className="govuk-grid-column-one-third"
          style={{ textAlign: "right" }}
        >
          <Link
            to={RouteConstants.DIRECTDEBIT}
            className="mt-0 govuk-button lbh-button"
          >
            {TextReferences.Titles.DirectDebits}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
