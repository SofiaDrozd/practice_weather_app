import React from 'react'
import SideBar from '../../components/SideBar'
import WeatherLoader from '../../components/WeatherLoader'
import styles from './HomePage.module.scss' 

function HomePage() {
  return (
    <div className={styles.homeWrapper}>
      <SideBar />
      <div className={styles.content}>
        <WeatherLoader />
      </div>
    </div>
  )
}

export default HomePage