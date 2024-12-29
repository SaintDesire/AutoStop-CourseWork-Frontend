"use client";
import React from 'react';
import Image from 'next/image';
import mainCar from '@/../public/mainCar.png';
import brandingCarousel from '@/../public/Branding Carousel.png'
import AutoScroll from "@/components/ui/main/autoScroll"
import Link from 'next/link';
import elecricCar1 from "@/../public/electric-car1.png"
import elecricCar2 from "@/../public/electric-car2.png"
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { Bookmark, ArrowLeft, ArrowRight, Gauge, Fuel, Settings2, ArrowUpRight } from 'lucide-react'

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
              10+
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
      <div className="grid md:grid-cols-2 gap-6 mt-16">
        <div className="bg-[#e2f1ff] rounded-xl p-8">
          <h3 className="text-2xl text-black font-semibold mb-4">
            Are You Looking<br />For a Car?
          </h3>
          <p className="text-gray-600 mb-8">
            We are committed to providing our customers with exceptional service.
          </p>
          <div className="flex items-center justify-between">
            <Link 
              href={DASHBOARD_PAGES.CARLIST}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 flex items-center"
            >
              Get Started
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
            <Image
              src={elecricCar1}
              alt="Electric Car"
              width={80}
              height={80}
            />
          </div>
        </div>

        <div className="bg-[#ffe2e2] rounded-xl p-8">
          <h3 className="text-2xl text-black font-semibold mb-4">
            Do You Want to<br />Sell a Car?
          </h3>
          <p className="text-gray-600 mb-8">
            We are committed to providing our customers with exceptional service.
          </p>
          <div className="flex items-center justify-between">
            <Link 
              href={DASHBOARD_PAGES.MARKETPLACE}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 flex items-center"
            >
              Get Started
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
            <Image
              src={elecricCar2}
              alt="Sell Car"
              width={80}
              height={80}
            />
          </div>
        </div>
      </div>
      </section>

      <Image src={brandingCarousel} alt='Brands' style={{ userDrag: "none", pointerEvents: "none" }}/>
        <AutoScroll />

    </div>
  );
};

export default Home;
