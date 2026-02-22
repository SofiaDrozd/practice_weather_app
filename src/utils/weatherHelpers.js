import sun from '../assets/staticimages/sun.png'
import cloud from '../assets/staticimages/cloud.png'
import rain from '../assets/staticimages/rain.png'
import snow from '../assets/staticimages/snow.png'
import bgDefault from '../assets/staticimages/bgDefault.png'

const bgMap = {
  сонячно: sun,
  ясно: sun,
  хмарно: cloud,
  хмарність: cloud,
  дощ: rain,
  злива: rain,
  мряка: rain,
  сніг: snow,
  хуртовина: snow
}

export const getWeatherBackground = weatherText => {
  if (!weatherText) return bgDefault

  const text = weatherText.toLowerCase()
  const foundKey = Object.keys(bgMap).find(key => text.includes(key))

  return foundKey ? bgMap[foundKey] : bgDefault
}
