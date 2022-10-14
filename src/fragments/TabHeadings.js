import React from "react";

const TabHeadings = (params) => {
  const { titles, tab, setTab } = params;

  const heads = Object.entries(titles).map(([key, value]) => {
    return (
      <li
        key={key}
        className={`govuk-tabs__list-item${
          tab === key ? " govuk-tabs__list-item--selected" : ""
        }`}
      >
        <a
          href={`#${key}`}
          onClick={() => {
            setTab(key);
          }}
          className="govuk-tabs__tab"
        >
          {value}
        </a>
      </li>
    );
  });

  return (
    <div className="govuk-tabs lbh-tabs" data-module="govuk-tabs">
      {/* <h2 className="govuk-tabs__title">Contents</h2> */}
      <ul className="govuk-tabs__list">{heads}</ul>
    </div>
  );
};

export default TabHeadings;
