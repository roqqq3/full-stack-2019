import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async object => {
  console.log(token)
  const config = { headers: { Authorization: token }, }
  const response = await axios.delete(`/api/blogs/${object.id}`, config)
  return response.data
}

export default { getAll, create, setToken, remove }