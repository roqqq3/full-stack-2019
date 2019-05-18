import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  
  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ country, setCountry ] = useState([])
  const [ weather, setWeather ] = useState([])
  const [ condition, setCondition ] = useState([])

  const handleCountryClick = (event) => {
    setFilter('')
    const country = countries.find(i => i.name === event.target.value)
    setCountry(country)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filtered = countries
      .filter(i => i.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredCountries(filtered)
    if (filtered.length === 1) {
      setCountry(filtered[0])
    } else {
      setCountry([])
    }
  }

  useEffect(() => {
    if (Object.keys(country).length > 0) { //if country object is empty, don't get the weather for it
      axios
      .get('http://api.apixu.com/v1/current.json?key=ecf159939d9742b082c160948191505&q=' + country.capital)
      .then(response => {
        setWeather(response.data.current)
        setCondition(response.data.current.condition)
      })
    }
  }, [country])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  return (
    <div>
      <Filter 
        handleFilterChange={handleFilterChange} 
        newFilter={filter}
      />
      <Countries
        countries={countries}
        filter={filter}
        handleCountryClick={handleCountryClick}
        country={country}
        setCountry={setCountry}
        weather={weather}
        condition={condition}
        filteredCountries={filteredCountries}
      />
    </div>
  );
}

export default App;
