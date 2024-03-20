import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '@/utils/http'
import { ITodoPayload } from '@/interfaces/todo'

const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({ url: '/todo', method: 'get' }),
      transformResponse: (res: any) => res.data,
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation({
      query: (payload: ITodoPayload) => ({
        url: '/todo',
        method: 'POST',
        data: payload
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation({
      query: (payload) => ({
        url: `/todo/${payload.id}`,
        method: 'PUT',
        data: payload.data
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todo/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todos']
    })
  })
})

export default todoApi

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi
