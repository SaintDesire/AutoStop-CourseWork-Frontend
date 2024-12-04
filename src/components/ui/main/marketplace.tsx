interface Listing {
  id: number;
  title: string;
  price: string;
  carImage: string;
}

interface MarketplaceProps {
  listings: Listing[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ listings }) => {
  return (
    <div>
      <h2>Объявления на торговой площадке</h2>
      <div className="marketplace-listings">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-item">
            <img src={listing.carImage} alt={listing.title} />
            <h3>{listing.title}</h3>
            <p>{listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
