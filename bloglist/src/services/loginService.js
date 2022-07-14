import axios from 'axios'
const baseUrl = '/api/login'

const login = (data) => {
  console.log('data', data)
  const request = axios.post(baseUrl, data)
  return request.then((response) => {
    console.log('response', response)
    return response.data
  })
}

export default { login }
