import { FC } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text" 
        value={query}
        data-testid="search-input" 
        onChange={handleSearch} 
      />
      <button 
        className="search-button"
        data-testid="search-button" 
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}; 