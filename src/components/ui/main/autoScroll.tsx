'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Bookmark, ArrowLeft, ArrowRight, Gauge, Fuel, Settings2, ArrowUpRight } from 'lucide-react'
import elecricCar1 from "@/../public/electric-car1.png"
import elecricCar2 from "@/../public/electric-car2.png"
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

// Sample data - in real app would come from API/database
const cars = [
  {
    id: 1,
    badge: "Great Price",
    image: "/car1.jpg",
    name: "Ford Transit – 2021",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
    mileage: "2500 Miles",
    fuelType: "Diesel",
    transmission: "Manual",
    price: "22,000"
  },
  {
    id: 2,
    badge: "Low Mileage",
    image: "/car2.jpg",
    name: "New GLC – 2023",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
    mileage: "50 Miles",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: "95,000"
  },
  // Add more cars as needed...
]

export default function autoScroll() {
  const [activeTab, setActiveTab] = useState('in-stock')
  const [savedCars, setSavedCars] = useState<number[]>([])

  const toggleSave = (carId: number) => {
    setSavedCars(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    )
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

      {/* Vehicle Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl overflow-hidden">
              {/* Image Container */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
                {car.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                    {car.badge}
                  </span>
                )}
                <button 
                  onClick={() => toggleSave(car.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <Bookmark 
                    className={`w-5 h-5 ${
                      savedCars.includes(car.id) 
                        ? 'fill-current text-blue-600' 
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{car.subtitle}</p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Gauge className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-600">{car.mileage}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Fuel className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-600">{car.fuelType}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Settings2 className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-600">{car.transmission}</span>
                  </div>
                </div>

                {/* Price and Link */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-black">${car.price.toLocaleString()}</span>
                  <Link 
                    href={`/vehicles/${car.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    View Details
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Promotional Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-16">
        <div className="bg-[#e2f1ff] rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4 text-black">
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
          <h3 className="text-2xl font-semibold mb-4 text-black">
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

