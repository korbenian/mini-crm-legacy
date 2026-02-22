// C:\Users\User\mini-crm\app\Dashboard\page.tsx
import { db } from '../../lib/firebase' 
import { collection, getDocs, query, where } from 'firebase/firestore'
import DashBoardPage from './DashBoardPage'
import { DashboardTypes } from '../types/types'

// Для теста: либо передавай userId через пропсы, либо временно сделай проверку
export default async function DashboardServer({ searchParams }: { searchParams: { uid?: string } }) {
    const userId = searchParams.uid; // Временно берем из URL для проверки: /Dashboard?uid=123

    if (!userId) {
        // Если юзера нет, рендерим страницу с нулевыми метриками или редиректим
        const emptyMetrics: DashboardTypes = { myCards: 0, doneCards: 0, activeCards: 0, progress: 0 };
        return <DashBoardPage metrics={emptyMetrics} />;
    }

    const allCardsQuery = query(collection(db, 'cards'), where('uid', '==', userId));
    const doneCardsQuery = query(collection(db, 'cards'), where('uid', '==', userId), where('status', '==', 'Done'));

    const [allSnap, doneSnap] = await Promise.all([
        getDocs(allCardsQuery),
        getDocs(doneCardsQuery)
    ]);

    const myCards = allSnap.size;
    const doneCards = doneSnap.size;

    const metrics: DashboardTypes = {
        myCards,
        doneCards,
        activeCards: myCards - doneCards,
        progress: myCards === 0 ? 0 : Math.round((doneCards / myCards) * 100)
    };

    return <DashBoardPage metrics={metrics} />;
}