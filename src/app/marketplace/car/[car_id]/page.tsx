'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Share2, Bookmark, Square, MapPin, Phone, MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Layout from '@/components/ui/layout'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'

interface CarDetails {
  car_id: number
  name: string
  brand: string
  year: number
  price: number
  description: string | null
  mileage: number
  engine: string
  seats: number
  images: string[] // массив Base64 изображений
  condition: string
  bodyType: string
  fuelType: string
  transmission: string
  createdAt: string
  updatedAt: string
}

export default function CarDetailsPage() {
  const { car_id } = useParams<{ car_id: string }>()
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!car_id) return

    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`http://localhost:3001/api/market/cars/${car_id}`)
        if (!response.ok) {
          throw new Error('Не удалось получить детали автомобиля')
        }
        const data: CarDetails = await response.json()
        setCarDetails(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [car_id])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
      if (isModalOpen) {
        if (e.key === 'ArrowLeft') {
          goToPreviousImage()
        }
        if (e.key === 'ArrowRight') {
          goToNextImage()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, currentImageIndex, carDetails])

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToPreviousImage = () => {
    if (!carDetails) return
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carDetails.images.length - 1 : prevIndex - 1
    )
  }

  const goToNextImage = () => {
    if (!carDetails) return
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carDetails.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (loading) return <Layout><div className='mx-auto'>Загрузка...</div></Layout>
  if (error) return <Layout><div className='mx-auto'>Ошибка: {error}</div></Layout>
  if (!carDetails) return <Layout><div className='mx-auto'>Детали автомобиля недоступны.</div></Layout>

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">Главная</Link>
          <span>/</span>
          <Link href="/market" className="hover:text-blue-600">Маркет</Link>
          <span>/</span>
          <span className="text-gray-900">{carDetails.brand} {carDetails.name} ({carDetails.year})</span>
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{carDetails.brand} {carDetails.name} ({carDetails.year})</h1>
          <p className="text-gray-600 mt-1">{carDetails.bodyType} - {carDetails.condition}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-6">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.year}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.mileage} миль</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.transmission}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.fuelType}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
                <span>Поделиться</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Bookmark className="w-5 h-5" />
                <span>Сохранить</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Square className="w-5 h-5" />
                <span>Сравнить</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Slider */}
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              {carDetails.images && carDetails.images.length > 0 ? (
                <Image
                  src={carDetails.images[currentImageIndex]}
                  alt={`${carDetails.brand} ${carDetails.name} ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg cursor-pointer"
                  unoptimized
                  onClick={() => openModal(currentImageIndex)}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.src = '/placeholder.svg'
                  }}
                />
              ) : (
                <Image
                  src="/placeholder.svg"
                  alt="Изображение отсутствует"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  unoptimized
                />
              )}

              {/* Кнопка Назад */}
              {carDetails.images.length > 1 && (
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                  aria-label="Предыдущее изображение"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
              )}

              {/* Кнопка Вперед */}
              {carDetails.images.length > 1 && (
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                  aria-label="Следующее изображение"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              )}

              {/* Кнопка Видео (если необходимо) */}
              {/* <button className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                Видео
              </button> */}
            </div>

            {/* Car Overview */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Обзор автомобиля</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Кузов</span>
                  <span className="font-medium">{carDetails.bodyType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Состояние</span>
                  <span className="font-medium">{carDetails.condition}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Пробег</span>
                  <span className="font-medium">{carDetails.mileage} миль</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Объём двигателя</span>
                  <span className="font-medium">{carDetails.engine}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Тип топлива</span>
                  <span className="font-medium">{carDetails.fuelType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Количество мест</span>
                  <span className="font-medium">{carDetails.seats}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Описание</h2>
              <p className="text-gray-600 leading-relaxed">
                {carDetails.description
                  ? carDetails.description
                  : 'Описание недоступно.'}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Особенности</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Кожаные сиденья
                    </li>
                    {/* Добавьте больше особенностей по необходимости */}
                  </ul>
                </div>
                {/* Добавьте другие колонки особенностей при необходимости */}
              </div>
            </div>
          </div>

          {/* Правый столбец */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Наша цена</p>
                  <p className="text-3xl font-bold">${carDetails.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Срочное предложение</p>
                  <p className="text-lg font-semibold text-green-600">$5,000</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 hover:bg-blue-700">
                Сделать предложение
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
                Записаться на тест-драйв
              </button>
            </div>

            {/* Dealer Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  <h3 className="font-semibold">admin</h3>
                  <p className="text-sm text-gray-500">123 Broadway, Brooklyn</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                  <MapPin className="w-4 h-4" />
                  <span>Получить направление</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                  <Phone className="w-4 h-4" />
                  <span>+86-13345789</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4" />
                  <span>Связаться с дилером</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно для просмотра изображений */}
        {isModalOpen && carDetails.images.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeModal}
          >
            <div
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()} // Предотвращает закрытие модала при клике внутри
              ref={modalRef}
            >

              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={carDetails.images[currentImageIndex]}
                  alt={`${carDetails.brand} ${carDetails.name} ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  unoptimized
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.src = '/placeholder.svg'
                  }}
                />

                {/* Кнопка Назад */}
                {carDetails.images.length > 1 && (
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                    aria-label="Предыдущее изображение"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                )}

                {/* Кнопка Вперед */}
                {carDetails.images.length > 1 && (
                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                    aria-label="Следующее изображение"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </Layout>
  )
}
