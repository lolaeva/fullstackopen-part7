import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    return response.data
  })
}

const create = async (newObject, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
console.log("update ~ newObject", newObject)
console.log("update ~ id", id)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}
const comment = async (payload) => {
  console.log('comment ~ data', payload)
  const config = {
    headers: { Authorization: `bearer ${payload.user.token}` }
  }
  const response = await axios.post(
    `${baseUrl}/${payload.blogId}/comments`,
    { title: payload.comment },
    config
  )
  return response.data
}

export default { getAll, create, update, remove, comment }
