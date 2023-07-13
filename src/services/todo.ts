import http from '@/utils/http'

const todoService = {
  getAll() {
    return http.get('/todos')
  },

  getByUser(id: any) {
    return http.get(`/todos/user/${id}`)
  },

  add(data: any) {
    return http.post('/todos/add', data)
  },

  update(id: number, data: any) {
    return http.put(`/todos/${id}`, data)
  }

  // delete(id) {
  //   return http.delete(`/tutorials/${id}`)
  // }

  // deleteAll() {
  //   return http.delete(`/tutorials`)
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`)
  // }
}

export default todoService
