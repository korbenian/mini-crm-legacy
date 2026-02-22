import { Select, MenuItem, Box, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useTranslations } from 'next-intl'
import styles from './ChangeLanguage.module.scss'
import ReactCountryFlag from 'react-country-flag'
import { languages, Lang } from './langueges'


const LanguageSwitcher = () => {
  const { i18n } = useTranslations()

  const changeLanguage = (event: SelectChangeEvent<Lang>) => {
    const lang = event.target.value as Lang
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <Select
      value={i18n.language as Lang}
      onChange={changeLanguage}
      
       className={styles.select}
      renderValue={(value) => {
        const lang = languages.find(l => l.code === value)

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