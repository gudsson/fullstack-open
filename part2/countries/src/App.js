import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Countries = ({ countries }) => {
  
  if (countries.length > 10) return <div>Too many matches, specify another filter</div>
  if (countries.length === 1) return <DisplayCountry country={countries[0]} />
  if (countries.length === 0) return <div>No matches, specify another filter</div>

  return (
    <>
      {countries.map(country => 
        <span key={country.numericCode}>
          {country.name}<button value={country.name}>show</button><br />
        </span>  
      )}
    </>
  )
}

const DisplayCountry = ({ country }) => {
    return (
      <div>
        <CountryInfo country={country} />
        <CityWeather city={country.capital} />
      </div>
    );
}

const CityWeather = ({ city }) => {
  const [ weather, setWeather ] = useState({});
  useEffect(() => {
    let endpoint = encodeURI(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
    console.log('effect')

    axios
      .get(endpoint)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [city]);

  if (Object.keys(weather).length === 0) {
    return <></>
  }

  return (
    <>
      <h3>Weather in {weather.location.name}</h3>
      <strong>temperature:</strong> {weather.current.temperature} Celsius<br />
      <img src={weather.current.weather_icons[0]} alt='weather icon' style={{height: "100px"}}></img><br />
      <strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
    </>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
    
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>

      <img src={country.flag} alt='national flag' style={{height: "100px"}}></img>
    </>
  )
}

const Filter = ({ filter, handleClick }) => {
  return (
    <>
      <input 
        value={filter}
        onChange={handleClick}
      />
    </>
  );
}

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, []);
  
  console.log('render', countries.length, 'countries');

  const handleFilterChange = e => setFilter(e.target.value);

  const handleClick = e => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      setFilter(e.target.value)
    }
  }

  const applyFilter = (countries) => {
    if (filter === '') return countries;
    return countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  }

  return (
    <div>

      find countries&nbsp;
      <Filter
        filter={filter}
        handleClick={handleFilterChange}
      /><br />

      {filter !== '' &&
        <span onClick={handleClick}>
          <Countries countries={applyFilter(countries)} />
        </span>
      }
      
    </div>
    );
}

export default App