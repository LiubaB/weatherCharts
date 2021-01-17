import React from 'react'

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error },
  required,
}) => (
  <div>
    <input
      {...input}
      placeholder={placeholder}
      required={required}
      type={type}
      value={input.value}
    />
    {touched && error && (
      <span>{error}</span>
    )}
  </div>
)

export default renderField
