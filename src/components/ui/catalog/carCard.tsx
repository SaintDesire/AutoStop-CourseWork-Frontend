'use client'

import Image from 'next/image'
import { Bookmark, Fuel, Gauge, Settings2 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

interface CarCardProps {
  imageUrl: any; 
  brand: string
  model: string
  year: string
  mileage: number
  fuelType: string
  transmission: string
  isBookmarked: boolean // Новое свойство для управления состоянием закладки
  isMarket: boolean
}

export default function CarCard({
  imageUrl,
  brand,
  model,
  year,
  mileage,
  fuelType,
  transmission,
  isBookmarked,
  isMarket
}: CarCardProps) {
  const [isSaved, setIsSaved] = useState(isBookmarked);
  
  function formatModel(model: string) {
    if (!model) {
      return ''; // Возвращаем пустую строку, если model не задан
    }

    return model
      .split(' ') // Разбиваем строку на слова
      .map(word => {
        if (word.length < 4) {
          return word.toUpperCase(); // Если слово короче 4 символов, делаем его заглавным
        } else {
          return word.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Преобразуем первую букву каждого слова в заглавную
        }
      })
      .join(' '); // Собираем обратно в строку
  }
  
  const capitalizedModel = formatModel(model);

  return (
    <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm shadow-sm border border-gray-100 mb-10 mr-7 ml-7">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageUrl}
          alt={`${brand} ${capitalizedModel}`}
          fill
          className="object-cover"
        />
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          {isMarket ? <Bookmark 
            className={`w-5 h-5 ${isSaved ? 'fill-current text-blue-600' : 'text-gray-600'}`} 
          /> : ''}
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Title Section */}
        <div className="space-y-1 mb-4">
          <h3 className="font-semibold text-lg text-gray-900">{brand} {capitalizedModel} {year}</h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <Gauge className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">
              {mileage} Miles
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <Fuel className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">
              {fuelType}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <Settings2 className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">
              {transmission}
            </div>
          </div>
        </div>

        {/* View Details Link */}
        <Link href={`${DASHBOARD_PAGES.CARLIST_CAR}/${brand}/${model}`} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          View Details
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
