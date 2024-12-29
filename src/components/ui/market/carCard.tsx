'use client';

import Image from 'next/image';
import { Bookmark, Fuel, Gauge, Settings2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

interface CarCardProps {
  carId: string;
  imageUrl: any;
  brand: string;
  model: string;
  year: string;
  price: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  isBookmarked: boolean;
  isMarket: boolean;
  onRemove?: (carId: string) => void; // Функция для удаления из списка
  onCompareClick?: () => void;
  isInCompare?: boolean; 
}

export default function CarCard({
  carId,
  imageUrl,
  brand,
  model,
  year,
  price,
  mileage,
  fuelType,
  transmission,
  isBookmarked,
  isMarket,
  onRemove,
  onCompareClick,
  isInCompare,
}: CarCardProps) {
  const [isSaved, setIsSaved] = useState(isBookmarked);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthorized(true);
          setUserId(data.id);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error checking authorization:', error);
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  const handleBookmarkClick = async () => {
    if (!userId) {
      console.error('User not authorized or userId is null');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/favourite/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, car_id: carId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Favourite toggled successfully:', data);
        const isFavourite = data.favourite.isFavourite;

        setIsSaved(isFavourite);

        // Удаляем из списка, если isFavourite стал false
        if (!isFavourite && onRemove) {
          onRemove(carId);
        }
      } else {
        console.error('Failed to toggle favourite');
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  const formatPrice = (price: string): string => {
    const numberPrice = Number(price);
    if (isNaN(numberPrice)) return price;
    return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(numberPrice);
  };

  const formattedPrice = formatPrice(price);

  return (
    <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm shadow-sm border border-gray-100 mb-10 mr-7 ml-7">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageUrl.startsWith('data:image/') ? imageUrl : `data:image/jpeg;base64,${imageUrl}`}
          alt={`${model} ${brand}`}
          fill
          className="object-cover"
          unoptimized
        />

        {isAuthorized !== null && (
          <button
            onClick={handleBookmarkClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved ? 'fill-current text-blue-600' : 'text-gray-600'}`}
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="space-y-1 mb-4">
          <h3 className="font-semibold text-lg text-gray-900">{`${brand} ${model}`}</h3>
          <p className="text-2xl font-bold text-gray-600">{formattedPrice}</p>
          <p className="text-sm text-gray-600">{year}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <Gauge className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">{mileage.toLocaleString()} Miles</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <Fuel className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">{fuelType}</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <Settings2 className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">{transmission}</div>
          </div>
        </div>

        <Link
          href={`${DASHBOARD_PAGES.MARKETPLACE_CAR}/${carId}`}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          View Details
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
        <button
          onClick={onCompareClick}
          className={`mt-2 px-4 py-2 rounded ${
            isInCompare ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {isInCompare ? "Remove from Compare" : "Add to Compare"}
      </button>
      </div>
    </div>
  );
}
