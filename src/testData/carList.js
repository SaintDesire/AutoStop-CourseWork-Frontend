const cars = [
  {
    image: '/car1.jpg',
    title: 'Ford Transit – 2021',
    price: '22,000',
    mileage: '2500 Miles',
    fuelType: 'Diesel',
    transmission: 'Manual',
    tag: 'Great Price',
  },
  {
    image: '/car2.jpg',
    title: 'New GLC – 2023',
    price: '95,000',
    mileage: '50 Miles',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    tag: 'Low Mileage',
  },
  {
    image: '/car3.jpg',
    title: 'Audi A6 3.5 – New',
    price: '58,000',
    mileage: '100 Miles',
    fuelType: 'Petrol',
    transmission: 'Automatic',
  },
];

const CarList = () => {
  return (
    <div className="car-list">
      {cars.map((car, index) => (
        <CarCard key={index} {...car} />
      ))}
    </div>
  );
};

export default CarList;
