//C:\Users\User\mini-crm\app\[locale]\LoginPage\page.tsx
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useTranslations } from 'next-intl'
import {auth}  from '../firebase'
import { NextIntlClientProvider } from 'next-intl'
import LoginPage from './LoginPage'
import { Login } from '../types/types'


export default async function ServerLogin({email,password}:Login){
 const navigate = useRouter()
      const handleLogin = async (e:any) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/Dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <NextIntlClientProvider locale="en" messages={{}}>
       <LoginPage handleLogin={handleLogin}/>
</NextIntlClientProvider>
    )
}