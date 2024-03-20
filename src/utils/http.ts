import axios from 'axios'
import Cookies from 'js-cookie'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

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

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await http({
        url: baseUrl + url,
        method,
        data,
        params,
        headers
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }

export default http
