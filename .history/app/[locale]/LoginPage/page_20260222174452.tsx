import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useTranslations } from 'next-intl'
import styles from './LoginPage.module.scss'
import Input from '../components/Input'
import  Link  from 'next/link'
import Button from '../components/Button'
import {auth}  from '../firebase'
import { NextIntlClientProvider } from 'next-intl'
import ChangeLanguage from '../components/ChangeLanguage'
import ChangeTheme from '../components/ThemeButton'
import LoginPage from './LoginPage'
import { Login } from '../types/types'


export default function ServerLogin(){
 const navigate = useRouter()
      const handleLogin = async (e:any,{email,password}:Login) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/Dashboard')
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
      <NextIntlClientProvider locale="en" messages={{}}>
       <LoginPage login={handleLogin}/>
</NextIntlClientProvider>
    )
}