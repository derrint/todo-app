import Cookies from 'js-cookie'

export const getToken = () => {
  const userDataJSON = Cookies.get('_derrint_todo_app')
  const user = userDataJSON ? JSON.parse(userDataJSON) : {}
  const token = user.token ?? null

  return token
}

export const setToken = (token: string, username: string) => {
  const cookiesData = JSON.stringify({ token, username })
  Cookies.set('_derrint_todo_app', cookiesData, { expires: 7 })
}

export const removeToken = () => {
  Cookies.remove('_derrint_todo_app')
}
