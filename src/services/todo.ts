import http from '@/utils/http'

const todoService = {
  getAll() {
    return http.get('/todos')
  },

  getByUser(id: number) {
    return http.get(`/todos/user/${id}`)
  },

  add(data: any) {
    return http.post('/todos/add', data)
  },

  update(id: number, data: any) {
    return http.put(`/todos/${id}`, data)
  },

  remove(id: number) {
    return http.delete(`/todos/${id}`)
  }
}

export default todoService
