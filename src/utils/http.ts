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

http.interceptors.response.use(
  (response: any) => {
    const status = response.data.string
    const message = response.data.error_message
    if (status === 'error') {
      if (message.includes('invalid token')) {
        // remove & redirect to login page
        Cookies.remove('_derrint_todo_app')
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
      }
      throw new Error(response.data.error_message)
    }

    return response
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default http
