'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Share2, Bookmark, Square, MapPin, Phone, MessageCircle } from 'lucide-react'
import Layout from '@/components/ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarDetails {
  car_id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  seats: number;
  image: string[]; // base64 image (array format)
  condition: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  createdAt: string;
  updatedAt: string;
}

export default function CarDetailsPage() {
  const { car_id } = useParams<{ car_id: string }>();

  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!car_id) return;

    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3001/api/market/cars/${car_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        const data: CarDetails = await response.json();
        setCarDetails(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [car_id]);

  // Функция для извлечения base64 строки из массива
  const getBase64Image = (base64Arr: string) => {
    try {
      const decoded = JSON.parse(base64Arr); // Преобразуем строку в массив
      if (Array.isArray(decoded) && decoded.length > 0) {
        return decoded[0]; // Извлекаем строку base64 из массива
      }
    } catch (error) {
      console.error('Error parsing base64 string:', error);
    }
    return ''; // Возвращаем пустую строку, если не удалось обработать
  };

  if (loading) return <Layout><div className='mx-auto'>Loading...</div></Layout>;
  if (error) return <Layout><div className='mx-auto'>Error: {error}</div></Layout>;
  if (!carDetails) return <Layout><div className='mx-auto'>No car details available.</div></Layout>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/market" className="hover:text-blue-600">Market</Link>
          <span>/</span>
          <span className="text-gray-900">{carDetails.brand} {carDetails.name} ({carDetails.year})</span>
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{carDetails.brand} {carDetails.name} ({carDetails.year})</h1>
          <p className="text-gray-600 mt-1">{carDetails.bodyType} - {carDetails.condition}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.mileage} miles</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.transmission}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{carDetails.fuelType}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Bookmark className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Square className="w-5 h-5" />
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
{typeof carDetails.image === 'string' ? (
  <SwiperSlide>
    <div className="relative aspect-[16/9]">
      <Image
        src={getBase64Image(carDetails.image)}
        alt={`${carDetails.brand} ${carDetails.name}`}
        fill
        className="object-cover"
      />
    </div>
  </SwiperSlide>
) : (
  // Если это массив, то отображаем все изображения
  carDetails.image?.map((image: string, index: number) => (
    <SwiperSlide key={index}>
      <div className="relative aspect-[16/9]">
        <Image
          src={getBase64Image(image)}
          alt={`${carDetails.brand} ${carDetails.name}`}
          fill
          className="object-cover"
        />
      </div>
    </SwiperSlide>
  ))
)}

              <button className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                Video
              </button>
            </div>

            {/* Car Overview */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Car Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Body</span>
                  <span className="font-medium">{carDetails.bodyType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">{carDetails.condition}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Mileage</span>
                  <span className="font-medium">{carDetails.mileage}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Engine Size</span>
                  <span className="font-medium">{carDetails.engine}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">{carDetails.fuelType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Seats</span>
                  <span className="font-medium">{carDetails.seats}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Leather Seats
                    </li>
                    {/* Add more features */}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Our Price</p>
                  <p className="text-3xl font-bold">${carDetails.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Instant Saving</p>
                  <p className="text-lg font-semibold text-green-600">$5,000</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 hover:bg-blue-700">
                Make An Offer Price
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
                Schedule Test Drive
              </button>
            </div>

            {/* Dealer Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="/placeholder.svg"
                  alt="Dealer"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">admin</h3>
                  <p className="text-sm text-gray-500">123 Broadway, Brooklyn</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                  <MapPin className="w-4 h-4" />
                  <span>Get Direction</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                  <Phone className="w-4 h-4" />
                  <span>+86-13345789</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Dealer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
