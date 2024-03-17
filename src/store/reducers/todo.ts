import { ADD_TODO, GET_TODOS, REMOVE_TODO, UPDATE_TODO } from '@/store/types'

const initialState: any = []

const todoReducer = (todos = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_TODOS:
      return payload
    case ADD_TODO:
      return payload
    case UPDATE_TODO:
      return payload
    case REMOVE_TODO:
      return todos.filter(({ id }: any) => id !== payload.id)

    default:
      return todos
  }
}

export default todoReducer
