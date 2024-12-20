"use client";
import React, { useRef } from 'react';
import Link from 'next/link';

const AutoScroll = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const cars = [
    {
      id: 1,
      image: '/car1.jpg',
      title: 'Ford Transit – 2021',
      description: '2500 Miles | Diesel | Manual',
      price: '$22,000',
      link: '/car/1',
    },
    {
      id: 2,
      image: '/car2.jpg',
      title: 'New GLC – 2023',
      description: '50 Miles | Petrol | Automatic',
      price: '$95,000',
      link: '/car/2',
    },
    {
      id: 3,
      image: '/car3.jpg',
      title: 'Audi A6 3.5 – New',
      description: '100 Miles | Petrol | Automatic',
      price: '$58,000',
      link: '/car/3',
    },
    {
      id: 4,
      image: '/car4.jpg',
      title: 'Corolla Altis – 2023',
      description: '15000 Miles | Petrol | CVT',
      price: '$45,000',
      link: '/car/4',
    },
    {
      id: 5,
      image: '/car5.jpg',
      title: 'Ford Explorer 2023',
      description: '10 Miles | Diesel | Automatic',
      price: '$35,000',
      link: '/car/5',
    },
    {
      id: 6,
      image: '/car5.jpg',
      title: 'Ford Explorer 2023',
      description: '10 Miles | Diesel | Automatic',
      price: '$35,000',
      link: '/car/6',
    },
    {
      id: 7,
      image: '/car5.jpg',
      title: 'Ford Explorer 2023',
      description: '10 Miles | Diesel | Automatic',
      price: '$35,000',
      link: '/car/7',
    },
    {
      id: 8,
      image: '/car5.jpg',
      title: 'Ford Explorer 2023',
      description: '10 Miles | Diesel | Automatic',
      price: '$35,000',
      link: '/car/8',
    },
    {
      id: 9,
      image: '/car5.jpg',
      title: 'Ford Explorer 2023',
      description: '10 Miles | Diesel | Automatic',
      price: '$35,000',
      link: '/car/9',
    },
  ];

  return (
    <div className="carousel-container">
      <h2>Explore All Vehicles</h2>
      <div className="tabs">
        <span className="tab tab-active">New Cars</span>
        <span className="tab">Used Cars</span>
        <span className="view-all">View All →</span>
      </div>

      {/* Прокрутка */}
      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div className="carousel" ref={scrollContainerRef}>
          {cars.map((car) => (
            <Link key={car.id} href={car.link}>
              <div className="card">
                <img src={car.image} alt={car.title} />
                <div className="card-content">
                  <h3>{car.title}</h3>
                  <p>{car.description}</p>
                  <span className="price">{car.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
};

export default AutoScroll;
