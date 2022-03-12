import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
console.log(api_key)
const city_name = 'London'
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { 
    getAll: getAll
  }