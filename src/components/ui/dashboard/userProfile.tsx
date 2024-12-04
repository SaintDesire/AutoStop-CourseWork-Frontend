'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  name: string
  email: string
  phone: string
}

export function UserProfile() {
  const [user, setUser] = useState<User>({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67'
  })
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь должен быть запрос к API для обновления данных пользователя
    setIsEditing(false)
    router.refresh()
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-black"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-black"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-black rounded-md hover:bg-primary-dark hover:bg-black hover:text-white transition duration-200">
          Сохранить
        </button>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Имя</h2>
        <p className="mt-1 text-gray-600">{user.name}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Email</h2>
        <p className="mt-1 text-gray-600">{user.email}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Телефон</h2>
        <p className="mt-1 text-gray-600">{user.phone}</p>
      </div>
      <button 
        onClick={() => setIsEditing(true)} 
        className="px-4 py-2 bg-white text-black border border-primary rounded-md hover:bg-black hover:text-white transition duration-200"
      >
        Редактировать
      </button>
    </div>
  )
}

