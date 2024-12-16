export default function () {
    return (
        <div className="home-page">
      {/* Главный блок с изображением и текстом */}
      <section className="hero-section">
        <div className="content">
          <h1>Fast and Easy</h1>
          <p>
            <span>50+</span> Car brands <span>10k+</span> Clients
          </p>
          <div className="search-bar">
            <select>
              <option>Any Makes</option>
            </select>
            <select>
              <option>Any Models</option>
            </select>
            <select>
              <option>All Prices</option>
            </select>
            <button>Search Cars</button>
          </div>
          <div className="filter-buttons">
            <button>SUV</button>
            <button>Sedan</button>
            <button>Hatchback</button>
            <button>Coupe</button>
            <button>Hybrid</button>
          </div>
        </div>
      </section>

      {/* Логотипы */}
      <section className="brands">
        <div className="brand-logo">HONDA</div>
        <div className="brand-logo">JAGUAR</div>
        <div className="brand-logo">VOLVO</div>
        <div className="brand-logo">AUDI</div>
        <div className="brand-logo">ACURA</div>
        <div className="brand-logo">TESLA</div>
      </section>

      {/* Секция автомобилей */}
      <section className="vehicles">
        <h2>Explore All Vehicles</h2>
        <div className="vehicle-list">
          <div className="vehicle-card">
            <img src="/car1.jpg" alt="Car" />
            <h3>Ford Transit - 2021</h3>
            <p>$22,000</p>
          </div>
          <div className="vehicle-card">
            <img src="/car2.jpg" alt="Car" />
            <h3>New GLC - 2023</h3>
            <p>$95,000</p>
          </div>
          <div className="vehicle-card">
            <img src="/car3.jpg" alt="Car" />
            <h3>Audi A6 3.6 - New</h3>
            <p>$58,000</p>
          </div>
        </div>
      </section>

      {/* Блоки предложений */}
      <section className="offers">
        <div className="offer-card">
          <h3>Are You Looking For a Car?</h3>
          <button>Get Started</button>
        </div>
        <div className="offer-card">
          <h3>Do You Want to Sell a Car?</h3>
          <button>Get Started</button>
        </div>
      </section>
    </div>
    )
}