import { ITodo } from '@/interfaces/todo'
import { ADD_TODO, GET_TODOS, LOGIN, REMOVE_TODO, UPDATE_TODO } from '@/store/types'

const initialState = {
  isSignedIn: false,
  user: {}
}

const authReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isSignedIn: true,
        user: payload
      }

    default:
      return state
  }
}

export default authReducer
