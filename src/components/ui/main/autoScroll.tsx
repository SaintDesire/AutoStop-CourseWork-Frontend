'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { Bookmark, ArrowLeft, ArrowRight, Gauge, Fuel, Settings2, ArrowUpRight } from 'lucide-react'
import elecricCar1 from "@/../public/electric-car1.png"
import elecricCar2 from "@/../public/electric-car2.png"
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import CarCard from '../market/carCard'

// Sample data - in real app would come from API/database
const cars = [
  {
    id: 1,
    title: "Ford Transit – 2021",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
    mileage: "2500",
    fuelType: "Diesel",
    transmission: "Manual",
    imageUrl: "/car1.jpg",
  },
  {
    id: 2,
    title: "New GLC – 2023",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
    mileage: "50",
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/car2.jpg",
  },
  {
    id: 3,
    title: "Audi A6 3.6 – New",
    subtitle: "3.6 FSI Quattro Premium Plus AWD...",
    mileage: "10",
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/car3.jpg",
  },
  {
    id: 4,
    title: "BMW X5 – 2022",
    subtitle: "xDrive 40i Sports Activity Vehicle...",
    mileage: "500",
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/car4.jpg",
  },
  {
    id: 5,
    title: "Toyota Prius – 2022",
    subtitle: "Hybrid LE Hatchback 4D...",
    mileage: "300",
    fuelType: "Hybrid",
    transmission: "Automatic",
    imageUrl: "/car5.jpg",
  },
  {
    id: 6,
    title: "Kia Carnival – 2023",
    subtitle: "3.5 V6 SX Prestige MPV...",
    mileage: "150",
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/car6.jpg",
  },
  {
    id: 7,
    title: "Honda Accord – 2023",
    subtitle: "1.5T EX Sedan CVT...",
    mileage: "100",
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/car7.jpg",
  },
  {
    id: 8,
    title: "Hyundai Tucson – 2022",
    subtitle: "2.5L SEL AWD SUV...",
    mileage: "1000",
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "/car8.jpg",
  },
];



export default function VehicleScroll() {
  const [activeTab, setActiveTab] = useState('in-stock')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Explore All Vehicles</h1>
        <Link 
          href="/all-vehicles" 
          className="text-sm text-white flex items-center hover:text-gray-300"
        >
          View All
          <ArrowUpRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8">
        {['In Stock', 'New Cars', 'Used Cars'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors
              ${activeTab === tab.toLowerCase().replace(' ', '-')
                ? 'text-white border-white'
                : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Vehicle Scroll Container */}
      <div className="relative mb-8">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cars.map((car) => (
            <div 
              key={car.id}
              className="flex-none min-w-[350px]" // Минимальная ширина для карточки
              style={{ scrollSnapAlign: 'start' }}
            >
              <CarCard
                imageUrl={car.imageUrl}
                title={car.title}
                subtitle={car.subtitle}
                mileage={Number(car.mileage)}
                fuelType={car.fuelType}
                transmission={car.transmission}
              />
            </div>
          ))}
        </div>

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

      {/* Promotional Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-16">
        <div className="bg-[#e2f1ff] rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Are You Looking<br />For a Car?
          </h3>
          <p className="text-gray-600 mb-8">
            We are committed to providing our customers with exceptional service.
          </p>
          <div className="flex items-center justify-between">
            <Link 
              href={DASHBOARD_PAGES.CARLIST}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 flex items-center"
            >
              Get Started
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
            <Image
              src={elecricCar1}
              alt="Electric Car"
              width={80}
              height={80}
            />
          </div>
        </div>

        <div className="bg-[#ffe2e2] rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Do You Want to<br />Sell a Car?
          </h3>
          <p className="text-gray-600 mb-8">
            We are committed to providing our customers with exceptional service.
          </p>
          <div className="flex items-center justify-between">
            <Link 
              href={DASHBOARD_PAGES.MARKETPLACE}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 flex items-center"
            >
              Get Started
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
            <Image
              src={elecricCar2}
              alt="Sell Car"
              width={80}
              height={80}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
