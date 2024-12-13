"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import mainCar from '@/../public/mainCar.png'

const Home = () => {
  return (
    <div className="home-container">
       <div className="box">
      <div className="group">
        <div className="text-wrapper">Fast and Easy</div>

        <div className="info-container">
          <div className="div">
            <div className="text-wrapper-2">50+</div>

            <div className="text-wrapper-3">Car brands</div>
          </div>

          <div className="div">
            <div className="text-wrapper-2">10k+</div>

            <div className="text-wrapper-3">Clients</div>
          </div>
        </div>
      </div>
    </div>
      <div className="parallelogram"></div>
      <Image
        src={mainCar}
        style={{ transform: 'none'}}
        className="parallelogram-car"
        alt="MainCar"
      />
    </div>
  );
};



export default Home;
