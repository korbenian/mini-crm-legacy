import {
  LayoutDashboard,
  BookOpenCheck,
  ClipboardList,
  Users,
  ChartNoAxesCombined,
  BotMessageSquare 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'next/link'
import styles from './Sidebar.module.scss'
import ChangeTheme from '../components/ThemeButton'
import ChangeLanguage from '../components/ChangeLanguage'
import { useTranslation } from 'react-i18next'
import { auth, db } from '../firebase'
import {  doc, getDoc } from 'firebase/firestore'



export default function Sidebar () {
    const { t } = useTranslation()
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
          <Link to='/dashboard' className={styles.link}>
            <LayoutDashboard size={18} />
            <span>{t('navigation.dashboard')}</span>
          </Link>

          <Link to='/Articles' className={styles.link}>
            <BookOpenCheck size={18} />
            <span>{t('navigation.articles')}</span>
          </Link>

          <Link to='/TaskPage' className={styles.link}>
            <ClipboardList size={18} />
            <span>{t('navigation.tasks')}</span>
          </Link>

          <Link to='/ChatWithAI' className={styles.link}>
            <BotMessageSquare  size={18} />
            <span>{t('navigation.chat')}</span>
          </Link>
        </nav>
        <div> <ChangeTheme />
        <div className={styles.ChangeLanguage} ><ChangeLanguage /></div>
        
                </div>
<div className={styles.adminPanel}>
        {role === 'admin' && (
        <>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/cards">All Cards</Link>

          <Link to="/admin/Analytics">Analytics</Link>
        </>
      )}</div>
<div className={styles.wrapaccext
}>
        <div className={styles.accext}>   
                <Link className={styles.buttons} to='/CreateProfile'>
                  {t('dashboard.account')}
                </Link>
                <Link className={styles.exitx} to='/'>
                  {t('dashboard.exit')}
                </Link></div></div>
      </div>

  )
}
