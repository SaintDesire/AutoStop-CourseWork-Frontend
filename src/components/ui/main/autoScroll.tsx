'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Bookmark, ArrowLeft, ArrowRight, Gauge, Fuel, Settings2, ArrowUpRight } from 'lucide-react';

import CarCard from '../market/carCard';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

interface CarDetails {
  car_id: number;
  model: string;
  brand: string;
  year: number;
  price: number;
  description: string | null;
  mileage: number;
  engine: string;
  seats: number;
  images: string[]; // массив Base64 изображений
  condition: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  createdAt: string;
  updatedAt: string;
}

const car_id = [1, 2, 3, 4]; // Вынесено за пределы компонента

export default function VehicleScroll() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cars, setCars] = useState<CarDetails[]>([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Выполнение всех запросов параллельно
        const responses = await Promise.all(
          car_id.map((id) => fetch(`http://localhost:3001/api/market/cars/${id}`))
        );

        // Проверка всех ответов и получение данных
        const data = await Promise.all(
          responses.map((response) => {
            if (!response.ok) {
              throw new Error('Не удалось получить детали автомобиля');
            }
            return response.json();
          })
        );

        setCars(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только при загрузке

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Explore All Vehicles</h1>
        <Link 
          href={DASHBOARD_PAGES.MARKETPLACE} 
          className="text-sm text-white flex items-center hover:text-gray-300"
        >
          View All
          <ArrowUpRight className="ml-1 w-4 h-4" />
        </Link>
      </div>



      {/* Vehicle Scroll Container */}
      <div className="relative mb-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {cars.map((car) => (
              <div 
                key={car.car_id}
                className="flex-none min-w-[350px]" // Минимальная ширина для карточки
                style={{ scrollSnapAlign: 'start' }}
              >
                <CarCard
                  key={car.car_id}
                  carId={car.car_id.toString()}
                  imageUrl={car.images[0]}
                  brand={car.brand}
                  model={car.model}
                  year={car.year.toString()}
                  price={car.price.toString()}
                  mileage={car.mileage}
                  fuelType={car.fuelType}
                  transmission={car.transmission || "Automatic"}
                  isBookmarked={false}
                  isMarket={true}
                />
              </div>
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-9 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 hover:bg-black hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-9 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 hover:bg-black hover:text-white"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
