"use client";

import { useParams } from "next/navigation";
import cars from "@/testData/cars"

export default function CarPage() {
  const params = useParams();
  const id = params?.id;
  const car = cars.find((car) => car.id === Number(id));

  if (!car) {
    return <div>Автомобиль с ID {id} не найден.</div>;
  }

  
  return (
    <div className="car-page">
      <div className="car-header">
        <h1 className="car-title">{car.name}</h1>
        <p className="car-subtitle">
          <span>4.8 (2,436 отзывов)</span> • Пост код: BTX0000614
        </p>
      </div>
      <div className="car-main">
        <div className="car-image-section">
          <img src={car.image} alt={car.name} className="main-car-image" />
          <div className="car-thumbnails">
            <img src={car.image} alt={car.name} className="car-thumbnail" />
            <img src={car.image} alt={car.name} className="car-thumbnail" />
            <img src={car.image} alt={car.name} className="car-thumbnail" />
            <img src={car.image} alt={car.name} className="car-thumbnail" />
          </div>
        </div>

        <div className="car-details-section">
          <div className="car-info">
            <p><strong>Seats:</strong> 7 seats</p>
            <p><strong>Car gearbox:</strong> Auto</p>
            <p><strong>Fuel:</strong> {car.engine}</p>
            <p><strong>Car brand:</strong> Kia</p>
            <p><strong>Type:</strong> Carnival</p>
            <p><strong>Mileage:</strong> 23,000 km</p>
          </div>
          <div className="car-price">
            <h2>Price</h2>
            <p className="price-value">{car.price}</p>
            <button className="contact-btn">Contact</button>
          </div>
        </div>
      </div>

      <div className="car-description">
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. Maecenas tristique mauris nisl in eget senectus netus.
          Amet felis diam eleifend ac sit. Tellus nibh velit amet elementum donec consectetur. Mattis nisl
          eget volutpat dictum morbi aliquam justo.
        </p>
      </div>
    </div>
  );
}
