import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const addLike = async (object) => {
    const newObject = { ...object, votes: object.votes + 1 }
    const response = await axios.put(`${baseUrl}/${object.id}`, newObject )
    console.log("taal ollaan", response.data)
    return newObject
  }


export default { getAll, createNew, addLike }