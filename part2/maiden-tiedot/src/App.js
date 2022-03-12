import './App.css';
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'


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


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {console.log("response", response) || 
        setCountries(response)
      })
  }, [])

  useEffect(() => {
    weatherService
      .getAll()
      .then(response => {console.log("response", response) || 
        setWeather(response)
      })
  }, [])


  const ShowCountries = ({countries, filter, countryName}) => {
    const filterCountries = countries.filter((country) => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))
    const listToShow = filterCountries.map(country => <ShowCountry key={country.ccn3} country={country.name.common} handleClick={() => setFilter(country.name.common)} />)
    const showOneCountry = filterCountries.map(country => <ShowCountryDetails key={country.ccn3} name={country.name.common}
      capital={country.capital} area={country.area} languages={country.languages} flag={country.flag}/>)
    
    useEffect(() => 
    filterCountries === undefined ? console.log('is it run') ||
    setCapital(filterCountries[0].capital[0]) 
    : console.log('this should not be run') ||setCapital(''), [filterCountries])
    console.log(capital)
      if (filterCountries.length < 11 && filterCountries.length > 1) {
    return  listToShow 
    } else if (filterCountries.length === 1) {
      return (showOneCountry)
    } else {
      return <div> Too many matches, specify another filter </div>
    }
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


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }



  return (
    <div>
      find countries:
      <input value={filter} onChange={handleFilterChange}/>
      <ShowCountries countries={countries} filter={filter} />
      <ShowWeather weather={weather.main} name={weather.name} wind={weather.wind} icon={weather.weather}/>
    </div>
  );
}



export default App;
