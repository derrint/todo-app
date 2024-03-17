import axios from 'axios'
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-type': 'application/json'
  }
})

http.interceptors.request.use(
  async (config: any) => {
    const userDataJSON = Cookies.get('_derrint_todo_app')
    const user = userDataJSON ? JSON.parse(userDataJSON) : {}
    const token = user.token ?? null

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default http
