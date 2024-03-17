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

  delete(id: string) {
    return http.delete(`/todo/${id}`)
  }
}

export default todoService
