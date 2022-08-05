import React from "react";

const SelectField = (params) => {
  const { onChangeField, val, id, set } = params;
  return (
    <select
      id={id}
      name={val.id}
      className="form-control form_field mb-3"
      value={set}
      onChange={(e) => onChangeField(e)}
    >
      <option value="" disabled>
        Please select
      </option>
      {val.options.map((v, k) => {
        return (
          <option key={k} value={v[0]}>
            {v[1]}
          </option>
        );
      })}
    </select>
  );
};

export default SelectField;
