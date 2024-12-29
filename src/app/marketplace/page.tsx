"use client";

import CarCard from "@/components/ui/market/carCard";
import SearchBar from "@/components/ui/market/searchBar";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/ui/layout";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Car {
  car_id: string;
  image: string[];
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  condition: string;
  transmission: string;
  bodyType: string;
}

export default function MarketPage() {
  const [sortBy, setSortBy] = useState<string>("Default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  // Состояния фильтров
  const [condition, setCondition] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');

  // ***** Изменяем: храним в compareList только МАССИВ ID *****
  const [compareList, setCompareList] = useState<string[]>([]);

  const router = useRouter();
  const carsPerPage = 16; // Количество автомобилей на одной странице
  const sortRef = useRef<HTMLDivElement>(null);

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/market/cars");
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные');
        }
        const data = await response.json();

        const decodedCars: Car[] = data.map((car: any) => ({
          ...car,
          image: car.image ? JSON.parse(car.image) : [],
          price: Number(car.price),
          year: Number(car.year),
          mileage: Number(car.mileage),
        }));

        setCars(decodedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Функция форматирования цены
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(price);
  };

  // ***** Обработчик нажатия на кнопку "Сравнить" в карточке *****
  // Теперь добавляем / удаляем ТОЛЬКО ID автомобиля
  const handleCompareClick = (carId: string) => {
    setCompareList((prevCompareList) => {
      const isAlreadyInCompare = prevCompareList.includes(carId);

      // Если машина уже в списке — убираем её из списка
      if (isAlreadyInCompare) {
        const updated = prevCompareList.filter((id) => id !== carId);
        localStorage.setItem("compareList", JSON.stringify(updated));
        return updated;
      }

      // Если ещё не в списке, но список меньше 2 — добавляем
      if (prevCompareList.length < 2) {
        const updated = [...prevCompareList, carId];
        localStorage.setItem("compareList", JSON.stringify(updated));
        return updated;
      }

      // Если в списке уже 2 машины, заменим первую на новую
      const updated = [prevCompareList[1], carId];
      localStorage.setItem("compareList", JSON.stringify(updated));
      return updated;
    });
  };

  // Использование useMemo для фильтрации и сортировки автомобилей
  const filteredAndSortedCars = useMemo(() => {
    let filtered = [...cars];

    // Применяем сортировку
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Newest First":
        filtered.sort((a, b) => b.year - a.year);
        break;
      default:
        // Default: исходный порядок
        break;
    }

    return filtered;
  }, [cars, condition, make, model, price, year, bodyType, fuelType, transmission, sortBy]);

  // Пагинация
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredAndSortedCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredAndSortedCars.length / carsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Сброс текущей страницы при изменении сортировки или фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, condition, make, model, price, year, bodyType, fuelType, transmission]);

  // Обработчик клика вне сортировки для закрытия выпадающего списка
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortOpen]);

  // ***** При наличии хотя бы 1 машины в compareList показываем кнопку перехода *****
  // (Можно сделать условие compareList.length === 2, если надо только при 2 авто.)
  const handleGoToComparePage = () => {
    router.push("/marketplace/compare");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchBar
        onSearch={(filters) => {
          setCondition(filters.condition);
          setMake(filters.make);
          setModel(filters.model);
          setPrice(filters.price);
          setYear(filters.year);
          setBodyType(filters.bodyType);
          setFuelType(filters.fuelType);
          setTransmission(filters.transmission);
        }}
      />

      <Layout>
        <div
          style={{ margin: "0 auto", maxWidth: "1400px", width: "100%" }}
          className="flex-grow flex flex-col"
        >
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm mb=6">
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
                Showing {indexOfFirstCar + 1} -{" "}
                {Math.min(indexOfLastCar, filteredAndSortedCars.length)} of{" "}
                {filteredAndSortedCars.length} results
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-haspopup="true"
                aria-expanded={isSortOpen}
              >
                <span>Sort by: {sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isSortOpen && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-10"
                  role="menu"
                >
                  {["Default", "Price: Low to High", "Price: High to Low", "Newest First"].map((option) => (
                    <button
                      key={option}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      role="menuitem"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Кнопка для перехода на сравнение (если есть хотя бы 1 авто) */}
          {compareList.length > 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleGoToComparePage}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {compareList.length === 2
                  ? "Compare Selected Cars"
                  : `Selected: ${compareList.length}`}
              </button>
            </div>
          )}

          {/* Car Grid */}
          <div className="flex-grow">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            ) : currentCars.length === 0 ? (
              <p className="text-center text-gray-500">Автомобили не найдены</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentCars.map((car: Car) => {
                  // Проверяем, есть ли carId в compareList
                  const isInCompare = compareList.includes(car.car_id);

                  return (
                    <CarCard
                      key={car.car_id}
                      carId={car.car_id}
                      imageUrl={car.image[0]}
                      brand={car.brand}
                      model={car.model}
                      year={car.year.toString()}
                      price={formatPrice(car.price)}
                      mileage={car.mileage}
                      fuelType={car.fuelType}
                      transmission={car.transmission || "Automatic"}
                      isBookmarked={false}
                      isMarket={true}
                      // Передаём prop для кнопки сравнения
                      onCompareClick={() => handleCompareClick(car.car_id)}
                      isInCompare={isInCompare}
                    />
                  );
                })}
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
                  ${
                    currentPage === page
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
