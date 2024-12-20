import CarCard from "@/components/ui/market/carCard"
import SearchBar from "@/components/ui/market/searchBar"
import carImage from "@/../public/electric-car1.png"
import Link from "next/link"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import Layout from "@/components/ui/layout"

export default function () {
    // Пример массива машин для отображения
    const cars = new Array(15).fill(null).map((_, index) => ({
        id: index,
        title: "Toyota Camry New",
        subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
        mileage: 20,
        fuelType: "Petrol",
        transmission: "Automatic",
        imageUrl: carImage,
    }));

    return (
        <div>
            <SearchBar />
            <Layout>
                <div className="catalog-container">
                    {cars.map((car) => (
                        <CarCard
                            key={car.id}
                            imageUrl={car.imageUrl}
                            title={car.title}
                            subtitle={car.subtitle}
                            mileage={car.mileage}
                            fuelType={car.fuelType}
                            transmission={car.transmission}
                        />
                    ))}
                </div>
            </Layout>
        </div>
    )
}
