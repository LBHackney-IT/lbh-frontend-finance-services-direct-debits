import React from "react";

import { InputField, SelectField } from ".";

const FieldLoop = (params) => {
  const { val, id, changeField, data } = params;

  const onChangeField = (e) => {
    const newData = Array.isArray(data) ? [...data] : { ...data };
    newData[e.target.name] = e.target.value;
    changeField(newData);
  };

  const set = data[val.id] ?? "";

  if (val.field === "title") {
    return <h2>{val.label}</h2>;
  }

  if (val.field === "input") {
    return (
      <InputField onChangeField={onChangeField} val={val} id={id} set={set} />
    );
  }

  if (val.field === "select" && val.type === "text") {
    return (
      <SelectField onChangeField={onChangeField} val={val} id={id} set={set} />
    );
  }

  return "";
}; // FieldLoop

export default FieldLoop;
