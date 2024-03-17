import http from '@/utils/http'

const todoService = {
  get() {
    return http.get('/todo')
  },

  add(data: any) {
    return http.post('/todos/add', data)
  },

  update(id: number | string, data: any) {
    return http.put(`/todos/${id}`, data)
  },

  remove(id: number | string) {
    return http.delete(`/todos/${id}`)
  }
}

export default todoService
