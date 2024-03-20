import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '@/utils/http'

const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({ url: '/todo', method: 'get' }),
      transformResponse: (res: any) => res.data,
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todo',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: 'PUT',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Todos']
    })
  })
})

export default todoApi

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi
