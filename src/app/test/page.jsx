"use client";

import { useEffect, useState } from "react";
import CarCard from "@/components/ui/catalog/carCard";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/cars?limit=40"); // Замените URL на ваш
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Список автомобилей</h1>
      {cars.length === 0 ? (
        <p>Автомобили не найдены</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <CarCard
              key={index}
              imageUrl={`data:image/jpeg;base64,${car.images[0]}`}
              title={`${car.brand} ${car.model}`}
              subtitle={`Год: ${car.year}`}
              mileage={car.combination_mpg}
              fuelType={car.fuel_type}
              transmission={car.transmission}
            />
          ))}
        </div>
      )}
    </div>
  );
}
