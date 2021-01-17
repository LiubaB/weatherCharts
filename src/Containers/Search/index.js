import React from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { createStructuredSelector } from 'reselect'
import { getWeather } from 'Redux/actions/weatherActions'
import { getErrorSelector } from 'Redux/selectors/weather'
import SearchForm from './SearchForm'

const SearchComponent = ({ formStates, onGetWeather, isError }) => {

  const handleSubmit = () => {
    const { city } = formStates
    onGetWeather(city)
  }

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} formStates={formStates} />
      {
        isError && (
          <p>City not found.</p>
        )
      }
    </div>
  )
}

const selector = createStructuredSelector({
  formStates: state => getFormValues('form')(state),
  isError: getErrorSelector,
})

const actions = {
  onGetWeather: getWeather,
}

export default connect(selector, actions)(SearchComponent)
