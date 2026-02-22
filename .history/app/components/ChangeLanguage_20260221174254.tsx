'use client'

import React, { useTransition } from 'react'
import { Select, MenuItem, Box, Typography, SelectChangeEvent } from '@mui/material'
import { useLocale } from 'next-intl'
// ВАЖНО: используем навигацию из префикса (если ты настраивал i18n/routing.ts)
// Если нет, используем стандартные, но с правильной логикой
import { useRouter, usePathname } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'
import { languages, Lang } from './langueges'
import styles from './ChangeLanguage.module.scss'

const LanguageSwitcher = () => {
  const locale = useLocale() as Lang
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const changeLanguage = (event: SelectChangeEvent<Lang>) => {
    const nextLocale = event.target.value as Lang

    startTransition(() => {
      // 1. Убираем лишний пробел в `/ ${locale}` -> `/${locale}`
      // 2. Используем регулярное выражение, чтобы заменить только префикс языка
      const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`)
      
      // Выполняем переход
      router.replace(newPath)
    })
    
    // В Next.js локаль обычно хранится в COOKIE, а не в localStorage
    // чтобы сервер мог её прочитать. localStorage здесь почти бесполезен.
  }

  return (
    <Select
      value={locale} // Раскомментировал, чтобы компонент был управляемым
      onChange={changeLanguage}
      disabled={isPending} 
      className={styles.select}
      // Добавляем sx для красоты, если нужно
      sx={{ minWidth: 120 }}
      renderValue={(value) => {
        const lang = languages.find((l) => l.code === value)
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReactCountryFlag
              svg
              countryCode={lang?.countryCode || 'US'}
              style={{ width: '1.4em', height: '1.4em' }}
            />
            <Typography variant="body2">{lang?.label}</Typography>
          </Box>
        )
      }}
    >
      {languages.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReactCountryFlag
              svg
              countryCode={lang.countryCode}
              style={{ width: '1.4em', height: '1.4em' }}
            />
            <Typography variant="body2">{lang.label}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  )
}

export default LanguageSwitcher