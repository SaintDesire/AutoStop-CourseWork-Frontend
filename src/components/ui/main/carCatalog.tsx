interface Car {
  id: number;
  model: string;
  year: number;
  price: string;
  image: string;
}

interface CarCatalogProps {
  cars: Car[];
}

const CarCatalog: React.FC<CarCatalogProps> = ({ cars }) => {
  return (
    <div>
      <h2>Наши автомобили</h2>
      <div className="car-catalog">
        {cars.map((car) => (
          <div key={car.id} className="car-item">
            <img src={car.image} alt={car.model} />
            <h3>{car.model}</h3>
            <p>{car.year} | {car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCatalog;