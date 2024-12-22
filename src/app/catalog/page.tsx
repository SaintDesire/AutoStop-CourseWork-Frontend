"use client"

import CarCard from "@/components/ui/market/carCard"
import SearchBar from "@/components/ui/market/searchBar"
import carImage from "@/../public/electric-car1.png"
import Link from "next/link"
import { ChevronDown } from 'lucide-react'
import Layout from "@/components/ui/layout"
import { useState } from 'react'

export default function CatalogPage() {
    const [sortBy, setSortBy] = useState('Default')
    const [currentPage, setCurrentPage] = useState(1)
    
    // Пример массива машин для отображения
    const cars = new Array(12).fill(null).map((_, index) => ({
        id: index,
        title: "Toyota Camry New",
        subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
        mileage: 20,
        fuelType: "Petrol",
        transmission: "Automatic",
        imageUrl: carImage,
    }));

    return (
        <div>
            <SearchBar />
            <Layout>
                <div style={{margin: '0 auto'}}>
                    
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                        Home
                    </Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-900">Catalog</span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Catalog
                        </h1>
                        <p className="text-sm text-gray-500">
                            Showing 1 - {cars.length} of {cars.length} results
                        </p>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                            <span>Sort by: {sortBy}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 hidden group-hover:block w-48 mt-1 bg-white border rounded-lg shadow-lg z-10">
                            {['Default', 'Price: Low to High', 'Price: High to Low', 'Newest First'].map((option) => (
                                <button
                                    key={option}
                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                                    onClick={() => setSortBy(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {cars.map((car) => (
                        <CarCard
                            key={car.id}
                            imageUrl={car.imageUrl}
                            title={car.title}
                            subtitle={car.subtitle}
                            mileage={car.mileage}
                            fuelType={car.fuelType}
                            transmission={car.transmission}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
                                ${currentPage === page 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                </div>
            </Layout>
        </div>
    )
}

