import './App.css';
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const ShowCountry = ({country, handleClick}) => {
  return (
  <li>
    {country} <button onClick={handleClick}>show</button>
  </li>
  )
}

const ShowLanguage = (props) => {
  return (
    <li>
      {props.language}
    </li>
  )
}

const ShowCountryDetails = (props) => {
  return (
  <div>
    <h2>{props.name}</h2>
    {props.capital}
    <br></br>
    {props.area}
    <br></br>
    languages:
    {Object.values(props.languages).map(language => <ShowLanguage key={language} language={language}/>)}
    <h2>{props.flag}</h2>
  </div>
  )
}

const ShowWeather = ({ weather, name, wind, icon}) => {
  if (weather !== undefined) {
  return (
    <div>
      <h2>Weather in {name}</h2>
    Temperature: {weather.temp} °F
    <br></br>
    <img src={`http://openweathermap.org/img/wn/${icon[0].icon}@2x.png`}></img>
    <br></br>
    Wind speed: {wind.speed} m/s
    </div>
  ) } else {
    return (
    <div></div>
    )
  }
}


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [capital, setCapital] = useState('Helsinki')
  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {console.log("response", response) || 
        setCountries(response)
      })
  }, [])

const city_name = capital
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`


  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {console.log("response", response) || 
        setWeather(response.data)
      })
  }, [capital])




  const ShowCountries = ({countries, filter}) => {
    const filterCountries = countries.filter((country) => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))
    const listToShow = filterCountries.map(country => <ShowCountry key={country.ccn3} country={country.name.common} handleClick={() => setFilter(country.name.common)} />)
    const showOneCountry = filterCountries.map(country => <ShowCountryDetails key={country.ccn3} name={country.name.common}
      capital={country.capital} area={country.area} languages={country.languages} flag={country.flag}/>)
    if (filterCountries.length < 11 && filterCountries.length > 1) {
    return  listToShow 
    } else if (filterCountries.length === 1) {
      return showOneCountry
    } else {
      return <div> Too many matches, specify another filter </div>
    }
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const getCapital = countries.filter((country) => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))
    setCapital(getCapital[0].capital[0])
    setFilteredCountries(getCapital)
  }



  return (
    <div>
      find countries:
      <input value={filter} onChange={handleFilterChange}/>
      <ShowCountries countries={countries} filter={filter} />
      {filteredCountries.length === 1 ? <ShowWeather weather={weather.main} name={weather.name} wind={weather.wind} icon={weather.weather}/>: null}
    </div>
  );
}



export default App;
