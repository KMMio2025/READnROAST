import { useState, useEffect } from 'react';
import { ShopItem } from '../../types/shopTypes';
import React from 'react';
import {
  Acidity,
  Aroma,
  Flavour,
  Genre,
  Language,
  Mix,
  Roast
} from '../../types/enums';

import {
  FiltersContainer,
  SearchbarContainer,
  FiltersGrid,
  FilterSelect,
  SortContainer
} from './filtersStyles.js';  

interface ShopFiltersProps {
  items: ShopItem[];
  onFilteredItems: (filteredItems: ShopItem[]) => void;
}


const ShopFilters = ({ items, onFilteredItems }: ShopFiltersProps) => {
  const [activeType, setActiveType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // coffee filters
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedFlavour, setSelectedFlavour] = useState<string>('all');
  const [selectedAroma, setSelectedAroma] = useState<string>('all');
  const [selectedAcidity, setSelectedAcidity] = useState<string>('all');
  const [selectedMix, setSelectedMix] = useState<string>('all');

  // book filters
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const itemTypes = ['all', 'coffee', 'book'];

  useEffect(() => {
    applyFilters();
  }, [
    activeType, sortBy, searchQuery,
    selectedRoast, selectedFlavour, selectedAroma, selectedAcidity, selectedMix,
    selectedGenre, selectedLanguage
  ]);

  const applyFilters = () => {
    let filtered = [...items];

    // Filtering by type (coffee or book)
    if (activeType !== 'all') {
      filtered = filtered.filter(item => item.type === activeType);
    }

    // Coffee filters
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

    // Book filters
    if (activeType === 'book' || activeType === 'all') {
      if (selectedGenre !== 'all') {
        filtered = filtered.filter(item => item.type === 'book' && item.genre === selectedGenre);
      }
      if (selectedLanguage !== 'all') {
        filtered = filtered.filter(item => item.type === 'book' && item.language === selectedLanguage);
      }
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) || (item.type === 'book' && item.author.toLowerCase().includes(query))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case 'price-desc':
        filtered.sort((a, b) => getPrice(b) - getPrice(a));
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
        'LIGHT': 'Light',
        'MEDIUM': 'Medium',
        'DARK': 'Dark'
      },
      Flavour: {
        'FRUITY': 'Fruity',
        'CHOCOLATE': 'Chocolate',
        'NUTTY': 'Nutty'
      },
      Aroma: {
        'FLORAL': 'Floral',
        'SPICY': 'Spicy',
        'SWEET': 'Sweet'
      },
      Acidity: {
        'LOW': 'Low',
        'MEDIUM': 'Medium',
        'HIGH': 'High'
      },
      Mix: {
        'ARABICA': 'Arabica',
        'ROBUSTA': 'Robusta'
      },
      Language: {
        'POLISH': 'Polish',
        'SPANISH': 'Spanish',
        'FRENCH': 'French',
        'ENGLISH': 'English'
      },
      Genre: {
        'FANTASY': 'Fantasy',
        'SCIENCE_FICTION': 'Science Fiction',
        'THRILLER': 'Thriller',
        'ROMANCE': 'Romance',
        'MYSTERY': 'Mystery',
        'ACTION_ADVENTURE': 'Action/Adventure',
        'HORROR': 'Horror',
        'HISTORICAL_FICTION': 'Historical Fiction',
        'BIOGRAPHY': 'Biography',
        'CRIME': 'Crime',
        'CLASSICS': 'Classics'
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
    <FilterSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">{placeholder}</option>
      {Object.values(enumValues).map((val: any) => (
        <option key={val} value={val}>
          {translateEnumValue(val, enumType)}
        </option>
      ))}
    </FilterSelect>
  );

  return (
    <FiltersContainer>
      <SearchbarContainer>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchbarContainer>

      <div className="flex flex-wrap gap-2 mb-4">
        {itemTypes.map(type => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full text-sm ${
              activeType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type === 'all' ? 'All' : type === 'coffee' ? 'Coffee' : 'Books'}
          </button>
        ))}
      </div>

      {(activeType === 'coffee' || activeType === 'all') && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Coffee Filters:</h3>
          <FiltersGrid>
            {renderSelect(selectedRoast, setSelectedRoast, Roast, 'Roast', 'Roast Type')}
            {renderSelect(selectedFlavour, setSelectedFlavour, Flavour, 'Flavour', 'Flavour')}
            {renderSelect(selectedAroma, setSelectedAroma, Aroma, 'Aroma', 'Aroma')}
            {renderSelect(selectedAcidity, setSelectedAcidity, Acidity, 'Acidity', 'Acidity')}
            {renderSelect(selectedMix, setSelectedMix, Mix, 'Mix', 'Coffee Mix')}
          </FiltersGrid>
        </div>
      )}

      {(activeType === 'book' || activeType === 'all') && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Book Filters:</h3>
          <FiltersGrid>
            {renderSelect(selectedGenre, setSelectedGenre, Genre, 'Genre', 'Genre')}
            {renderSelect(selectedLanguage, setSelectedLanguage, Language, 'Language', 'Language')}
          </FiltersGrid>
        </div>
      )}

      <SortContainer>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort By Default</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </SortContainer>
    </FiltersContainer>
  );
};

export default ShopFilters;
