import React from 'react'
import styles from './WeatherCard.module.scss'

function WeatherCard ({ data }) {
  
  if (!data || !data.location) {
    return null
  }

  const { location, current } = data
  const { condition } = current

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.cityTitle}>
          {location.name}, {location.country}
        </h1>
        <hr className={styles.line} />
      </header>

      <div className={styles.mainContent}>
        <img
          src={condition.icon}
          alt='icon'
          className={styles.mainIcon}
        />
        <div className={styles.infoBlock}>
          <div className={styles.date}>
            {new Date(location.localtime).toLocaleDateString('uk-UA', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </div>

          <div className={styles.temperature}>
            {Math.round(current.temp_c)}°
          </div>
          <p className={styles.conditionText}>{condition.text}</p>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span>Відчувається: {Math.round(current.feelslike_c)}°</span>
        </div>
        <div className={styles.detailItem}>
          <span>Вітер: {current.wind_kph} км/г</span>
        </div>
        <div className={styles.detailItem}>
          <span>Вологість: {current.humidity}%</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
