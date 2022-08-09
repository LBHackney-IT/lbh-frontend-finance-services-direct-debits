import React, { Fragment } from "react";
import DatePicker from "react-date-picker";

// const DateField = () => {
//   const tSplit = data[field.name].includes('T') ? data[field.name].split('T') : [data[field.name]]
//   const val = tSplit[0].split('-')
//   const setDate = e => {
//     const newVal = val
//     if( e.target.name === 'year' ) newVal[0] = e.target.value
//     if( e.target.name === 'month' ) newVal[1] = e.target.value
//     if( e.target.name === 'day' ) newVal[2] = e.target.value
//     fieldChange(field.name, newVal.join('-'), e.target.type)
//   }
//   return <>
//     <input
//       value={val[0]}
//       type='number'
//       required={field.required}
//       name='year'
//       min='1900'
//       onChange={e => setDate(e)}
//       className={`govuk-input lbh-input govuk-input--${fieldStatus}`}
//       style={{ width:'86px', marginRight:'18px' }}
//       aria-describedby="input-with-error-message-hint input-with-error-message-error"
//     />
//     <input
//       value={val[1]}
//       type='number'
//       required={field.required}
//       name='month'
//       min='1'
//       max='12'
//       onChange={e => setDate(e)}
//       className={`govuk-input lbh-input govuk-input--${fieldStatus}`}
//       style={{ width:'86px', marginRight:'18px' }}
//       aria-describedby="input-with-error-message-hint input-with-error-message-error"
//     />
//     <input
//       value={val[2]}
//       type='number'
//       required={field.required}
//       name='day'
//       min='1'
//       max='31'
//       onChange={e => setDate(e)}
//       className={`govuk-input lbh-input govuk-input--${fieldStatus}`}
//       style={{ width:'86px', marginRight:'18px' }}
//       aria-describedby="input-with-error-message-hint input-with-error-message-error"
//     />
//   </>
// }

const Form = (params) => {
  const { fields, data, setData, validate, setValidate, onSubmit } = params;

  const fieldHTML = fields.map((group, fieldKey) => {
    let groupStatus = "standard";

    if (group[0].field === "submit") {
      return (
        <button
          className="govuk-button lbh-button"
          key={fieldKey}
          onClick={() => setValidate(true)}
        >
          {group[0].text}
        </button>
      );
    }

    const grouping = group.map((field, groupKey) => {
      const id = `${field.name}_${groupKey}`;

      const fieldChange = (name, val, type) => {
        const newData = { ...data };
        if (type === "number") {
          newData[name] = Number(val) !== 0 ? Number(val) : null;
        } else {
          newData[name] = val;
        }
        setData(newData);
      };

      let fieldStatus = "standard";
      if (field.required && validate && data[field.name] === "") {
        groupStatus = "error";
        fieldStatus = "error";
      }

      return (
        <Fragment key={id}>
          {field.field === "title" && <h4>{field.text}</h4>}

          {field.label && (
            <label className="govuk-label lbh-label" htmlFor={id}>
              {field.label}
            </label>
          )}

          {field.field === "input" && (
            <input
              className={`govuk-input lbh-input w-100 govuk-input--${fieldStatus}`}
              value={data[field.name] ?? ""}
              onChange={(e) =>
                fieldChange(field.name, e.target.value, field.type)
              }
              id={id}
              disabled={field.disabled}
              name={field.name}
              type={field.type}
              required={field.required}
              aria-describedby="input-with-error-message-hint input-with-error-message-error"
            />
          )}

          {field.field === "datepicker" && (
            <DatePicker
              onChange={(e) => fieldChange(field.name, e)}
              value={data[field.name]}
              format="y-MM-dd"
            />
          )}
          {/* {field.field === 'datepicker' && DateField()} */}

          {field.field === "select" && (
            <select
              className={`govuk-input lbh-input w-100 govuk-input--${fieldStatus}`}
              value={data[field.name]}
              onChange={(e) =>
                fieldChange(field.name, e.target.value, "select")
              }
              id={id}
              name={field.name}
              required={field.required}
              aria-describedby="input-with-error-message-hint input-with-error-message-error"
            >
              <option value="">Please Select</option>
              {field.options.map((option) => {
                return (
                  <option key={option[0]} value={option[0]}>
                    {option[1]}
                  </option>
                );
              })}
            </select>
          )}

          {fieldStatus === "error" && (
            <span
              id="input-with-error-message-error"
              className="govuk-error-message lbh-error-message"
            >
              <span className="govuk-visually-hidden">Error:</span>{" "}
              {field.label ? `"${field.label}"` : "This field"} is required
            </span>
          )}
        </Fragment>
      );
    });

    return (
      <div
        className={`govuk-form-group lbh-form-group govuk-form-group--${groupStatus}`}
        key={fieldKey}
      >
        <fieldset className="govuk-fieldset lbh-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend w-100">
            {grouping}
          </legend>
        </fieldset>
      </div>
    );
  });

  return (
    <form style={{ maxWidth: "480px" }} onSubmit={(e) => onSubmit(e)}>
      {fieldHTML}
    </form>
  );
};

export default Form;
