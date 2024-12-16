import React from 'react';

const CarCard = ({ image, title, price, mileage, fuelType, transmission, tag }) => {
  return (
    <div className="car-card">
      {/* Верхняя часть: изображение и тег */}
      <div className="card-image">
        <img src={image} alt={title} />
        {tag && <span className="card-tag">{tag}</span>}
        <button className="bookmark-btn">🔖</button>
      </div>

      {/* Основное содержание */}
      <div className="card-content">
        <h3>{title}</h3>
        <p className="car-description">4.0 D5 PowerPulse Momentum 5dr AWD</p>
        <div className="card-details">
          <span>🚗 {mileage}</span>
          <span>⛽ {fuelType}</span>
          <span>⚙️ {transmission}</span>
        </div>
        <div className="card-footer">
          <span className="price">${price}</span>
          <a href="#" className="view-details">View Details ↗</a>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
