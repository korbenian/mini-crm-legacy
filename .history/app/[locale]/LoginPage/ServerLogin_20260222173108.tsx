import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useTranslations } from 'next-intl'
import styles from './LoginPage.module.scss'
import Input from '../components/Input'
import  Link  from 'next/link'
import Button from '../components/Button'
import {auth}  from '../firebase'
import ChangeLanguage from '../components/ChangeLanguage'
import ChangeTheme from '../components/ThemeButton'
import LoginPage from './LoginPage'


export default function ServerLogin(){
 const navigate = useRouter()
      const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/Dashboard')
    } catch (err: any) {
      setError(t('login.error') || 'Ошибка входа')
    }
  }
  return<LoginPage login={handleLogin}
}