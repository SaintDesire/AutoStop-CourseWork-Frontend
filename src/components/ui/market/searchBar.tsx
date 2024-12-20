'use client'

import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar() {
  const [condition, setCondition] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  
  return (
    <div className="bg-[#0a0b14] p-4 flex items-center justify-center mb-8 mt-8">
      <div className="flex items-center gap-2 bg-white rounded-full p-2 w-full max-w-5xl">
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
        <button className="flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          More Filters
        </button>

        {/* Find Listing Button */}
        <button className="ml-auto flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
          <Search className="w-4 h-4 mr-2" />
          Find Listing
        </button>
      </div>
    </div>
  )
}

