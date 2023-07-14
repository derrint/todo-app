import { LOGIN, SET_USER, SET_LOGIN_STATUS, LOGOUT } from '@/store/types'

const initialState = {
  isSignedIn: false,
  user: {}
}

const authReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isSignedIn: true,
        user: payload
      }
    case SET_USER:
      return {
        ...state,
        user: payload
      }
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isSignedIn: payload
      }
    case LOGOUT:
      return {
        ...state,
        isSignedIn: false,
        user: payload
      }

    default:
      return state
  }
}

export default authReducer
