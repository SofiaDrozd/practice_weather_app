import React, { useEffect, useState } from 'react'
import getWeather from '../../api'
import WeatherCard from '../WeatherCard'
import SideBar from '../SideBar'
import { getWeatherBackground } from '../../../utils/weatherHelpers'

function WeatherLoader () {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const cities = ['Chernihiv', 'Antalya', 'Paris', 'Oslo', 'London']
  const [activeCity, setActiveCity] = useState(cities[0])

  useEffect(() => {
    const bgUrl = getWeatherBackground(weather?.current?.condition?.text)
    if (bgUrl) {
      document.body.style.backgroundImage = `url(${bgUrl})`
    }
  }, [weather])

  const loadWeather = () => {
    setIsLoading(true)
    getWeather({ name: activeCity })
      .then(data => {
        setWeather(data)
      })
      .catch(e => setError(e))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadWeather()
  }, [activeCity])

  return (
    <>
      <SideBar
        cities={cities}
        activeCity={activeCity}
        onCitySelect={setActiveCity}
      ></SideBar>
      <div style={{ flex: 1 }}>
        {error && <div>ERROR {JSON.stringify(error)}</div>}
        {isLoading && <div>LOADING...</div>}
        {!error && !isLoading && weather && (
          <WeatherCard data={weather}></WeatherCard>
        )}
      </div>
    </>
  )
}

export default WeatherLoader
