import CarCard from "@/components/ui/carCard";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { Car } from "@/types/car";
import Link from "next/link";
import cars from "../../testData/cars"


interface CarsPageProps {
    cars: Car[];
}

const CarsPage: React.FC<CarsPageProps> = ({ cars }) => {
    return (
        <div className="cars-container">
            <h1 className="cars-title">Каталог автомобилей</h1>
            <div className="cars-grid">
                {cars.map((car) => (
                    <Link href={`${DASHBOARD_PAGES.CAR}/${car.id}`} className="car-element">
                        <CarCard key={car.id} car={car} />
                    </Link>
                ))}
            </div>
        </div>
    );
}


export default () => <CarsPage cars={cars} />;