import { useState } from 'react'
import { useEffect } from 'react'
import countriesAPI from './services/countries'
import weatherAPI from './services/weather'
import './index.css'




const Countries = ({ countriesToShow, setCountriesToShow }) => {
  const [countryDetails, setCountryDetails] = useState(null)
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    if (countriesToShow.length == 1){
      setWeather(null)
      setCountryDetails(null)
      countriesAPI
      .getInfo(countriesToShow[0])
      .then(response => {
        setCountryDetails(response)
        return weatherAPI.getWeather({city: response.capital})
        .then(response => {
          setWeather(response)
        })
      }
      )
    }
  } , [countriesToShow])


  if (countriesToShow.length == 1 && countryDetails && weather) {
    return (
      <div>
        <h1>
          {countryDetails.name}
        </h1>
        <p>
          Capital: {countryDetails.capital}
        </p>
        <p>
          Area: {countryDetails.area} square kilometers
        </p>
        <strong>Languages:</strong>
        <ul>
          {countryDetails.languages.map(lang => <li key={lang}>{lang} </li>)}
        </ul>
        <img src={countryDetails.flag} alt={"Flag of " + countryDetails.name} />

        <h2>
          Weather in {countryDetails.capital}
        </h2>
        <p>Temperature: {weather.temp} Degrees celcius</p>
        <p>Wind speed: {weather.wind} m/s</p>
        <p>{weather.weather}</p>
        <img src={weather.icon} alt="" />
      </div>
    )

  } if (countriesToShow.length > 10) {
    return (<div>
      <p>Too many matches, be more specific.</p>
    </div>)
  }
  else {
    return (
      <ul>
        {countriesToShow.map(country => <li key={country}>{country} <button onClick={() => { setCountriesToShow([country]) }}>Show</button></li>)}
      </ul>
    )
  }

}

function App() {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [search, setSearch] = useState("")

  // runs first time, gets the list of countries
  useEffect(() => {
    countriesAPI
      .getAll()
      .then(response => {
        setCountries(response)
        setCountriesToShow(response)
      })
  }, [])

  // updates countries to show everytime the search changes
  useEffect(() => {
    setCountriesToShow(countries.filter(country => country.toLowerCase().includes(search.toLowerCase())))
  }, [search])



  return (
    <div className='app'>
      <h1>
        Atlas
      </h1>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow} />
    </div>
  )
}

export default App
