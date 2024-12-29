"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/ui/layout";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import CarCard from "@/components/ui/market/carCard";

interface CarDetails {
  car_id: number;
  model: string;
  brand: string;
  year: number;
  price: number;
  description: string | null;
  mileage: number;
  engine: string;
  seats: number;
  images: string[]; // массив Base64 изображений
  image: string;
  condition: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  createdAt: string;
  updatedAt: string;
}

interface FavouriteCar {
  car_id: number;
  isFavourite: boolean;
}

export default function Dashboard() {
  const [cars, setCars] = useState<CarDetails[]>([]);
  const [favouriteCars, setFavouriteCars] = useState<FavouriteCar[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Получаем user_id из сессии
        const sessionResponse = await fetch("http://localhost:3001/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        if (!sessionResponse.ok) {
          throw new Error("Failed to fetch user session");
        }

        const sessionData = await sessionResponse.json();
        const userId = sessionData.id;
        setUserId(userId);

        if (!userId) {
          throw new Error("User ID not found in session data");
        }

        // Запрашиваем избранные автомобили для пользователя
        const favouritesResponse = await fetch(`http://localhost:3001/api/favourite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ user_id: userId }),
        });

        if (!favouritesResponse.ok) {
          const errorResponse = await favouritesResponse.json();
          throw new Error(errorResponse.error || "Unknown error occurred");
        }

        const favouriteData: FavouriteCar[] = await favouritesResponse.json();
        setFavouriteCars(favouriteData);

        // Запрашиваем общий список автомобилей
        const carsResponse = await fetch("http://localhost:3001/api/market/cars");
        if (!carsResponse.ok) {
          throw new Error("Failed to fetch cars");
        }

        const carData: CarDetails[] = await carsResponse.json();

        const decodedCars = carData.map((car) => ({
          ...car,
          images: car.image ? JSON.parse(car.image) : [],
        }));

        setCars(decodedCars);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const isCarBookmarked = (carId: number): boolean => {
    return favouriteCars.some((fav) => fav.car_id === carId && fav.isFavourite);
  };

  return (
    <Layout>
      <Link
        href={DASHBOARD_PAGES.MARKETPLACE_CAR_ADD}
        className="p-4 bg-black h-fit text-white rounded-2xl"
      >
        Add Car
      </Link>

      <div className="mt-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car.car_id}
                carId={car.car_id.toString()}
                imageUrl={car.images[0]}
                brand={car.brand}
                model={car.model}
                year={car.year.toString()}
                price={formatPrice(car.price)}
                mileage={car.mileage}
                fuelType={car.fuelType}
                transmission={car.transmission || "Automatic"}
                isBookmarked={isCarBookmarked(car.car_id)}
                isMarket={true}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
