'use client';
import styles from './ThemeButton.module.scss'
import {
Moon,Sun
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
const ThemeButton = () => {
const savedTheme = localStorage.getItem('theme')
const [isDark, setIsDark] = useState(
  savedTheme ? savedTheme === 'dark' : true
)

  useEffect(() => {
    document.body.className = isDark ? 'dark-mode' : 'light-mode'
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <button onClick={toggleTheme} className={styles.themeToggleButton}>
{isDark ? <Moon />:<SunDim />"}
    </button>
  )
}

export default ThemeButton
