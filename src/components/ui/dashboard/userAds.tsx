'use client'

import { useState, useEffect } from 'react'
import { AdCard } from './adCard'

type Ad = {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
}

export function UserAds() {
  const [ads, setAds] = useState<Ad[]>([])

  useEffect(() => {
    // Здесь должен быть запрос к API для получения объявлений пользователя
    // Имитация загрузки данных
    setAds([
      { id: 1, title: 'Продам велосипед', description: 'Отличное состояние, почти не использовался', price: 15000, imageUrl: 'https://placehold.co/600x400.png' },
      { id: 2, title: 'Сдам квартиру', description: '2-комнатная квартира в центре города', price: 25000, imageUrl: 'https://placehold.co/600x400.png' },
    ])
  }, [])

  return (
    <div className="flex flex-wrap gap-8">
      {ads.map(ad => (
        <AdCard key={ad.id} {...ad} />
      ))}
    </div>
  )
}

