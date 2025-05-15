import styled from 'styled-components';

export const FiltersContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px #6f4e37;
  margin-bottom: 20px;
`;

export const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  
  input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #ddd;
    border-radius: 25px;
    font-size: 14px;
    transition: all 0.3s ease;
    outline: none;
    
    &:focus {
      border-color: #6f4e37;
      box-shadow: 0 0 0 3px rgba(111, 78, 55, 0.2);
    }
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterSelect = styled.select`
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  
  &:hover {
    border-color: #b3a295;
  }
  
  &:focus {
    border-color: #6f4e37;
    box-shadow: 0 0 0 3px rgba(111, 78, 55, 0.2);
    outline: none;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  
  select {
    padding: 10px 35px 10px 15px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    appearance: none;
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
    
    &:hover {
      border-color: #b3a295;
    }
    
    &:focus {
      border-color: #6f4e37;
      box-shadow: 0 0 0 3px rgba(111, 78, 55, 0.2);
      outline: none;
    }
  }
`;