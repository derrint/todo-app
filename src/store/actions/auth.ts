import authService from '@/services/auth'
import { LOGIN } from '@/store/types'

export const login =
  (payload: any): any =>
  async (dispatch: any) => {
    try {
      const res = await authService.login(payload)

      dispatch({
        type: LOGIN,
        payload: res.data
      })
      return Promise.resolve(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
