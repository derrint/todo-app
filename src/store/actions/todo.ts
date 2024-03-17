import todoService from '@/services/todo'
import { ADD_TODO, GET_TODOS, UPDATE_TODO, DELETE_TODO } from '@/store/types'

export const getTodos = (): any => async (dispatch: any) => {
  try {
    const res = await todoService.get()
    const { data } = res.data

    dispatch({
      type: GET_TODOS,
      payload: data
    })
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const addTodo =
  (payload: any): any =>
  async (dispatch: any) => {
    try {
      const res = await todoService.add(payload)
      const { data } = res.data

      dispatch({
        type: ADD_TODO,
        payload: data
      })
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

export const updateTodo =
  (id: string, payload: any): any =>
  async (dispatch: any) => {
    try {
      const res = await todoService.update(id, payload)
      const { data } = res.data

      dispatch({
        type: UPDATE_TODO,
        payload: data
      })
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

export const deleteTodo =
  (id: string): any =>
  async (dispatch: any) => {
    try {
      const res = await todoService.delete(id)
      const { data } = res.data

      dispatch({
        type: DELETE_TODO,
        payload: data
      })
      return Promise.resolve(data)
    } catch (err) {
      Promise.reject(err)
    }
  }
