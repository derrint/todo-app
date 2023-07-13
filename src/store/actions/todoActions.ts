import { ADD_TODO, GET_TODOS } from '@/store/types'
import http from '@/utils/http'
import axios from 'axios'

export const getTodos = (): any => async (dispatch: any) => {
  try {
    const res = await http.get('/user/1')
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
      const res = await http.post('/add', payload)
      dispatch({
        type: ADD_TODO,
        payload: res.data
      })
      return Promise.resolve(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
