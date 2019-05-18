import React from 'react'

const Country = (props) => {
  
  return (
    <div>
      <h1>{props.country.name}</h1>
      capital {props.country.capital} <br/>
      population {props.country.population}
      <h3>languages</h3>
      <ul>
        {props.country.languages.map(i => <li key={i.name}>{i.name}</li>)}
      </ul>
      <img src={props.country.flag} alt="flag missing" height="10%" width="10%"/>
      <div>
        <h3>Weather in {props.country.name}</h3>
        <b>temperature: </b> {props.weather.temp_c} <br />
        <img src={props.condition.icon} alt='weather icon missing'/> <br />
        <b>wind: </b> {props.weather.wind_kph} kph direction {props.weather.wind_dir}
      </div>
    </div>
  )
}

export default Country