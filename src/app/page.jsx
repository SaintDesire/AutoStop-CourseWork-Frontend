"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import mainCar from '@/../public/mainCar.png'

const Home = () => {

  return (
    <div className='w-5/6 flex flex-col' style={{margin: '15px auto'}}>
      <h1 className='fast-and-easy'>Fast and Easy</h1>
      <div className='parallelogram'></div>
      <Image 
        src={mainCar} 
        style={{ transform: 'none' }}
        className='parallelogram-сar'
        alt='MainCar'/>
    </div>
  );
};

export default Home;
