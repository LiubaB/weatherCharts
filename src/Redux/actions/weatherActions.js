import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from './api'

const { REACT_APP_API_KEY } = process.env

export const GET_WEATHER = createAsyncAction(
  'GET_WEATHER'
)
export const getWeather = (city, callback) =>
  apiCall({
    method: 'get',
    endpoint: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${REACT_APP_API_KEY}`,
    types: GET_WEATHER,
    callback
  })
