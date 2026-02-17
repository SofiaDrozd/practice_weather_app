function getWeather (options) {
  const { name } = options
  const API_KEY = 'a5cfa61fa633440988a122551261602'

  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${name}&lang=uk`
  )
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export default getWeather
