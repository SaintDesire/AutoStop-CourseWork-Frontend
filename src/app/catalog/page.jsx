"use client";

import SearchBar from "@/components/ui/catalog/searchBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import CarCard from "@/components/ui/catalog/carCard";

export default function CatalogPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [allCars, setAllCars] = useState([]); // Store all cars
    const [cars, setCars] = useState([]);       // Store filtered cars
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({});

    const carsPerPage = 16; // Number of cars per page

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/catalog/cars");
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.statusText}`);
                }
                const data = await response.json();

                const processedData = data.map((car) => ({
                    ...car,
                    details: {
                        ...car.details,
                        // fuel_type: gas / diesel / electric => Gasoline / Diesel / Electric
                        fuel_type:
                            car.details.fuel_type === "gas"
                                ? "Gasoline"
                                : car.details.fuel_type === "diesel"
                                ? "Diesel"
                                : "Electric",
                        drive:
                            car.details.drive === "fwd"
                                ? "Front-Wheel Drive"
                                : car.details.drive === "rwd"
                                ? "Rear-Wheel Drive"
                                : "All-Wheel Drive",
                        transmission:
                            car.details.transmission === "a" ? "Automatic" : "Manual",
                    },
                }));

                setAllCars(processedData);
                setCars(processedData); // Initially display all cars
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    /**
     * applyFilters() — вызывается при нажатии "Find" или после "Reset",
     * чтобы отфильтровать allCars в соответствии с выбранными filters.
     */
    const applyFilters = () => {
        let filteredCars = [...allCars];

        // 1) Фильтр по brand
        if (filters.brand) {
            filteredCars = filteredCars.filter(
                (car) => car.brand === filters.brand
            );
        }

        // 2) Фильтр по model
        if (filters.model) {
            filteredCars = filteredCars.filter(
                (car) => car.model === filters.model
            );
        }

        // 3) Фильтр по year
        if (filters.year) {
            filteredCars = filteredCars.filter(
                (car) => String(car.year) === filters.year
            );
        }

        // 4) Фильтр по fuelType
        if (filters.fuelType) {
            filteredCars = filteredCars.filter(
                (car) => car.details.fuel_type === filters.fuelType
            );
        }

        // 5) Фильтр по transmission
        if (filters.transmission) {
            filteredCars = filteredCars.filter(
                (car) => car.details.transmission === filters.transmission
            );
        }

        // 6) Фильтр по диапазонам "cityMpg" (например, "20-25", "36-40", "41+")
        if (filters.cityMpg) {
            const [minStr, maxStr] = filters.cityMpg.split("-");
            const min = parseInt(minStr, 10) || 0;  // если "41+", то min=41, maxStr = undefined
            let max = 9999;                         // по умолчанию большое число
            if (maxStr) {
                max = parseInt(maxStr, 10);
            }
            filteredCars = filteredCars.filter((car) => {
                // Предполагаем, что car.details.city_mpg — число
                // Если у вас другое поле, замените.
                const carMpg = car.details.city_mpg;
                if (!carMpg) return false; // если нет поля, не подходит
                return carMpg >= min && carMpg <= max;
            });
        }

        // 7) Фильтр по Class (carClass)
        if (filters.carClass) {
            filteredCars = filteredCars.filter(
                (car) => car.details.class === filters.carClass
            );
        }

        // 8) Фильтр по Cylinders
        if (filters.cylinders) {
            // Пример: "4", "6", "8"
            const c = parseInt(filters.cylinders, 10);
            filteredCars = filteredCars.filter(
                (car) => car.details.cylinders === c
            );
        }

        // 9) Фильтр по Displacement (например, "1.0-2.0", "2.1-3.0", "4.1+")
        if (filters.displacement) {
            const [minDispStr, maxDispStr] = filters.displacement.split("-");
            const minDisp = parseFloat(minDispStr) || 0;
            let maxDisp = 9999;
            if (maxDispStr) {
                maxDisp = parseFloat(maxDispStr);
            }
            filteredCars = filteredCars.filter((car) => {
                const d = parseFloat(car.details.displacement);
                if (isNaN(d)) return false;
                return d >= minDisp && d <= maxDisp;
            });
        }

        // 10) Фильтр по Drive (Front-Wheel Drive, Rear-Wheel Drive, All-Wheel Drive)
        if (filters.drive) {
            filteredCars = filteredCars.filter(
                (car) => car.details.drive === filters.drive
            );
        }

        // Устанавливаем итоговый список машин после всех фильтров
        setCars(filteredCars);
        // Сбрасываем пагинацию на первую страницу
        setCurrentPage(1);
    };

    // Извлекаем уникальные значения для дропдаунов
    const brands = Array.from(new Set(allCars.map((car) => car.brand)));
    const models = allCars.reduce((acc, car) => {
        if (!acc[car.brand]) acc[car.brand] = [];
        if (!acc[car.brand].includes(car.model)) {
            acc[car.brand].push(car.model);
        }
        return acc;
    }, {});
    const years = Array.from(new Set(allCars.map((car) => car.year.toString()))).sort(
        (a, b) => Number(b) - Number(a)
    );

    // cityMpg фильтруем по диапозонам (пример)
    const mpgRanges = ["20-25", "26-30", "31-35", "36-40", "41+"];

    // Класс авто
    const carClasses = Array.from(
        new Set(allCars.map((car) => car.details.class))
    ).filter(Boolean);

    // Цилиндры
    const cylinderOptions = Array.from(
        new Set(allCars.map((car) => car.details.cylinders))
    ).filter(Boolean).sort((a, b) => a - b);

    // Объём (displacement) — создаём искусственно диапазоны
    const displacementRanges = ["1.0-2.0", "2.1-3.0", "3.1-4.0", "4.1+"];

    // Тип привода
    const driveOptions = Array.from(new Set(allCars.map((car) => car.details.drive))).filter(Boolean);

    // Тип топлива
    const fuelTypes = Array.from(new Set(allCars.map((car) => car.details.fuel_type))).filter(Boolean);

    // Трансмиссия
    const transmissionTypes = Array.from(
        new Set(allCars.map((car) => car.details.transmission))
    ).filter(Boolean);

    // Пагинация
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(cars.length / carsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <SearchBar
                filterOptions={{
                    brands,
                    models,
                    years,
                    mpgRanges,
                    carClasses,
                    cylinderOptions,
                    displacementRanges,
                    driveOptions,
                    fuelTypes,
                    transmissionTypes,
                }}
                // Обновляем локальный стейт filters при изменении в SearchBar
                onFilterChange={(f) => setFilters(f)}
                // Применяем фильтры (функция выше)
                onApplyFilters={applyFilters}
            />

            <Layout>
                <div style={{ margin: "0 auto", maxWidth: "1400px", width: "100%" }}>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm mb-6">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">
                            Home
                        </Link>
                        <span className="text-gray-500">/</span>
                        <span className="text-gray-900">Catalog</span>
                    </div>

                    {/* Header */}
                    <div
                        className="flex items-center justify-between mb-8"
                        style={{ minHeight: "4rem" }}
                    >
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Catalog
                            </h1>
                            <p className="text-sm text-gray-500">
                                Showing {indexOfFirstCar + 1} -{" "}
                                {Math.min(indexOfLastCar, cars.length)} of {cars.length}{" "}
                                results
                            </p>
                        </div>
                    </div>

                    {/* Car Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <p>Ошибка: {error}</p>
                    ) : currentCars.length === 0 ? (
                        <p>Автомобили не найдены</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {currentCars.map((car, index) => (
                                <CarCard
                                    key={index}
                                    imageUrl={`data:image/jpeg;base64,${car.images[0]}`}
                                    brand={car.brand}
                                    model={car.model}
                                    year={car.year}
                                    mileage={car.details?.city_mpg || "N/A"}
                                    fuelType={car.details?.fuel_type || "N/A"}
                                    transmission={car.details?.transmission || "N/A"}
                                    isBookmarked={false}
                                    isMarket={false}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                            (page) => (
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
                            )
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
