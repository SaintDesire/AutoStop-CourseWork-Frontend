'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Share2, Heart, LayoutGrid } from 'lucide-react'
import Layout from '@/components/ui/layout'

interface CarDetails {
  brand: string;
  model: string;
  year: number;
  details: {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
    price?: number;
  };
  images: string[]; // assuming base64 images
}

export default function CarDetailsPage() {
  const { brand, model } = useParams<{ brand: string; model: string }>();

  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!brand || !model) return;

    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:3001/api/catalog/cars/get?brand=${brand}&model=${model}`
        );
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
  }, [brand, model]);

  function formatCapital(model: string | undefined) {
    if (!model) {
      return ''; // Возвращаем пустую строку, если model не задан
    }

    return model
      .split(' ') // Разбиваем строку на слова
      .map(word => {
        if (word.length < 3) {
          return word.toUpperCase(); // Если слово короче 4 символов, делаем его заглавным
        } else {
          return word.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Преобразуем первую букву каждого слова в заглавную
        }
      })
      .join(' '); // Собираем обратно в строку
  }

  const formatFuelType = (fuelType: string) => {
    switch (fuelType.toLowerCase()) {
      case 'gas':
        return 'Gasoline';
      case 'electricity':
        return 'Electric';
      case 'diesel':
        return 'Diesel';
      default:
        return fuelType;
    }
  };

  const formatDriveType = (driveType: string) => {
    switch (driveType.toLowerCase()) {
      case 'fwd':
        return 'Front-Wheel Drive (FWD)';
      case 'rwd':
        return 'Rear-Wheel Drive (RWD)';
      case 'awd':
        return 'All-Wheel Drive (AWD)';
      case '4wd':
        return 'Four-Wheel Drive (4WD)';
      default:
        return driveType;
    }
  };

  const capitalizedModel = formatCapital(carDetails?.model);
  const capitalizedClass = formatCapital(carDetails?.details.class);

  const mainImage = carDetails?.images[0] ? `data:image/jpeg;base64,${carDetails?.images[0]}` : '';
  const thumbnails = carDetails?.images.slice(1).map(img => `data:image/jpeg;base64,${img}`) || [];

  // Открытие модального окна с изображением
  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Закрытие модального окна
  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  // Переход к следующему изображению
  const nextImage = () => {
    if (selectedImageIndex !== null && carDetails?.images?.length) {
        if (selectedImageIndex < carDetails.images.length - 1) {
          setSelectedImageIndex(selectedImageIndex + 1);
        }
      }
  };

  // Переход к предыдущему изображению
  const prevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  if (loading) return <Layout><div className='mx-auto'>Loading...</div></Layout>;
  if (error) return <Layout><div className='mx-auto'>Error: {error}</div></Layout>;
  if (!carDetails) return <Layout><div className='mx-auto'>No car details available.</div></Layout>;

  return (
    <Layout>
      <div className="mx-auto px-4 py-8 w-full" style={{ maxWidth: '1400px' }}>
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href="/catalog" className="text-gray-500 hover:text-gray-700">Catalog</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900">{`${carDetails.brand} ${capitalizedModel} ${carDetails.year}`}</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{`${carDetails.brand} ${capitalizedModel} ${carDetails.year}`}</h1>
            <p className="text-gray-600 mb-4">{capitalizedClass}</p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {carDetails.year}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {carDetails.details.city_mpg} Miles Per Galon City
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {carDetails.details.highway_mpg} Miles Per Galon Highway
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {mainImage && (
            <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => openImageModal(0)}>
              <Image
                src={mainImage}
                alt={`${carDetails.brand} ${carDetails.model}`}
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          {thumbnails.length > 0 && thumbnails.map((thumb, idx) => (
            <div key={idx} className="relative cursor-pointer" onClick={() => openImageModal(idx + 1)}>
              <Image
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>

        {/* Car Overview */}
        <section className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Car Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Engine Size</h3>
              <p className="text-gray-500 text-lg">{carDetails.details.displacement} L</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Transmission</h3>
              <p className="text-gray-500 text-lg">
                {carDetails.details.transmission === 'a' ? 'Automatic' : 'Manual'}
              </p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Fuel Type</h3>
              <p className="text-gray-500 text-lg">{formatFuelType(carDetails.details.fuel_type)}</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Drive Type</h3>
              <p className="text-gray-500 text-lg">{formatDriveType(carDetails.details.drive)}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Fullscreen Image */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative max-w-screen-lg max-h-screen">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-black text-3xl z-10"
            >
              ×
            </button>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-4xl z-10"
            >
              &#10094;
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black text-4xl z-10"
            >
              &#10095;
            </button>
            <Image
              src={`data:image/jpeg;base64,${carDetails.images[selectedImageIndex]}`}
              alt={`Fullscreen Image ${selectedImageIndex}`}
              width={800}
              height={600}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
