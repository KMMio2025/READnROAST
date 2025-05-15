import React, { useState, useEffect } from 'react';
import { Genre, Language } from '../../types/enums';

const ShopFilters = ({ items, onFilteredItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  useEffect(() => {
    applyFilters();
  }, [searchQuery, sortBy, selectedGenre, selectedLanguage]);

  const applyFilters = () => {
    let filtered = items.filter(item => item.type === 'book');

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(item => item.genre === selectedGenre);
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(item => item.language === selectedLanguage);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.author && item.author.toLowerCase().includes(query))
      );
    }

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

  const getPrice = (item) => {
    return item.price || 0;
  };

  const renderSelect = (
    value,
    onChange,
    enumValues,
    placeholder
  ) => (
    <select
      className="p-2 border border-gray-300 rounded text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">{placeholder}</option>
      {Object.values(enumValues).map(val => (
        <option key={val} value={val}>
          {val.replace(/_/g, ' ')}
        </option>
      ))}
    </select>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Book Filters:</h3>
        <div className="grid grid-cols-2 gap-3">
          {renderSelect(selectedGenre, setSelectedGenre, Genre, 'Select genre')}
          {renderSelect(selectedLanguage, setSelectedLanguage, Language, 'Select language')}
        </div>
      </div>

      <div className="flex justify-end">
        <select
          className="p-2 border border-gray-300 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default ShopFilters;
