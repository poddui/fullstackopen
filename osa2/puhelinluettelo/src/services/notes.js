import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const fetchData = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postData = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteData = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateData = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export { fetchData, deleteData ,postData,  updateData }
  