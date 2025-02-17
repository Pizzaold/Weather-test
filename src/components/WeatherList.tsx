import { FC } from 'react';
import { City } from '../types';
import './WeatherList.css';
import WeatherCard from './WeatherCard';

interface WeatherListProps {
  selected: City | null;
}

export const WeatherList: FC<WeatherListProps> = ({ selected }) => {
  return (
    <div data-testid="my-weather-list" className="weather-list">
      {selected && (
        <div key={`${selected.lat}-${selected.lon}`} className="weather-item">
          <WeatherCard key={`${selected.lat}-${selected.lon}`} city={selected}/>
        </div>
      )}
    </div>
  );
}; 