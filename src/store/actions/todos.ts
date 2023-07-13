import { ADD_TODO, GET_TODOS } from '@/store/types'
import todoService from '@/services/todo'

export const getTodos = (): any => async (dispatch: any) => {
  try {
    const res = await todoService.getByUser(1)
    dispatch({
      type: GET_TODOS,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const addTodo =
  (payload: any): any =>
  async (dispatch: any) => {
    try {
      const res = await todoService.add(payload)
      dispatch({
        type: ADD_TODO,
        payload: res.data
      })
      return Promise.resolve(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
