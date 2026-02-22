'use client';
import {
  doc,
  setDoc,
  arrayUnion,
  getDoc
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../lib/firebase'
import { getAuth } from 'firebase/auth'
import { useTranslations } from 'next-intl'
interface TechSelectorProps {
  onChange?: (techs: string[]) => void
}

const POPULAR_TECHS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'Go',
  'Rust',
  'C++',
  'PHP',
  'Ruby'
]

export default function TechSelector ({ onChange }: TechSelectorProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [isAddingCustom, setIsAddingCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const  t  = useTranslations()
  const auth = getAuth()
  const user = auth.currentUser

  // 🔹 загрузка techStack из users/{uid}
  useEffect(() => {
    const loadTechStack = async () => {
      if (!user) return

      const userRef = doc(db, 'users', user.uid)
      const snap = await getDoc(userRef)

      if (snap.exists()) {
        const data = snap.data()
        if (data.techStack) {
          setSelected(data.techStack)
        }
      }
    }

    loadTechStack()
  }, [user])

  const toggleTech = async (tech: string) => {
    if (!user) return

    const newList = selected.includes(tech)
      ? selected.filter(t => t !== tech)
      : [...selected, tech]

    setSelected(newList)
    onChange?.(newList)

    const userRef = doc(db, 'users', user.uid)

    await setDoc(
      userRef,
      { techStack: newList },
      { merge: true }
    )
  }

  
  const addCustomTech = async () => {
    const tech = customValue.trim()
    if (!tech || !user) return

    if (!selected.includes(tech)) {
      setSelected(prev => [...prev, tech])
      onChange?.([...selected, tech])

      const userRef = doc(db, 'users', user.uid)

      await setDoc(
        userRef,
        { techStack: arrayUnion(tech) },
        { merge: true }
      )
    }

    setCustomValue('')
    setIsAddingCustom(false)
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {POPULAR_TECHS.map(tech => (
        <button
          key={tech}
          onClick={() => toggleTech(tech)}
          className={`px-3 py-1 rounded-full border cursor-pointer ${
            selected.includes(tech)
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-400 text-gray-700'
          }`}
        >
          {tech}
        </button>
      ))}

      {!isAddingCustom && (
        <button
          onClick={() => setIsAddingCustom(true)}
          className=''
        >
          + {t('profile.other')}
        </button>
      )}

      {isAddingCustom && (
        <div className=''>
          <input
            type='text'
            placeholder={t('profile.enterTechnology')}
            value={customValue}
            onChange={e => setCustomValue(e.target.value)}
            className=''
          />
          <button
            onClick={addCustomTech}
            className=''
          >
            {t('profile.add')}
          </button>
        </div>
      )}
    </div>
  )
}
