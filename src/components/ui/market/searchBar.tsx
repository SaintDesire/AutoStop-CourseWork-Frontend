'use client';

import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface FilterState {
  condition: string;
  make: string;
  model: string;
  price: string;
  year: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
}

interface SearchBarProps {
  onSearch: (filters: FilterState) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    condition: '',
    make: '',
    model: '',
    price: '',
    year: '',
    bodyType: '',
    fuelType: '',
    transmission: '',
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      condition: '',
      make: '',
      model: '',
      price: '',
      year: '',
      bodyType: '',
      fuelType: '',
      transmission: '',
    });
    onSearch({
      condition: '',
      make: '',
      model: '',
      price: '',
      year: '',
      bodyType: '',
      fuelType: '',
      transmission: '',
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="bg-[#0a0b14] p-4 flex flex-col items-center justify-center mb-8 mt-8">
      <div className={`flex flex-col w-full max-w-5xl transition-all duration-300 ease-in-out ${isFiltersOpen ? 'bg-white rounded-3xl p-6' : ''}`}>
        <div className="flex flex-wrap items-center gap-2 bg-white rounded-full p-2 w-full">
          {/* Condition Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => toggleDropdown('condition')}
            >
              <span>{filters.condition || 'Condition'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {openDropdown === 'condition' && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {['New', 'Used'].map((item) => (
                  <button
                    key={item}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      handleFilterChange('condition', item);
                      setOpenDropdown(null);
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
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              placeholder="Any Makes"
              className="w-[140px] px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Models Input */}
          <div className="relative">
            <input
              type="text"
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              placeholder="Any Models"
              className="w-[140px] px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Prices Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => toggleDropdown('price')}
            >
              <span>{filters.price || 'All Prices'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {openDropdown === 'price' && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {['$0 - $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '$30,000+'].map((item) => (
                  <button
                    key={item}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      handleFilterChange('price', item);
                      setOpenDropdown(null);
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
          
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 ml-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
          >
            Reset
          </button>

          {/* Find Listing Button */}
          <button
            onClick={handleSearch}
            className="ml-auto flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
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
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                onBlur={() => {
                  const value = parseInt(filters.year, 10);
                  if (!isNaN(value)) {
                    if (value < 1900) {
                      handleFilterChange('year', '1900');
                    } else if (value > 2025) {
                      handleFilterChange('year', '2025');
                    }
                  } else {
                    handleFilterChange('year', '');
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
                  onClick={() => toggleDropdown('bodyType')}
                >
                  <span>{filters.bodyType || 'Any Type'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {openDropdown === 'bodyType' && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {['Sedan', 'SUV', 'Truck', 'Van', 'Coupe'].map((item) => (
                      <button
                        key={item}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          handleFilterChange('bodyType', item);
                          setOpenDropdown(null);
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
                  onClick={() => toggleDropdown('fuelType')}
                >
                  <span>{filters.fuelType || 'Any Fuel'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {openDropdown === 'fuelType' && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {['Gasoline', 'Diesel', 'Electric', 'Hybrid'].map((item) => (
                      <button
                        key={item}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          handleFilterChange('fuelType', item);
                          setOpenDropdown(null);
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
                  onClick={() => toggleDropdown('transmission')}
                >
                  <span>{filters.transmission || 'Any Transmission'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {openDropdown === 'transmission' && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {['Automatic', 'Manual'].map((item) => (
                      <button
                        key={item}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          handleFilterChange('transmission', item);
                          setOpenDropdown(null);
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

