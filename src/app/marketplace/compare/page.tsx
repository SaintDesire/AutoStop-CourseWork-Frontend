"use client";

import { useEffect, useState } from "react";

interface CarDetails {
  car_id: string;
  // Поле `images` может быть массивом base64
  images?: string[];
  // Поле `image` может быть JSON-строкой с массивом
  image?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string | null;
  mileage: number;
  engine: string;
  seats: number;
  condition: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  createdAt: string;
  updatedAt: string;
}

export default function ComparePage() {
  const [car1, setCar1] = useState<CarDetails | null>(null);
  const [car2, setCar2] = useState<CarDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("compareList");
    if (!stored) return;

    const compareIds: string[] = JSON.parse(stored);

    if (compareIds.length === 0) {
      setError("Вы не выбрали ни одного автомобиля для сравнения.");
      return;
    }

    const fetchCar = async (carId: string) => {
      const res = await fetch(`http://localhost:3001/api/market/cars/${carId}`);
      if (!res.ok) {
        throw new Error(`Ошибка при загрузке автомобиля с ID ${carId}`);
      }
      const data: CarDetails = await res.json();
      return data;
    };

    // Запрос для car1
    if (compareIds[0]) {
      fetchCar(compareIds[0])
        .then((data) => setCar1(data))
        .catch((err) => setError(err.message));
    }

    // Запрос для car2
    if (compareIds[1]) {
      fetchCar(compareIds[1])
        .then((data) => setCar2(data))
        .catch((err) => setError(err.message));
    }
  }, []);

  // Достаём массив изображений (если нужно)
  const getImageArray = (car: CarDetails | null) => {
    if (!car) return [];

    // 1) Если есть поле images (массив base64)
    if (Array.isArray(car.images) && car.images.length > 0) {
      return car.images;
    }

    // 2) Если есть поле image (строка JSON с массивом)
    if (car.image) {
      try {
        return JSON.parse(car.image);
      } catch (err) {
        console.error("Ошибка парсинга поля 'image':", err);
      }
    }

    // 3) Иначе нет картинок
    return [];
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Compare Cars</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const car1Images = getImageArray(car1);
  const car2Images = getImageArray(car2);

  // Первая картинка (или /no-image.jpg)
  const car1Image = car1Images[0] || "/no-image.jpg";
  const car2Image = car2Images[0] || "/no-image.jpg";

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Compare Cars</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Левая карточка (Car 1) */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {car1 ? (
            <>
              <img
                src={car1Image}
                alt={`${car1.brand} ${car1.model}`}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">
                {car1.brand} {car1.model} {car1.year}
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Price:</span> {car1.price} USD
                </p>
                <p>
                  <span className="font-medium">Mileage:</span> {car1.mileage}
                </p>
                <p>
                  <span className="font-medium">Fuel Type:</span> {car1.fuelType}
                </p>
                <p>
                  <span className="font-medium">Transmission:</span>{" "}
                  {car1.transmission}
                </p>
                <p>
                  <span className="font-medium">Body Type:</span> {car1.bodyType}
                </p>
                <p>
                  <span className="font-medium">Condition:</span> {car1.condition}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Автомобиль не выбран или не загружен</p>
          )}
        </div>

        {/* Правая карточка (Car 2) */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {car2 ? (
            <>
              <img
                src={car2Image}
                alt={`${car2.brand} ${car2.model}`}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">
                {car2.brand} {car2.model} {car2.year}
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Price:</span> {car2.price} USD
                </p>
                <p>
                  <span className="font-medium">Mileage:</span> {car2.mileage}
                </p>
                <p>
                  <span className="font-medium">Fuel Type:</span> {car2.fuelType}
                </p>
                <p>
                  <span className="font-medium">Transmission:</span>{" "}
                  {car2.transmission}
                </p>
                <p>
                  <span className="font-medium">Body Type:</span> {car2.bodyType}
                </p>
                <p>
                  <span className="font-medium">Condition:</span> {car2.condition}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Автомобиль не выбран или не загружен</p>
          )}
        </div>
      </div>
    </div>
  );
}
