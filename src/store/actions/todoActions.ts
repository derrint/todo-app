import { GET_TODOS, TODO_ERROR } from '@/store/types'
import axios from 'axios'

export const getTodos = (): any => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get('https://dummyjson.com/todos?limit=10')
      dispatch({
        type: GET_TODOS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: TODO_ERROR,
        payload: console.log(err)
      })
    }
  }
}
