
import { useState, useEffect } from 'react';
import { ShopItem } from '../../types/shopTypes';
import React from 'react';
import { 
    FiltersContainer,
    SearchbarContainer,
    FiltersGrid,
    FilterSelect,
    SortContainer
  } from './filtersStyles'; 
  
import {
    Acidity,
    Aroma,
    Flavour,
    Mix,
    Roast
  } from '../../types/enums';

interface CoffeeFiltersProps {
  items: ShopItem[];
  onFilteredItems: (filteredItems: ShopItem[]) => void;
}

const CoffeeFilters = ({ items, onFilteredItems }: CoffeeFiltersProps) => {
  const [activeType, setActiveType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // coffeee
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedFlavour, setSelectedFlavour] = useState<string>('all');
  const [selectedAroma, setSelectedAroma] = useState<string>('all');
  const [selectedAcidity, setSelectedAcidity] = useState<string>('all');
  const [selectedMix, setSelectedMix] = useState<string>('all');



  useEffect(() => {
    applyFilters();
  }, [
    activeType, sortBy, searchQuery,
    selectedRoast, selectedFlavour, selectedAroma, selectedAcidity, selectedMix,
  ]);

  const applyFilters = () => {
    let filtered = [...items];

    if (activeType !== 'all') {
      filtered = filtered.filter(item => item.type === activeType);
    }

    if (activeType === 'coffee' || activeType === 'all') {
      if (selectedRoast !== 'all') {
        filtered = filtered.filter(item => item.type === 'coffee' && item.roast === selectedRoast);
      }
      if (selectedFlavour !== 'all') {
        filtered = filtered.filter(item => item.type === 'coffee' && item.flavour === selectedFlavour);
      }
      if (selectedAroma !== 'all') {
        filtered = filtered.filter(item => item.type === 'coffee' && item.aroma === selectedAroma);
      }
      if (selectedAcidity !== 'all') {
        filtered = filtered.filter(item => item.type === 'coffee' && item.acidity === selectedAcidity);
      }
      if (selectedMix !== 'all') {
        filtered = filtered.filter(item => item.type === 'coffee' && item.mix === selectedMix);
      }
    }

    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) 
      );
    }

    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    onFilteredItems(filtered);
  };

  const getPrice = (item: ShopItem): number => {
    if (item.type === 'coffee') {
      return item.prices?.[0] || 0;
    }
    return (item as any).price || 0;
  };

  const translateEnumValue = (value: string, enumType: string): string => {
    const translations: Record<string, Record<string, string>> = {
      Roast: {
        'LIGHT': 'LIGHT',
        'MEDIUM': 'MEDIUM',
        'DARK': 'DARK'
      },
      Flavour: {
        'FRUITY': 'FRUITY',
        'CHOCOLATE': 'CHOCOLATE',
        'NUTTY': 'NUTTY'
      },
      Aroma: {
        'FLORAL': 'FLORAL',
        'SPICY': 'SPICY',
        'SWEET': 'SWEET'
      },
      Acidity: {
        'LOW': 'LOW',
        'MEDIUM': 'MEDIUM',
        'HIGH': 'HIGH'
      },
      Mix: {
        'ARABICA': 'ARABICA',
        'ROBUSTA': 'ROBUSTA'
      },
      Language: {
        'POLISH': 'POLISH',
        'SPANISH': 'SPANISH',
        'FRENCH': 'FRENCH',
        'ENGLISH': 'ENGLISH'
      },
      Genre: {
        'FANTASY': 'FANTASY',
        'SCIENCE_FICTION': 'SCIENCE_FICTION',
        'THRILLER': 'THRILLER',
        'ROMANCE': 'ROMANCE',
        'MYSTERY': 'MYSTERY',
        'ACTION_ADVENTURE': 'ACTION_ADVENTURE',
        'HORROR': 'HORROR',
        'HISTORICAL_FICTION': 'HISTORICAL_FICTION',
        'BIOGRAPHY': 'BIOGRAPHY',
        'CRIME': 'CRIME',
        'CLASSICS': 'CLASSICS'
      }
    };

    return translations[enumType]?.[value] || value;
  };

  const renderSelect = (
    value: string,
    onChange: (value: string) => void,
    enumValues: any,
    enumType: string,
    placeholder: string
  ) => (
    <select
      className="p-2 border border-gray-300 rounded text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">{placeholder}</option>
      {Object.values(enumValues).map((val: any) => (
        <option key={val} value={val}>
          {translateEnumValue(val, enumType)}
        </option>
      ))}
    </select>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {(activeType === 'coffee' || activeType === 'all') && (
        <div className="mb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {renderSelect(selectedRoast, setSelectedRoast, Roast, 'Roast', 'Roast')}
            {renderSelect(selectedFlavour, setSelectedFlavour, Flavour, 'Flavour', 'Flavour')}
            {renderSelect(selectedAroma, setSelectedAroma, Aroma, 'Aroma', 'Aroma')}
            {renderSelect(selectedAcidity, setSelectedAcidity, Acidity, 'Acidity', 'Acidity')}
            {renderSelect(selectedMix, setSelectedMix, Mix, 'Mix', 'Mix')}
          </div>
        </div>
      )}


      <div className="flex justify-end">
        <select
          className="p-2 border border-gray-300 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">...</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default CoffeeFilters;