import React, { useState, useEffect } from 'react';
import { Genre, Language } from '../../types/enums';

import {
  FiltersContainer,
  SearchbarContainer,
  FiltersGrid,
  FilterSelect,
  SortContainer
} from './filtersStyles';  // Adjust import path as needed

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
    <FilterSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">{placeholder}</option>
      {Object.values(enumValues).map(val => (
        <option key={val} value={val}>
          {val.replace(/_/g, ' ')}
        </option>
      ))}
    </FilterSelect>
  );

  return (
    <FiltersContainer>
      <SearchbarContainer>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchbarContainer>

      <div>
        <FiltersGrid>
          {renderSelect(selectedGenre, setSelectedGenre, Genre, 'Select genre')}
          {renderSelect(selectedLanguage, setSelectedLanguage, Language, 'Select language')}
        </FiltersGrid>
      </div>

      <SortContainer>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </SortContainer>
    </FiltersContainer>
  );
};

export default ShopFilters;
