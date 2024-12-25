'use client';

import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

interface FilterOptions {
  brands: string[];
  models: { [brand: string]: string[] };
  years: string[];
  mpgRanges: string[];
  carClasses: string[];
  cylinderOptions: string[];
  displacementRanges: string[];
  driveOptions: string[];
  fuelTypes: string[];
  transmissionTypes: string[];
}

interface SearchBarProps {
  filterOptions: FilterOptions;
  onFilterChange: (filters: any) => void; // вызывется, когда локальные фильтры изменились
  onApplyFilters: () => void;            // вызываем, чтобы родитель применил фильтры
}

export default function SearchBar({
  filterOptions,
  onFilterChange,
  onApplyFilters,
}: SearchBarProps) {
  // 1) ЛОКАЛЬНОЕ СОСТОЯНИЕ
  const [localFilters, setLocalFilters] = useState({
    brand: '',
    model: '',
    year: '',
    cityMpg: '',
    carClass: '',
    cylinders: '',
    displacement: '',
    drive: '',
    fuelType: '',
    transmission: '',
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрыть дропдауны, если клик вне блока
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * 2) После каждого ОБНОВЛЕНИЯ localFilters
   *    оповещаем родителя (CatalogPage) — но уже ПОСЛЕ рендера SearchBar.
   */
  useEffect(() => {
    onFilterChange(localFilters);
  }, [localFilters, onFilterChange]);

  // Открыть/Закрыть выпадающий список
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  /**
   * 3) Меняем ТОЛЬКО локальный стейт по клику из dropdown
   *    Родитель узнает об изменении через useEffect (чуть позже).
   */
  const handleLocalFilterChange = (key: string, value: string) => {
    setLocalFilters((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'brand') {
        updated.model = '';
      }
      return updated;
    });
    setOpenDropdown(null);
  };

  /**
   * 4) Сброс: очищаем локальные фильтры,
   *    и тут же вызываем "применить" (на уровне родителя) — за 1 клик.
   */
  const handleResetFilters = () => {
    // Пустой объект
    const empty = {
      brand: '',
      model: '',
      year: '',
      cityMpg: '',
      carClass: '',
      cylinders: '',
      displacement: '',
      drive: '',
      fuelType: '',
      transmission: '',
    };
    setLocalFilters(empty);
    // После сброса хотим сразу обновить содержимое (не ждать клика на "Find")
    onApplyFilters();
  };

  return (
    <div className="bg-[#0a0b14] p-4 flex flex-col items-center justify-center mb-8 mt-8">
      <div
        ref={dropdownRef}
        className={`flex flex-col w-full max-w-5xl transition-all duration-300 ease-in-out ${
          isFiltersOpen ? 'bg-white rounded-3xl p-6' : ''
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 bg-white rounded-full p-2 w-full">
          {/* Brand */}
          <div className="relative px-2 flex-1">
            <button
              className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => toggleDropdown('brand')}
            >
              <span>{localFilters.brand || 'Any Brand'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {openDropdown === 'brand' && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {filterOptions.brands.map((item, index) => (
                  <button
                    key={`brand-${index}`}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    onClick={() => handleLocalFilterChange('brand', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Model */}
          <div
            className={`relative px-2 flex-1 ${
              !localFilters.brand ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <button
              className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => localFilters.brand && toggleDropdown('model')}
              disabled={!localFilters.brand}
            >
              <span>{localFilters.model || 'Any Model'}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {openDropdown === 'model' && localFilters.brand && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {filterOptions.models[localFilters.brand]?.map(
                  (item, index) => (
                    <button
                      key={`model-${index}`}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => handleLocalFilterChange('model', item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Кнопки справа */}
          <div className="ml-auto flex items-center gap-2">
            {/* More Filters */}
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

            {/* Reset */}
            <button
              onClick={handleResetFilters}
              className="flex items-center px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
            >
              <X className="w-4 h-4 mr-2" />
              Reset
            </button>

            {/* Find */}
            <button
              className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              onClick={onApplyFilters}
            >
              <Search className="w-4 h-4 mr-2" />
              Find
            </button>
          </div>
        </div>

        {isFiltersOpen && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            {[
              { label: 'Year', key: 'year', options: filterOptions.years },
              { label: 'City MPG', key: 'cityMpg', options: filterOptions.mpgRanges },
              { label: 'Class', key: 'carClass', options: filterOptions.carClasses },
              { label: 'Cylinders', key: 'cylinders', options: filterOptions.cylinderOptions },
              { label: 'Displacement', key: 'displacement', options: filterOptions.displacementRanges },
              { label: 'Drive', key: 'drive', options: filterOptions.driveOptions },
              { label: 'Fuel Type', key: 'fuelType', options: filterOptions.fuelTypes },
              { label: 'Transmission', key: 'transmission', options: filterOptions.transmissionTypes },
            ].map((f, index) => (
              <div key={`filter-${index}`} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {f.label}
                </label>
                <div className="relative">
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50"
                    onClick={() => toggleDropdown(f.key)}
                  >
                    <span>
                      {localFilters[f.key as keyof typeof localFilters] ||
                        `Any ${f.label}`}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  {openDropdown === f.key && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                      {f.options.map((option, optionIndex) => (
                        <button
                          key={`filter-${index}-option-${optionIndex}`}
                          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                          onClick={() =>
                            handleLocalFilterChange(f.key, option)
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
