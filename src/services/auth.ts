import http from '@/utils/http'

const authService = {
  login(data: any) {
    return http.post('/login', null, { auth: data })
  }
}

export default authService
