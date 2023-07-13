import { ITodo } from '@/interfaces/todo'
import { ADD_TODO, GET_TODOS, UPDATE_TODO } from '@/store/types'

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
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo: ITodo) => {
          if (todo.id === payload.id) {
            return {
              ...todo,
              ...payload
            }
          } else {
            return todo
          }
        }),
        loading: false
      }
    default:
      return state
  }
}

export default todoReducer
