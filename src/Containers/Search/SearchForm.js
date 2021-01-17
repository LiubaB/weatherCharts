import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField from 'Shared/renderField'

const SearchForm = ({ handleSubmit, formStates }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        component={renderField}
        name="city"
        placeholder='City'
        type="text"
      />
      <button type="submit" disabled={!formStates}>Search</button>
    </div>
  </form>
)

export default reduxForm({ form: 'form' })(SearchForm)
