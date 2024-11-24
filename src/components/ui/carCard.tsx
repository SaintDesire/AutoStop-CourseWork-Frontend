"use client"

type Car = {
    id: number,
    name: string,
    engine: string,
    price: string,
    image: string,
}

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const handleClick = () => {
        alert(`Подробнее о ${car.name}`);
    };

    return (
        <div className="car-card">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-content">
                <h3 className="car-title">{car.name}</h3>
                <p className="car-text">Двигатель: {car.engine}</p>
                <p className="car-text">Цена: {car.price}</p>
                <button
                    className="car-button"
                    onClick={handleClick}
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}
export default CarCard;