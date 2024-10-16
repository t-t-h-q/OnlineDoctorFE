import { combineReducers } from 'redux'
import exampleReducer from 'store/exampleSlice'

const rootReducer = combineReducers({
  example: exampleReducer,
})

export default rootReducer
