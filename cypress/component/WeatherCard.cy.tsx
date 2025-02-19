import React from 'react';
import  WeatherCard from '../../src/components/WeatherCard';

describe('WeatherCard Component', () => {
  const mockCity = {
    name: "Tartu",
    country: "EE",
    lat: 58.3801207,
    lon: 26.72245
  };

  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://api.openweathermap.org/data/2.5/weather*',
      {
        statusCode: 200,
        body: {
          main: { temp: 265.77 },
          weather: [{ main: 'Clouds' }]
        }
      }
    ).as('getWeather');
  });

  it('renders city name', () => {
    cy.mount(<WeatherCard city={mockCity} />);
    cy.get('h2').should('contain', 'Tartu');
  });

  it('renders weather data after API call', () => {
    cy.mount(<WeatherCard city={mockCity} />);
    
    cy.wait('@getWeather');
    cy.get('.temperature').should('contain', '-7°C');
    cy.get('.weather-type').should('contain', 'Clouds');
  });
}); 