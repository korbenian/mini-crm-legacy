//C:\Users\User\mini-crm\src\components\useChatLogic.tsx
import { useState } from 'react'
import axios from 'axios'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function useChatLogic () {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
  if (!input.trim() || loading) return

  const userMessage: ChatMessage = {
    role: 'user',
    content: input
  }

  // Добавляем своё сообщение
  setMessages(prev => [...prev, userMessage])
  
  const messageToSend = input // сохраняем текст до очистки
  setInput('')
  setLoading(true)
  setError(null)

  try {
    const res = await axios.post('/api/chat', {
      message: messageToSend
    })

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: res.data.reply // именно reply из твоего API
    }

    setMessages(prev => [...prev, assistantMessage])
  } catch (e) {
    setError('Ошибка при получении ответа 😔')
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: 'Что-то пошло не так…' }
    ])
  } finally {
    setLoading(false)
  }
}



  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return {
    input,
    setInput,
    messages,
    loading,
    error,
    handleSend,
    clearChat
  }
}
