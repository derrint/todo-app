import { ADD_TODO, GET_TODOS } from '@/store/types'

const initialState = {
  todos: [],
  loading: true
}

const todoReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload.todos,
        loading: false
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false
      }
    default:
      return state
  }
}

export default todoReducer
