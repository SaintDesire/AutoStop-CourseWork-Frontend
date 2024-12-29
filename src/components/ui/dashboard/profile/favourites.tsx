"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/ui/layout";
import CarCard from "@/components/ui/market/carCard";

interface FavouriteCar {
  favourite_id: number;
  user_id: number;
  car_id: number;
  isFavourite: boolean;
  Car: {
    car_id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    description: string | null;
    mileage: number;
    engine: string;
    seats: number;
    image: string;
    condition: string;
    bodyType: string;
    fuelType: string;
    transmission: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export default function Favourites() {
  const [favouriteCars, setFavouriteCars] = useState<FavouriteCar[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
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

        const data: FavouriteCar[] = await favouritesResponse.json();
        setFavouriteCars(data.filter((fav) => fav.isFavourite)); // Фильтруем только избранные
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setError(`${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleRemove = (carId: string) => {
    setFavouriteCars((prev) =>
      prev.filter((fav) => fav.Car?.car_id.toString() !== carId)
    );
  };

  return (
    <Layout>
      <div className="mt-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : favouriteCars.length === 0 ? (
          <p>No favourite cars available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouriteCars.map(({ favourite_id, Car }) => (
              Car && (
                <CarCard
                  key={favourite_id}
                  carId={Car.car_id.toString()}
                  imageUrl={JSON.parse(Car.image)[0] || "/images/default-car.jpg"}
                  brand={Car.brand}
                  model={Car.model}
                  year={Car.year.toString()}
                  price={formatPrice(Car.price)}
                  mileage={Car.mileage}
                  fuelType={Car.fuelType}
                  transmission={Car.transmission || "Automatic"}
                  isBookmarked={true}
                  isMarket={false}
                  onRemove={handleRemove}
                />
              )
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
