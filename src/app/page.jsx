"use client"
import React, { useState } from 'react';
import CarCatalog from '@/components/ui/main/carCatalog';
import Marketplace from '@/components/ui/main/marketplace';
import CarForm from '@/components/ui/main/carForm';
import ToggleMenu from '@/components/ui/main/toggleMenu';

const Home = () => {
  const [view, setView] = useState('catalog');
  const [cars, setCars] = useState([
    { id: 1, model: 'Toyota Camry', year: 2020, price: '$30,000', image: 'https://placehold.co/600x400.png' },
    { id: 2, model: 'Honda Accord', year: 2021, price: '$28,000', image: 'https://placehold.co/600x400.png' },
    // Дополнительные автомобили для каталога
  ]);
  const [listings, setListings] = useState([
    { id: 1, title: 'Продам Toyota Camry', price: '$30,000', carImage: 'https://placehold.co/600x400.png' },
    { id: 2, title: 'Продам Honda Accord', price: '$28,000', carImage: 'https://placehold.co/600x400.png' },
    // Дополнительные объявления
  ]);

  const handleFormSubmit = (newCar) => {
    setListings([...listings, { ...newCar, id: listings.length + 1, carImage: 'https://placehold.co/600x400.png' }]);
  };

  return (
    <div className='w-5/6 flex flex-col' style={{margin: '15px auto'}}>
      <div className='flex'>
        <h1>BUY, SELL & RENT<br/>
        REPUTABLE CARS</h1>
        <img src="https://placehold.co/600x400.png" alt="Главное изображение" style={{maxHeight: '300px'}}/>
      </div>
      <ToggleMenu onToggle={setView} />

      <div className="filters">
        {view === 'marketplace' && <CarForm onSubmit={handleFormSubmit} />}
      </div>

      <div className="content">
          <Marketplace listings={listings} />
          <CarCatalog cars={cars} />
      </div>
    </div>
  );
};

export default Home;
