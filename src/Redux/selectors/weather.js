import { createSelector } from 'reselect'

const getState = state => state.weather

export const getWeatherSelector = createSelector(
  getState,
  ({ weather }) => weather
)

export const getErrorSelector = createSelector(
  getState,
  ({ isError }) => isError
)