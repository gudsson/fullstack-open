import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


const usersService = { 
  getUser
}

export default usersService