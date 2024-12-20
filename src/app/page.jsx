"use client";
import React from 'react';
import Image from 'next/image';
import mainCar from '@/../public/mainCar.png';
import AutoScroll from "@/components/ui/main/autoScroll"
import elecricCar1 from "@/../public/electric-car1.png"
import elecricCar2 from "@/../public/electric-car2.png"
import SearchBar from '@/components/ui/market/searchBar';
import SearchInterface from '@/components/ui/main/searchBar';

const Home = () => {
  return (
    <div className="home-container">
      <div className='hero-text'>
      <div className="max-w-fit ml-10 mt-36 px-4">
        <h2 className="text-white text-5xl md:text-6xl font-bold text-center mb-16">
          Fast and Easy
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          <div className="text-center md:text-left md:pr-8">
            <div className="text-white text-4xl md:text-5xl font-bold mb-2">
              50+
            </div>
            <div className="text-gray-400 text-lg">
              Car brands
            </div>
          </div>
          
          <div className="hidden md:block w-px h-16 bg-gray-800 mx-8" />
          
          <div className="text-center md:text-left md:pl-8">
            <div className="text-white text-4xl md:text-5xl font-bold mb-2">
              10k+
            </div>
            <div className="text-gray-400 text-lg">
              Clients
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="parallelogram">
        <Image
          src={mainCar}
          alt="Main Car"
          className="parallelogram-car"
          priority
        />
      </div>

      {/* Панель поиска */}
      <section className="search-section">
        <SearchInterface/>
      </section>

        {/* Секция автомобилей */}
        <AutoScroll />

        {/* Блоки предложений */}
        <section className="offers">
          <div className="offer-card">
            <h3>Are You Looking For a Car?</h3>
            <h5>We are committed to providing our customers with
            exceptional service.</h5>
            <Image src={elecricCar1} alt='car1'/>
            <button>Get Started</button>
          </div>
          <div className="offer-card">
            <h3>Do You Want to Sell a Car?</h3>
            <h5>We are committed to providing our customers with
            exceptional service.</h5>
            <Image src={elecricCar2} alt='car1'/>
            <button>Get Started</button>
          </div>
        </section>
    </div>
  );
};

export default Home;
