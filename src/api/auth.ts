import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '@/utils/http'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        const { username, password } = data
        const credentials = btoa(username + ':' + password)

        return {
          url: '/login',
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + credentials
          }
        }
      },
      invalidatesTags: ['Auth']
    })
  })
})

export default authApi

export const { useLoginMutation } = authApi
