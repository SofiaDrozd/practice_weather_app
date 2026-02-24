import React, { useState } from 'react'
import styles from './SideBar.module.scss'

function SideBar ({
  cities,
  activeCity,
  onCitySelect,
  onAddCity,
  onDeleteCity
}) {
  const [inputValue, setInputValue] = useState('')

  if (!cities) return null

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleAddClick = () => {
    onAddCity(inputValue)
    setInputValue('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleAddClick()
    }
  }

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Міста</h2>
      <hr className={styles.divider} />

      <div className={styles.inputContainer}>
        <input
          type='text'
          placeholder='Пошук'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.cityInput}
        />
        <button onClick={handleAddClick} className={styles.addButton}>
          Додати
        </button>
      </div>

      <ul className={styles.cityList}>
        {cities.map((city, index) => (
          <li
            key={index}
            className={`${styles.cityItem} ${
              activeCity === city ? styles.active : ''
            }`}
            onClick={() => onCitySelect(city)}
          >
            <span className={styles.cityLabel}>
              <span className={styles.locationIcon}>📍</span>
              {city}
            </span>

            <button
              className={styles.deleteButton}
              onClick={e => {
                e.stopPropagation()
                onDeleteCity(city)
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
