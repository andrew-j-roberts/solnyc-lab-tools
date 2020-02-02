// found this example of how to use select multi with formik here:
// https://codesandbox.io/s/6ll36y9qjw

import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: "#000"
  })
};

function CustomCreatableSelect({ placeholder, field, form, options, isMulti = false, updateParentCb }) {
  const onChange = option => {
    form.setFieldValue(field.name, isMulti ? option.map(item => item.value) : option.value);
    // I wanted to use the Formik context in the form's parent component, this was my solution...
    updateParentCb ? updateParentCb(option.value) : null;
  };

  const getValue = () => {
    if (options) {
      return isMulti ? options.filter(option => field.value.indexOf(option.value) >= 0) : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <CreatableSelect
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      styles={customStyles}
    />
  );
}

function CustomSelect({ placeholder, field, form, options, isMulti = false, updateParentCb }) {
  const onChange = option => {
    form.setFieldValue(field.name, isMulti ? option.map(item => item.value) : option.value);
    // I wanted to use the Formik context in the form's parent component, this was my solution...
    updateParentCb ? updateParentCb(option.value) : null;
  };

  const getValue = () => {
    if (options) {
      return isMulti ? options.filter(option => field.value.indexOf(option.value) >= 0) : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <Select name={field.name} value={getValue()} onChange={onChange} placeholder={placeholder} options={options} isMulti={isMulti} styles={customStyles} />
  );
}

export { CustomSelect, CustomCreatableSelect };
