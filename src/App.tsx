import createMockServer from './createMockServer';
import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { WeatherList } from './components/WeatherList';
import { City } from './types';
import './App.css';

// Only create mock server in development or test environment
if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
  createMockServer();
}

function App() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<City[]>([]);
  const [selected, setSelected] = useState<City | null>(null);

  const handleSearchButtonClick = async () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.API_KEY}`)
      .then((result) => result.json())
      .then((cities) => {
        setSearchResult(cities.map((city: any) => ({
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
        })));
      });
  };

  const selectCity = (city: City) => {
    setSelected(city);
    setSearchResult([]);
    setQuery('');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather App</h1>
      </header>
      <main className="app-content">
        <SearchBar 
          query={query}
          setQuery={setQuery}
          onSearch={handleSearchButtonClick}
        />
        <SearchResults 
          searchResult={searchResult}
          onCitySelect={selectCity}
        />
        <WeatherList selected={selected} />
      </main>
    </div>
  );
}

export default App;
