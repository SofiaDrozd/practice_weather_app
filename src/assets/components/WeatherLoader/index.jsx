import React, { useEffect, useState } from 'react'
import getWeather from '../../api'
import WeatherCard from '../WeatherCard'
import SideBar from '../SideBar'
import { getWeatherBackground } from '../../../utils/weatherHelpers'

function WeatherLoader () {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [cities, setCities] = useState(['Chernihiv', 'Antalya', 'Paris', 'Oslo', 'London'])
  const [activeCity, setActiveCity] = useState(cities[0])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let query = `${latitude},${longitude}`;

        getWeather({ name: query })
          .then(data => {
            const detectedCity = data.location.name;
            
            setCities(prevCities => {
              if (!prevCities.includes(detectedCity)) {
                return [detectedCity, ...prevCities];
              }
              return prevCities;
            });
            
            setActiveCity(detectedCity);
          })
          .catch(error => console.log("Помилка геолокації:", error));
      });
    }
  }, []);

  useEffect(() => {
    const bgUrl = getWeatherBackground(weather?.current?.condition?.text)
    if (bgUrl) {
      document.body.style.backgroundImage = `url(${bgUrl})`
    }
  }, [weather])

  const loadWeather = () => {
    if (!activeCity) return; 

    setIsLoading(true)
    getWeather({ name: activeCity })
      .then(data => {
        setWeather(data)
        setError(null) 
      })
      .catch(e => setError(e))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadWeather()
  }, [activeCity])

  const handleAddCity = (newCity) => {
    const trimmedCity = newCity.trim()
    
    if (trimmedCity === '') return
    if (cities.includes(trimmedCity)) {
      alert('Це місто вже є у списку!')
      return
    }

    setIsLoading(true) 
    
    getWeather({ name: trimmedCity })
      .then(data => {
        const realCityName = data.location.name 
        
        setCities(prev => [...prev, realCityName])
        setActiveCity(realCityName)
        setError(null)
      })
      .catch(() => {
        alert(`Місто "${trimmedCity}" не знайдено в базі даних!`)
      })
      .finally(() => setIsLoading(false))
  }

  const handleDeleteCity = (cityToDelete) => {
    const updatedCities = cities.filter(city => city !== cityToDelete)
    setCities(updatedCities)

    if (activeCity === cityToDelete) {
      setActiveCity(updatedCities.length > 0 ? updatedCities[0] : null)
      if (updatedCities.length === 0) setWeather(null)
    }
  }

  return (
    <>
      <SideBar
        cities={cities}
        activeCity={activeCity}
        onCitySelect={setActiveCity}
        onAddCity={handleAddCity}
        onDeleteCity={handleDeleteCity}
      />
      <div style={{ flex: 1 }}>
        {error && <div>Помилка: місто не знайдено.</div>}
        {isLoading && <div>LOADING...</div>}
        {!error && !isLoading && weather && activeCity && (
          <WeatherCard data={weather}></WeatherCard>
        )}
        {!activeCity && <div>Будь ласка, додайте місто...</div>}
      </div>
    </>
  )
}

export default WeatherLoader