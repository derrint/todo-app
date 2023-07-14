import { ITodo } from '@/interfaces/todo'
import { ADD_TODO, GET_TODOS, REMOVE_TODO, UPDATE_TODO } from '@/store/types'

const initialState: any = []

const todoReducer = (todos = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_TODOS:
      return payload.todos
    case ADD_TODO:
      return [payload, ...todos]
    case UPDATE_TODO:
      return todos.map((todo: ITodo) => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            ...payload
          }
        } else {
          return todo
        }
      })
    case REMOVE_TODO:
      return todos.filter(({ id }: any) => id !== payload.id)

    default:
      return todos
  }
}

export default todoReducer
