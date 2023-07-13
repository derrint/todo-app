import http from '@/utils/http'

const authService = {
  login(data: any) {
    return http.post('/auth/login', data)
  }
}

export default authService
