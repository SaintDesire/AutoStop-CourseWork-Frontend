'use client'

import { useState } from 'react'
import CarManagement from './car-management'
import UserManagement from './user-management'

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState('cars')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'cars' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('cars')}
        >
          Car Management
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
      </div>
      {activeTab === 'cars' ? <CarManagement /> : <UserManagement />}
    </div>
  )
}

