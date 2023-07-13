import { ADD_TODO, GET_TODOS, UPDATE_TODO, REMOVE_TODO } from '@/store/types'
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

export const updateTodo =
  (id: number, payload: any): any =>
  async (dispatch: any) => {
    try {
      const res = await todoService.update(id, payload)
      dispatch({
        type: UPDATE_TODO,
        payload: res.data
      })
      return Promise.resolve(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

export const removeTodo =
  (id: number): any =>
  async (dispatch: any) => {
    try {
      const res = await todoService.remove(id)
      dispatch({
        type: REMOVE_TODO,
        payload: { id }
      })
      return Promise.resolve(res.data)
    } catch (err) {
      Promise.reject(err)
    }
  }
