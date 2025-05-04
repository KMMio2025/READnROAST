// frontend/src/components/ShopFilters/index.tsx
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

interface ShopFiltersProps {
  items: ShopItem[];
  onFilteredItems: (filteredItems: ShopItem[]) => void;
}

const ShopFilters = ({ items, onFilteredItems }: ShopFiltersProps) => {
  const [activeType, setActiveType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtry kawy
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedFlavour, setSelectedFlavour] = useState<string>('all');
  const [selectedAroma, setSelectedAroma] = useState<string>('all');
  const [selectedAcidity, setSelectedAcidity] = useState<string>('all');
  const [selectedMix, setSelectedMix] = useState<string>('all');

  // Filtry książek
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

    // Filtrowanie po typie
    if (activeType !== 'all') {
      filtered = filtered.filter(item => item.type === activeType);
    }

    // Filtry dla kawy
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

    // Filtry dla książek
    if (activeType === 'book' || activeType === 'all') {
      if (selectedGenre !== 'all') {
        filtered = filtered.filter(item => item.type === 'book' && item.genre === selectedGenre);
      }
      if (selectedLanguage !== 'all') {
        filtered = filtered.filter(item => item.type === 'book' && item.language === selectedLanguage);
      }
    }

    // Wyszukiwanie
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }

    // Sortowanie
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
        'LIGHT': 'Jasne',
        'MEDIUM': 'Średnie',
        'DARK': 'Ciemne'
      },
      Flavour: {
        'FRUITY': 'Owocowy',
        'CHOCOLATE': 'Czekoladowy',
        'NUTTY': 'Orzechowy'
      },
      Aroma: {
        'FLORAL': 'Kwiatowy',
        'SPICY': 'Korzenny',
        'SWEET': 'Słodki'
      },
      Acidity: {
        'LOW': 'Niska',
        'MEDIUM': 'Średnia',
        'HIGH': 'Wysoka'
      },
      Mix: {
        'ARABICA': 'Arabica',
        'ROBUSTA': 'Robusta'
      },
      Language: {
        'POLISH': 'Polski',
        'SPANISH': 'Hiszpański',
        'FRENCH': 'Francuski',
        'ENGLISH': 'Angielski'
      },
      Genre: {
        'FANTASY': 'Fantasy',
        'SCIENCE_FICTION': 'Sci-Fi',
        'THRILLER': 'Thriller',
        'ROMANCE': 'Romans',
        'MYSTERY': 'Mystery',
        'ACTION_ADVENTURE': 'Akcja/Przygoda',
        'HORROR': 'Horror',
        'HISTORICAL_FICTION': 'Historyczny',
        'BIOGRAPHY': 'Biografia',
        'CRIME': 'Kryminał',
        'CLASSICS': 'Klasyka'
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
          placeholder="Wyszukaj produkty..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
            {type === 'all' ? 'Wszystko' : type === 'coffee' ? 'Kawy' : 'Książki'}
          </button>
        ))}
      </div>

      {(activeType === 'coffee' || activeType === 'all') && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Filtry kawy:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {renderSelect(selectedRoast, setSelectedRoast, Roast, 'Roast', 'Rodzaj palenia')}
            {renderSelect(selectedFlavour, setSelectedFlavour, Flavour, 'Flavour', 'Smak')}
            {renderSelect(selectedAroma, setSelectedAroma, Aroma, 'Aroma', 'Aromat')}
            {renderSelect(selectedAcidity, setSelectedAcidity, Acidity, 'Acidity', 'Kwasowość')}
            {renderSelect(selectedMix, setSelectedMix, Mix, 'Mix', 'Mieszanka')}
          </div>
        </div>
      )}

      {(activeType === 'book' || activeType === 'all') && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Filtry książek:</h3>
          <div className="grid grid-cols-2 gap-3">
            {renderSelect(selectedGenre, setSelectedGenre, Genre, 'Genre', 'Gatunek')}
            {renderSelect(selectedLanguage, setSelectedLanguage, Language, 'Language', 'Język')}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <select
          className="p-2 border border-gray-300 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Domyślnie</option>
          <option value="name-asc">Nazwa (A-Z)</option>
          <option value="name-desc">Nazwa (Z-A)</option>
          <option value="price-asc">Cena (rosnąco)</option>
          <option value="price-desc">Cena (malejąco)</option>
        </select>
      </div>
    </div>
  );
};

export default ShopFilters;