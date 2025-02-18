/// <reference types="cypress" />

describe('Weather App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the app title', () => {
    cy.contains('h1', 'Weather App').should('be.visible');
  });

  it('shows city search result', () => {
    cy.get('[data-testid="search-input"]').type('Tartu');
    cy.get('[data-testid="search-button"]').click();

    cy.get('.city-item').should('have.length', 2);
    cy.contains('.city-item', 'Tartu').should('be.visible');
  });

  it('adds search result to the weather list', () => {
    cy.get('[data-testid="search-input"]').type('Tartu');
    cy.get('[data-testid="search-button"]').click();

    cy.get('.city-item').first().click();

    cy.get('[data-testid="my-weather-list"]')
      .find('.weather-card')
      .should('be.visible')
      .within(() => {
        cy.contains('h2', 'Tartu').should('be.visible');
        cy.get('.temperature').should('be.visible');
        cy.get('.weather-type').should('be.visible');
      });

    cy.get('.city-item').should('not.exist');
  });
});
