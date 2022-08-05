import React from "react";

const InputField = (params) => {
  const { onChangeField, val, id, set } = params;

  return (
    <input
      className="form-control form_field mb-3"
      type={val.type}
      id={id}
      name={val.id}
      value={set}
      onChange={(e) => onChangeField(e)}
      disabled={val.editable}
      required={val.required}
    />
  );
};

export default InputField;
