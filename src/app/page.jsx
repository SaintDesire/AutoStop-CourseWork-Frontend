"use client";
import React from 'react';
import Image from 'next/image';
import mainCar from '@/../public/mainCar.png';
import AutoScroll from "@/components/ui/main/autoScroll"

const Home = () => {
  return (
    <div className="home-container">
      {/* Заголовок и информация */}
      <div className="hero-text">
        <h1>Fast and Easy</h1>
        <div className="hero-info">
          <div>
            <span>50+</span>
            <p>Car brands</p>
          </div>
          <div>
            <span>10k+</span>
            <p>Clients</p>
          </div>
        </div>
      </div>

      {/* Параллелограмм и изображение */}
      <div className="parallelogram"></div>
      <Image
        src={mainCar}
        alt="Main Car"
        className="parallelogram-car"
        priority
      />

      {/* Панель поиска */}
      <section className="search-section">
        <div className="search-bar">
          <select>
            <option>Any Makes</option>
          </select>
          <select>
            <option>Any Models</option>
          </select>
          <select>
            <option>All Prices</option>
          </select>
          <button>Search Cars</button>
        </div>

        <div className="filter-buttons">
          <button>SUV</button>
          <button>Sedan</button>
          <button>Hatchback</button>
          <button>Coupe</button>
          <button>Hybrid</button>
        </div>
      </section>
      
        {/* Логотипы */}
        <section className="brands">
          <div className="brand-logo">HONDA</div>
          <div className="brand-logo">JAGUAR</div>
          <div className="brand-logo">VOLVO</div>
          <div className="brand-logo">AUDI</div>
          <div className="brand-logo">ACURA</div>
          <div className="brand-logo">TESLA</div>
        </section>

        {/* Секция автомобилей */}
        <AutoScroll />

        {/* Блоки предложений */}
        <section className="offers">
          <div className="offer-card">
            <h3>Are You Looking For a Car?</h3>
            <button>Get Started</button>
          </div>
          <div className="offer-card">
            <h3>Do You Want to Sell a Car?</h3>
            <button>Get Started</button>
          </div>
        </section>
    </div>
  );
};

export default Home;
