import { createStore, applyMiddleware } from 'redux'
import apiMiddlware from './middleware/api'
import rootReducer from './reducers'

const middlewares = [apiMiddlware]
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store