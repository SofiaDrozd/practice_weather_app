function getWeather (options) {
  const { name } = options
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${name}&lang=uk`
  )
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export default getWeather
