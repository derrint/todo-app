import http from '@/utils/http'

const todoService = {
  getAll() {
    return http.get('/todos')
  },

  getByUser(id: number | string) {
    return http.get(`/todos/user/${id}`)
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
