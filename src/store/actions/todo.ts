import todoService from '@/services/todo'
import { ADD_TODO, GET_TODOS, UPDATE_TODO, REMOVE_TODO } from '@/store/types'

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
      dispatch({
        type: UPDATE_TODO,
        payload
      })
      return Promise.resolve(payload)
    } catch (err) {
      return Promise.reject(err)
    }
  }

export const removeTodo =
  (id: number | string): any =>
  async (dispatch: any) => {
    try {
      if (typeof id === 'number') {
        const res = await todoService.remove(id)
        dispatch({
          type: REMOVE_TODO,
          payload: { id }
        })
        return Promise.resolve(res.data.data)
      } else {
        dispatch({
          type: REMOVE_TODO,
          payload: { id }
        })
      }
    } catch (err) {
      Promise.reject(err)
    }
  }
