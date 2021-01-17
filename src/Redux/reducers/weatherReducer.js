import { createReducer } from 'Helpers/redux'
import { GET_WEATHER } from '../actions/weatherActions'

const initialState = {
  weather: {},
  isError: false,
}

const handlers = {
  [GET_WEATHER.SUCCESS]: (prevState, { payload }) => ({
    ...prevState,
    weather: payload.list,
    isError: false,
  }),
  [GET_WEATHER.FAILURE]: (prevState, { payload }) => ({
    ...prevState,
    isError: true,
  }),
}

export default createReducer(initialState, handlers)
