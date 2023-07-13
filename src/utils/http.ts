import axios from 'axios'

export default axios.create({
  baseURL: 'https://dummyjson.com/todos',
  headers: {
    'Content-type': 'application/json'
  }
})
