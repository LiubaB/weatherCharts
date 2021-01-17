import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import weatherReducer from './weatherReducer'

const rootReducer = combineReducers({
  form: reduxFormReducer,
  weather: weatherReducer,
})

export default rootReducer
