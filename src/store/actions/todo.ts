import { v4 as uuidv4 } from 'uuid'

import { ITodo } from '@/interfaces/todo'
import todoService from '@/services/todo'
import { ADD_TODO, GET_TODOS, UPDATE_TODO, REMOVE_TODO } from '@/store/types'

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

      // data need to be overrided, to handle duplicate ids
      const newData: ITodo = {
        ...res.data,
        id: uuidv4()
      }

      dispatch({
        type: ADD_TODO,
        payload: newData
      })
      return Promise.resolve(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

export const updateTodo =
  (id: number | string, payload: any): any =>
  async (dispatch: any) => {
    try {
      if (typeof id === 'number') {
        const res = await todoService.update(id, { completed: payload.completed })
        dispatch({
          type: UPDATE_TODO,
          payload: res.data
        })
        return Promise.resolve(res.data)
      } else {
        dispatch({
          type: UPDATE_TODO,
          payload
        })
        return Promise.resolve(payload)
      }
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
        return Promise.resolve(res.data)
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
