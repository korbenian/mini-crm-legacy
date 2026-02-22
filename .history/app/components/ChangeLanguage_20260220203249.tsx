'use client'; // ОБЯЗАТЕЛЬНО для работы MUI и интерактивности

import React, { useTransition } from 'react'
import { Select, MenuItem, Box, Typography, SelectChangeEvent } from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'
import { languages, Lang } from './langueges'
import styles from './ChangeLanguage.module.scss'

const LanguageSwitcher = () => {
  //const t = useTranslations()
  //const locale = useLocale() as Lang
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const changeLanguage = (event: SelectChangeEvent<Lang>) => {
    const nextLocale = event.target.value as Lang

 
    startTransition(() => {
      const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
      router.replace(newPath);
    });
    
    localStorage.setItem('lang', nextLocale);
  };

  return (
    <Select
      //value={locale}
      onChange={changeLanguage}
      disabled={isPending} 
      className={styles.select}
      renderValue={(value) => {
        const lang = languages.find((l) => l.code === value);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReactCountryFlag
              svg
              countryCode={lang?.countryCode || 'US'}
              style={{ width: '1.4em', height: '1.4em' }}
            />
            <Typography variant="body2">{lang?.label}</Typography>
          </Box>
        );
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
  );
};

export default LanguageSwitcher;