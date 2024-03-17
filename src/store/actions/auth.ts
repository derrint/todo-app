import Cookies from 'js-cookie'

import authService from '@/services/auth'
import { LOGIN, LOGOUT, SET_LOGIN_STATUS, SET_USER } from '@/store/types'
import { checkError } from '@/utils/helper'

export const login =
  (payload: any): any =>
  async (dispatch: any) => {
    try {
      const res = await authService.login(payload)
      checkError(res)
      const { data } = res.data

      dispatch({
        type: LOGIN,
        payload: data
      })
      const cookiesData = JSON.stringify({ token: data })

      Cookies.set('_derrint_todo_app', cookiesData, { expires: 7 })

      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

export const loadApp = (): any => async (dispatch: any) => {
  try {
    const userDataJSON = Cookies.get('_derrint_todo_app')
    const user = userDataJSON ? JSON.parse(userDataJSON) : {}

    let isSignedIn = false
    if (Object.hasOwn(user, 'token')) {
      isSignedIn = true
    }
    dispatch({
      type: SET_USER,
      payload: user
    })
    dispatch({
      type: SET_LOGIN_STATUS,
      payload: isSignedIn
    })

    return Promise.resolve({ user, isSignedIn })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const logout = (): any => async (dispatch: any) => {
  try {
    dispatch({
      type: LOGOUT,
      payload: {}
    })

    Cookies.remove('_derrint_todo_app')

    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}
