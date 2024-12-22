'use client'

import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar() {
  const [condition, setCondition] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  
  // Additional filter states
  const [year, setYear] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [transmission, setTransmission] = useState('')
  
  return (
    <div className="bg-[#0a0b14] p-4 flex flex-col items-center justify-center mb-8 mt-8">
      <div className={`flex flex-col w-full max-w-5xl transition-all duration-300 ease-in-out ${isFiltersOpen ? 'bg-white rounded-3xl p-6' : ''}`}>
        <div className="flex items-center gap-2 bg-white rounded-full p-2 w-full">
          {/* Condition Dropdown */}
          <div className="relative group">
            <button className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <span>{condition || 'Condition'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute z-10 hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
              {['New', 'Used', 'Certified'].map((item) => (
                <button
                  key={item}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  onClick={() => setCondition(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Makes Dropdown */}
          <div className="relative group">
            <button className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <span>{make || 'Any Makes'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute z-10 hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
              {['Toyota', 'Honda', 'Ford', 'BMW'].map((item) => (
                <button
                  key={item}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  onClick={() => setMake(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Models Dropdown */}
          <div className="relative group">
            <button className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <span>{model || 'Any Models'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute z-10 hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
              {['Camry', 'Civic', 'F-150', '3 Series'].map((item) => (
                <button
                  key={item}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  onClick={() => setModel(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Prices Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Prices:</span>
            <div className="relative group">
              <button className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                <span>{price || 'All Prices'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              <div className="absolute z-10 hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
                {['$0 - $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '$30,000+'].map((item) => (
                  <button
                    key={item}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    onClick={() => setPrice(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* More Filters Button */}
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md"
          >
            {isFiltersOpen ? (
              <X className="w-4 h-4 mr-2" />
            ) : (
              <SlidersHorizontal className="w-4 h-4 mr-2" />
            )}
            {isFiltersOpen ? 'Close Filters' : 'More Filters'}
          </button>

          {/* Find Listing Button */}
          <button className="ml-auto flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            <Search className="w-4 h-4 mr-2" />
            Find Listing
          </button>
        </div>

        {/* Additional Filters Section */}
        {isFiltersOpen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            {/* Year Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50">
                  <span>{year || 'Any Year'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
                  {['2023', '2022', '2021', '2020', 'Before 2020'].map((item) => (
                    <button
                      key={item}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => setYear(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Body Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Body Type</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50">
                  <span>{bodyType || 'Any Type'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
                  {['Sedan', 'SUV', 'Truck', 'Van', 'Coupe'].map((item) => (
                    <button
                      key={item}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => setBodyType(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50">
                  <span>{fuelType || 'Any Fuel'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
                  {['Gasoline', 'Diesel', 'Electric', 'Hybrid'].map((item) => (
                    <button
                      key={item}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => setFuelType(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Transmission</label>
              <div className="relative">
                <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50">
                  <span>{transmission || 'Any Transmission'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute hidden group-hover:block w-full mt-1 bg-white border rounded-md shadow-lg">
                  {['Automatic', 'Manual', 'CVT'].map((item) => (
                    <button
                      key={item}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => setTransmission(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

