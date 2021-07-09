import React, { useState, useEffect } from 'react'
import LabeledInputfield from './modules/LabeledInputfield'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchtext, setSearchtext] = useState('')
  
  // Getting the country data
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
        .then((response) => {
          setCountries(response.data)
        })
  },[])
  
  // Updating search text
  const handleChangeSearchtext = (event) => (setSearchtext(event.target.value))
  
  const countriesToShow = countries.filter(country => (
    country.name.toLowerCase().match(`.*${searchtext.toLowerCase()}.*`)
  ))
  

  return (
    <>
      <LabeledInputfield name='Find countries' value={searchtext} onChange={handleChangeSearchtext} />
      <SearchResults countries={countriesToShow} setSearchtext={setSearchtext} />
    </>
  )
}

const SearchResults = ({countries, setSearchtext}) => {
  console.log(countries)
  if (countries.length > 1) {
    return countries.map(country => (
      <div key={country.name}>
        {country.name}
        <button onClick={() => setSearchtext(country.name)}>show</button>
      </div>
    ))
  }

  if (countries.length === 0) return <></>
  return <Country country={countries[0]} />
}

const Country = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <p>
      Capital: {country.capital}<br/>
      Population: {country.population}
    </p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(language => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={`The flag of ${country.name}`} width="100" />
  </div>
)

export default App