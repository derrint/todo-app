import { combineReducers } from 'redux'
import todoReducer from './todo'
import authReducer from './auth'

export default combineReducers({
  todos: todoReducer,
  auth: authReducer
})
