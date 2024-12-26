"use client";

import CarCard from "@/components/ui/catalog/carCard";
import SearchBar from "@/components/ui/market/searchBar";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/ui/layout";
import { useState, useEffect } from "react";

export default function MarketPage() {
  const [sortBy, setSortBy] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carsPerPage = 15; // Количество автомобилей на одной странице

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/market/cars");
        const data = await response.json();

        // Расшифровка изображений из Base64
        const decodedCars = data.map((car) => {
          return {
            ...car,
            image: car.image ? JSON.parse(car.image) : [],
          };
        });

        setCars(decodedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Рассчитываем текущие автомобили для отображения на основе страницы
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchBar />
      <Layout>
        <div style={{ margin: "0 auto", maxWidth: "1400px", width: "100%" }} className="flex-grow flex flex-col">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900">Market</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Market</h1>
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstCar + 1} - {Math.min(indexOfLastCar, cars.length)} of {cars.length} results
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                <span>Sort by: {sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 hidden group-hover:block w-48 mt-1 bg-white border rounded-lg shadow-lg z-10">
                {["Default", "Price: Low to High", "Price: High to Low", "Newest First"].map((option) => (
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
          <div className="flex-grow">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            ) : currentCars.length === 0 ? (
              <p>Автомобили не найдены</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentCars.map((car) => (
                  <CarCard
                    key={car.car_id}
                    imageUrl={car.image[0] || "/placeholder.jpg"} // Используем первое изображение или плейсхолдер
                    title={car.name}
                    subtitle={`${car.brand} - ${car.year}`}
                    mileage={car.mileage}
                    fuelType={car.engine}
                    transmission={car.transmission || "Automatic"}
                    isBookmarked={false}
                    isMarket={true}
                    price={`$${car.price}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-auto gap-2 pb-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
                  ${currentPage === page 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
