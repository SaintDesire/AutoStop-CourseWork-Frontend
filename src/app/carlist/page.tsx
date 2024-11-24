import CarCard from "@/components/ui/carCard";

type Car = {
    id: number,
    name: string,
    engine: string,
    price: string,
    image: string,
}

interface CarsPageProps {
    cars: Car[];
}

const CarsPage: React.FC<CarsPageProps> = ({ cars }) => {
    return (
        <div className="cars-container">
            <h1 className="cars-title">Каталог автомобилей</h1>
            <div className="cars-grid">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
}

// Пример данных об автомобилях
const cars = [
    {
      id: 1,
      name: "BMW X5 2022",
      engine: "Бензин",
      price: "$50,000",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Audi Q7 2021",
      engine: "Дизель",
      price: "$55,000",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Toyota Camry 2020",
      engine: "Гибрид",
      price: "$30,000",
      image: "https://via.placeholder.com/300x200",
    },
];

export default () => <CarsPage cars={cars} />;