import { ITodoPayload } from '@/interfaces/todo'
import http from '@/utils/http'

const todoService = {
  get() {
    return http.get('/todo')
  },

  add(data: ITodoPayload) {
    return http.post('/todo', data)
  },

  update(id: string, data: ITodoPayload) {
    return http.put(`/todo/${id}`, data)
  },

  remove(id: number | string) {
    return http.delete(`/todos/${id}`)
  }
}

export default todoService
