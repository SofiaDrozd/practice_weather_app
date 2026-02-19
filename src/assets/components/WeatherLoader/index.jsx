import React, { useEffect, useState } from 'react'
import getWeather from '../../api'
import WeatherCard from '../WeatherCard'


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
        <WeatherCard data={weather}></WeatherCard>
      )}
    </>
  )
}

export default WeatherLoader
