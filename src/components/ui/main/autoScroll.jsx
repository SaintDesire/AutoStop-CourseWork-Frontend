"use client";
import React, { useRef } from 'react';

const AutoScroll = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      <h2>Explore All Vehicles</h2>
      <div className="tabs">
        <span className="tab active">In Stock</span>
        <span className="tab">New Cars</span>
        <span className="tab">Used Cars</span>
        <span className="view-all">View All →</span>
      </div>

      {/* Прокрутка */}
      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div className="carousel" ref={scrollContainerRef}>
          <div className="card">
            <img src="/car1.jpg" alt="Car 1" />
            <div className="card-content">
              <h3>Ford Transit – 2021</h3>
              <p>2500 Miles | Diesel | Manual</p>
              <span className="price">$22,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car2.jpg" alt="Car 2" />
            <div className="card-content">
              <h3>New GLC – 2023</h3>
              <p>50 Miles | Petrol | Automatic</p>
              <span className="price">$95,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car3.jpg" alt="Car 3" />
            <div className="card-content">
              <h3>Audi A6 3.5 – New</h3>
              <p>100 Miles | Petrol | Automatic</p>
              <span className="price">$58,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car4.jpg" alt="Car 4" />
            <div className="card-content">
              <h3>Corolla Altis – 2023</h3>
              <p>15000 Miles | Petrol | CVT</p>
              <span className="price">$45,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car5.jpg" alt="Car 5" />
            <div className="card-content">
              <h3>Ford Explorer 2023</h3>
              <p>10 Miles | Diesel | Automatic</p>
              <span className="price">$35,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car5.jpg" alt="Car 5" />
            <div className="card-content">
              <h3>Ford Explorer 2023</h3>
              <p>10 Miles | Diesel | Automatic</p>
              <span className="price">$35,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car5.jpg" alt="Car 5" />
            <div className="card-content">
              <h3>Ford Explorer 2023</h3>
              <p>10 Miles | Diesel | Automatic</p>
              <span className="price">$35,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car5.jpg" alt="Car 5" />
            <div className="card-content">
              <h3>Ford Explorer 2023</h3>
              <p>10 Miles | Diesel | Automatic</p>
              <span className="price">$35,000</span>
            </div>
          </div>
          <div className="card">
            <img src="/car5.jpg" alt="Car 5" />
            <div className="card-content">
              <h3>Ford Explorer 2023</h3>
              <p>10 Miles | Diesel | Automatic</p>
              <span className="price">$35,000</span>
            </div>
          </div>
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
};

export default AutoScroll;
