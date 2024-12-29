'use client'

import { useState, useEffect } from 'react'

interface Car {
  car_id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description?: string;
  mileage?: number;
  engine?: string;
  seats?: number;
  image?: string;
  condition: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
}

export default function CarManagement() {
  const [cars, setCars] = useState<Car[]>([])
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [newCar, setNewCar] = useState<Omit<Car, 'car_id'>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    description: '',
    mileage: 0,
    engine: '',
    seats: 0,
    image: '',
    condition: '',
    bodyType: '',
    fuelType: '',
    transmission: '',
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/market/cars')
      if (!response.ok) throw new Error('Failed to fetch cars')
      const data = await response.json()
      setCars(data)
    } catch (error) {
      console.error('Error fetching cars:', error)
      setMessage({ type: 'error', text: 'Failed to fetch cars. Please try again.' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updatedValue = ['year', 'price', 'mileage', 'seats'].includes(name) ? Number(value) : value
    
    if (editingCar) {
      setEditingCar(prev => ({ ...prev!, [name]: updatedValue }))
    } else {
      setNewCar(prev => ({ ...prev, [name]: updatedValue }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCar) {
      await handleUpdateCar()
    } else {
      await handleAddCar()
    }
  }

  const handleAddCar = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/market/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar),
      })
      if (!response.ok) throw new Error('Failed to add car')
      await fetchCars()
      setNewCar({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        description: '',
        mileage: 0,
        engine: '',
        seats: 0,
        image: '',
        condition: '',
        bodyType: '',
        fuelType: '',
        transmission: '',
      })
      setMessage({ type: 'success', text: 'Car added successfully.' })
    } catch (error) {
      console.error('Error adding car:', error)
      setMessage({ type: 'error', text: 'Failed to add car. Please try again.' })
    }
  }

  const handleUpdateCar = async () => {
    if (!editingCar) return
    try {
      const response = await fetch(`http://localhost:3001/api/market/cars/${editingCar.car_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCar),
      })
      if (!response.ok) throw new Error('Failed to update car')
      await fetchCars()
      setEditingCar(null)
      setMessage({ type: 'success', text: 'Car updated successfully.' })
    } catch (error) {
      console.error('Error updating car:', error)
      setMessage({ type: 'error', text: 'Failed to update car. Please try again.' })
    }
  }

  const handleDeleteCar = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/market/cars/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete car')
      await fetchCars()
      setMessage({ type: 'success', text: 'Car deleted successfully.' })
    } catch (error) {
      console.error('Error deleting car:', error)
      setMessage({ type: 'error', text: 'Failed to delete car. Please try again.' })
    }
  }

  const handleEditCar = (car: Car) => {
    setEditingCar(car)
  }

  const handleCancelEdit = () => {
    setEditingCar(null)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Car Management</h2>
      {message && (
        <div className={`p-2 mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <input
          type="text"
          name="brand"
          value={editingCar ? editingCar.brand : newCar.brand}
          onChange={handleInputChange}
          placeholder="Brand"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="model"
          value={editingCar ? editingCar.model : newCar.model}
          onChange={handleInputChange}
          placeholder="Model"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="year"
          value={editingCar ? editingCar.year : newCar.year}
          onChange={handleInputChange}
          placeholder="Year"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={editingCar ? editingCar.price : newCar.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={editingCar ? editingCar.description : newCar.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="mileage"
          value={editingCar ? editingCar.mileage : newCar.mileage}
          onChange={handleInputChange}
          placeholder="Mileage"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="engine"
          value={editingCar ? editingCar.engine : newCar.engine}
          onChange={handleInputChange}
          placeholder="Engine"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="seats"
          value={editingCar ? editingCar.seats : newCar.seats}
          onChange={handleInputChange}
          placeholder="Seats"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          value={editingCar ? editingCar.image : newCar.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <select
          name="condition"
          value={editingCar ? editingCar.condition : newCar.condition}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        <input
          type="text"
          name="bodyType"
          value={editingCar ? editingCar.bodyType : newCar.bodyType}
          onChange={handleInputChange}
          placeholder="Body Type"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="fuelType"
          value={editingCar ? editingCar.fuelType : newCar.fuelType}
          onChange={handleInputChange}
          placeholder="Fuel Type"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="transmission"
          value={editingCar ? editingCar.transmission : newCar.transmission}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {editingCar ? 'Update Car' : 'Add Car'}
        </button>
        {editingCar && (
          <button type="button" onClick={handleCancelEdit} className="w-full p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            Cancel Edit
          </button>
        )}
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Brand</th>
            <th className="border p-2 text-left">Model</th>
            <th className="border p-2 text-left">Year</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Condition</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.car_id}>
              <td className="border p-2">{car.brand}</td>
              <td className="border p-2">{car.model}</td>
              <td className="border p-2">{car.year}</td>
              <td className="border p-2">${car.price.toLocaleString()}</td>
              <td className="border p-2">{car.condition}</td>
              <td className="border p-2">
                <button 
                  onClick={() => handleEditCar(car)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCar(car.car_id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

