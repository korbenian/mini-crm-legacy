'use client';
import {
  LayoutDashboard,
  BookOpenCheck,
  ClipboardList,
  Users,
  ChartNoAxesCombined,
  BotMessageSquare 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import  Link  from 'next/link'
import styles from './Sidebar.module.scss'
import ChangeTheme from '../components/ThemeButton'
import ChangeLanguage from '../components/ChangeLanguage'
import { useTranslations } from 'next-intl'
import { auth, db } from '../../lib/firebase'
import {  doc, getDoc } from 'firebase/firestore'



export default function Sidebar () {

      const [role, setRole] = useState<string | null>(null)
  useEffect(() => {
    const fetchRole = async () => {
      const currentUser = auth.currentUser
      if (!currentUser) return

      const snap = await getDoc(doc(db, 'users', currentUser.uid))
      if (snap.exists()) {
        setRole(snap.data().role)
      }
    }

    fetchRole()
  }, [])

  return (

      <div className={styles.container}>

        <div className={styles.header}>
          <ChartNoAxesCombined />
          Mini-CRM
        </div>

        <nav className={styles.nav}>
          <Link href='/dashboard' className={styles.link}>
            <LayoutDashboard size={18} />
            <span></span>
          </Link>

          <Link href='/Articles' className={styles.link}>
            <BookOpenCheck size={18} />
            <span></span>
          </Link>

          <Link href='/TaskPage' className={styles.link}>
            <ClipboardList size={18} />
            <span></span>
          </Link>

          <Link href='/ChatWithAI' className={styles.link}>
            <BotMessageSquare  size={18} />
            <span></span>
          </Link>
        </nav>
        <div> <ChangeTheme />
        <div className={styles.ChangeLanguage} ><ChangeLanguage /></div>
        
                </div>
<div className={styles.adminPanel}>
        {role === 'admin' && (
        <>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/cards">All Cards</Link>

          <Link href="/admin/Analytics">Analytics</Link>
        </>
      )}</div>
<div className={styles.wrapaccext
}>
        <div className={styles.accext}>   
                <Link className={styles.buttons} href='/CreateProfile'>
                  
                </Link>
                <Link className={styles.exitx} href='/'>
              
                </Link></div></div>
      </div>

  )
}
