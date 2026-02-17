import React, { useEffect, useState } from 'react'
import getWeather from '../../api'

function WeatherLoader () {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadWeather = () => {
    setIsLoading(true)
    getWeather({ name: 'Chernihiv' })
      .then(data => {
        setWeather(data)
      })
      .catch(e => setError(e))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadWeather()
  }, [])

  return (
    <>
      {error && <div>ERROR {JSON.stringify(error)}</div>}
      {isLoading && <div>LOADING...</div>}
      {!error && !isLoading && weather && (
        <>
          <h1>{weather.location.name}</h1>
          <p>{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt='icon' />
        </>
      )}
    </>
  )
}

export default WeatherLoader
