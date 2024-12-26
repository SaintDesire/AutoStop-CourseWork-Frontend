'use client';

import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar() {
  const [condition, setCondition] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Additional filter states
  const [year, setYear] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');

  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBodyTypeOpen, setIsBodyTypeOpen] = useState(false);
  const [isFuelTypeOpen, setIsFuelTypeOpen] = useState(false);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);

  return (
    <div className="bg-[#0a0b14] p-4 flex flex-col items-center justify-center mb-8 mt-8">
      <div className={`flex flex-col w-full max-w-5xl transition-all duration-300 ease-in-out ${isFiltersOpen ? 'bg-white rounded-3xl p-6' : ''}`}>
        <div className="flex items-center gap-2 bg-white rounded-full p-2 w-full">
          {/* Condition Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsConditionOpen(!isConditionOpen)}
            >
              <span>{condition || 'Condition'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {isConditionOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {['New', 'Used'].map((item) => (
                  <button
                    key={item}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      setCondition(item);
                      setIsConditionOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Makes Input */}
          <div className="relative">
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              placeholder="Any Makes"
              className="w-[140px] px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Models Input */}
          <div className="relative">
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Any Models"
              className="w-[140px] px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Prices Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsPriceOpen(!isPriceOpen)}
            >
              <span>{price || 'All Prices'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {isPriceOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {['$0 - $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '$30,000+'].map((item) => (
                  <button
                    key={item}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      setPrice(item);
                      setIsPriceOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* More Filters Button */}
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md"
          >
            {isFiltersOpen ? (
              <X className="w-4 h-4 mr-2" />
            ) : (
              <SlidersHorizontal className="w-4 h-4 mr-2" />
            )}
            {isFiltersOpen ? 'Close Filters' : 'More Filters'}
          </button>

          {/* Find Listing Button */}
          <button className="ml-auto flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            <Search className="w-4 h-4 mr-2" />
            Find Listing
          </button>
        </div>

        {/* Additional Filters Section */}
        {isFiltersOpen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            {/* Year Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onBlur={() => {
                  const value = parseInt(year, 10);
                  if (!isNaN(value)) {
                    if (value < 1900) {
                      setYear('1900');
                    } else if (value > 2025) {
                      setYear('2025');
                    } else {
                      setYear(value.toString());
                    }
                  } else {
                    setYear('');
                  }
                }}
                placeholder="Any Year"
                className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Body Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Body Type</label>
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50"
                  onClick={() => setIsBodyTypeOpen(!isBodyTypeOpen)}
                >
                  <span>{bodyType || 'Any Type'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {isBodyTypeOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {['Sedan', 'SUV', 'Truck', 'Van', 'Coupe'].map((item) => (
                      <button
                        key={item}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          setBodyType(item);
                          setIsBodyTypeOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50"
                  onClick={() => setIsFuelTypeOpen(!isFuelTypeOpen)}
                >
                  <span>{fuelType || 'Any Fuel'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {isFuelTypeOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {['Gasoline', 'Diesel', 'Electric', 'Hybrid'].map((item) => (
                      <button
                        key={item}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          setFuelType(item);
                          setIsFuelTypeOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Transmission</label>
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50"
                  onClick={() => setIsTransmissionOpen(!isTransmissionOpen)}
                >
                  <span>{transmission || 'Any Transmission'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {isTransmissionOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg ">
                    {['Automatic', 'Manual', 'CVT'].map((item) => (
                      <button
                        key={item}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          setTransmission(item);
                          setIsTransmissionOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
