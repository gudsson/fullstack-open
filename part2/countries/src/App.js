import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries }) => {
  
  if (countries.length > 10) return <div>Too many matches, specify another filter</div>
  if (countries.length === 1) return <CountryInfo country={countries[0]}/>
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

const CountryInfo = ({ country }) => {

  return (
    <div>
      <h2>{country.name}</h2>

      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>

      <img src={country.flag} alt='national flag' style={{height: "100px"}}></img>
    </div>
  );
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
    return countries.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
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
          <Countries countries={applyFilter(countries)}/>
        </span>
      }
      
    </div>
    );
}

export default App