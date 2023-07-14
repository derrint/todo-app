import Cookies from 'js-cookie'

import authService from '@/services/auth'
import { LOGIN, SET_LOGIN_STATUS, SET_USER } from '@/store/types'

export const login =
  (payload: any): any =>
  async (dispatch: any) => {
    try {
      const res = await authService.login(payload)

      dispatch({
        type: LOGIN,
        payload: res.data
      })

      Cookies.set('_derrint_todo_app', JSON.stringify(res.data), { expires: 7 })

      return Promise.resolve(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

export const loadApp = (): any => async (dispatch: any) => {
  try {
    const userDataJSON = Cookies.get('_derrint_todo_app')

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON)
      dispatch({
        type: SET_USER,
        payload: userData
      })
      dispatch({
        type: SET_LOGIN_STATUS,
        payload: true
      })
      return Promise.resolve(userData)
    } else {
      dispatch({
        type: SET_LOGIN_STATUS,
        payload: false
      })
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
