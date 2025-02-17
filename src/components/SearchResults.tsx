import { FC } from 'react';
import { City } from '../types';
import './SearchResults.css';

interface SearchResultsProps {
  searchResult: City[];
  onCitySelect: (city: City) => void;
}

export const SearchResults: FC<SearchResultsProps> = ({ searchResult, onCitySelect }) => {
  return (
    <div className="search-results">
      {searchResult.map((city) => (
        <div 
          key={`${city.lat}-${city.lon}`} 
          className="city-item"
          onClick={() => onCitySelect(city)}
        >
          <h2>{city.name}</h2>
          <p>{city.name}, {city.lat}, {city.lon}</p>
        </div>
      ))}
    </div>
  );
}; 