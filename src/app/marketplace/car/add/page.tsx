'use client';

import Layout from "@/components/ui/layout";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  brand: string;
  year: string;
  price: string;
  mileage: string;
  engine: string;
  seats: string;
  condition: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  images: string[]; // Массив для хранения изображений в формате base64
  videoReview: string; // Ссылка на видео-обзор автомобиля
}

export default function AddCarPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    brand: "",
    year: "",
    price: "",
    mileage: "",
    engine: "",
    seats: "",
    condition: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
    images: [],
    videoReview: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    )
      .then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...base64Images],
        }));
      })
      .catch((error) => console.error("Error uploading images:", error));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formDataWithImages = {
      ...formData,
      images: JSON.stringify(formData.images), // Сериализуем изображения
    };

    try {
      const response = await fetch("http://localhost:3001/api/market/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithImages),
      });

      if (!response.ok) {
        throw new Error("Failed to add car");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding car. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Add a New Car</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text inputs for car details */}
          <input
            type="text"
            name="name"
            placeholder="Car Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="mileage"
            placeholder="Mileage"
            value={formData.mileage}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          />

          {/* Dropdown for engine */}
          <select
            name="engine"
            value={formData.engine}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Engine</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {/* Dropdown for seats */}
          <select
            name="seats"
            value={formData.seats}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Seats</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="8+">8+</option>
          </select>

          {/* Dropdowns for car parameters */}
          <select
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <select
            name="bodyType"
            value={formData.bodyType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Body Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
          </select>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>

          {/* File input for images */}
          <div>
            <label htmlFor="images" className="block mb-3 text-gray-700 font-medium">Upload Images</label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Preview uploaded images */}
          <div className="grid grid-cols-2 gap-4">
            {formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-32 object-cover border rounded shadow-md"
              />
            ))}
          </div>

          {/* Video review input */}
          <div>
            <label htmlFor="videoReview" className="block mb-3 text-gray-700 font-medium">Video Review URL</label>
            <input
              type="url"
              id="videoReview"
              name="videoReview"
              value={formData.videoReview}
              onChange={handleInputChange}
              placeholder="https://youtube.com/review"
              className="w-full p-3 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Add Car
          </button>
        </form>
      </div>
    </Layout>
  );
}
