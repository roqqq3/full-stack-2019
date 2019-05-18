import React from 'react'
import Country from './Country'

const Countries = (props) => {

  const ShowCountry = () => {
    return (
      <Country 
        country={props.country}
        weather={props.weather}
        condition={props.condition}
      />
    )
  }

  const TooManyCountries = () => {
    return( <p>Too many matches, please specify another filter</p> )
  }
  
  const FilteredCountries = () => {
    if (Object.keys(props.country).length > 0) { //if country state is set
      return(<ShowCountry name={props.country} />) //..show country
    } else if (props.filteredCountries.length > 10) {
      return <TooManyCountries />
    } else {
      return props.filteredCountries.map(i => 
        <li key={i.name}>
          {i.name}
          <button value={i.name} type="submit" onClick={props.handleCountryClick}>show</button>
        </li>
      )
    }
  }

  return (
    <div>
      <FilteredCountries/>
    </div>
  )
}

export default Countries