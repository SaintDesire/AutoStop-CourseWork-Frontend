import CarCard from "@/components/ui/market/carCard"
import SearchBar from "@/components/ui/market/searchBar"
import carImage from "@/../public/electric-car1.png"
import Link from "next/link"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"

export default function () {
    return (
        <div>
            <SearchBar/>        
            <div>
                <CarCard
                    imageUrl={carImage}
                    title="Toyota Camry New"
                    subtitle="3.5 D5 PowerPulse Momentum 5dr AW..."
                    mileage={20}
                    fuelType="Petrol"
                    transmission="Automatic"
                    />
            </div>
        </div>
    )
}