//C:\Users\User\mini-crm\app\Dashboard\page.tsx
import { db } from '../../lib/firebase' 
import { collection, getDocs, query, where } from 'firebase/firestore'
import DashBoardPage from './DashBoardPage'
import { DashboardTypes } from '../types/types'
export default  async function DashboardServer({userId}:{userId:string}){
    if (!userId) return null
      const allCardsQuery = query(
        collection(db, 'cards'),
        where('uid', '==', userId)
      )
      const doneCardsQuery = query(
        collection(db, 'cards'),
        where('uid', '==', userId),
        where('status', '==', 'Done')
      )


const [allSnap, doneSnap] = await Promise.all([
        getDocs(allCardsQuery),
        getDocs(doneCardsQuery)
      ])

      const myCards=allSnap.size
      const doneCards=doneSnap.size
     

  const metrics:DashboardTypes={
   myCards,
    doneCards,
    activeCards: myCards - doneCards,
    progress: myCards === 0 ? 0 : Math.round((doneCards / myCards) * 100)
  }

  
 return <DashBoardPage metrics={metrics}/>
}