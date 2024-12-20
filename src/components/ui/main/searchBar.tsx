'use client'

import { Search, ChevronDown, Car } from 'lucide-react'
import { useState } from 'react'

export default function SearchInterface() {
  const [activeTab, setActiveTab] = useState('all')
  
  return (
    <div className="space-y-8 bg-yellow">
      {/* Navigation Tabs */}
      <div className="flex justify-center gap-8">
        <button 
          onClick={() => setActiveTab('all')}
          className={`pb-2 text-sm font-medium transition-colors relative
            ${activeTab === 'all' 
              ? 'text-white border-b-2 border-white' 
              : 'text-gray-400 hover:text-gray-300'
            }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab('new')}
          className={`pb-2 text-sm font-medium transition-colors relative
            ${activeTab === 'new' 
              ? 'text-white border-b-2 border-white' 
              : 'text-gray-400 hover:text-gray-300'
            }`}
        >
          New
        </button>
        <button 
          onClick={() => setActiveTab('used')}
          className={`pb-2 text-sm font-medium transition-colors relative
            ${activeTab === 'used' 
              ? 'text-white border-b-2 border-white' 
              : 'text-gray-400 hover:text-gray-300'
            }`}
        >
          Used
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white rounded-full p-2">
        <div className="relative group flex-1">
          <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
            <span>Any Makes</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <div className="relative group flex-1">
          <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
            <span>Any Models</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-2 px-4">
          <span className="text-sm text-gray-500">Prices:</span>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md py-2 px-3">
            <span>All Prices</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full ml-2">
          <Search className="w-4 h-4" />
          <span>Search Cars</span>
        </button>
      </div>

      {/* Browse Text */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">Or Browse Featured Model</p>
      </div>

      {/* Car Types */}
      <div className="flex justify-center gap-4">
        {[
          { label: 'SUV', icon: <Car className="w-5 h-5" /> },
          { label: 'Sedan', icon: <Car className="w-5 h-5" /> },
          { label: 'Hatchback', icon: <Car className="w-5 h-5" /> },
          { label: 'Coupe', icon: <Car className="w-5 h-5" /> },
          { label: 'Hybrid', icon: <Car className="w-5 h-5" /> }
        ].map((type) => (
          <button
            key={type.label}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 text-sm transition-colors"
          >
            {type.icon}
            <span>{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

