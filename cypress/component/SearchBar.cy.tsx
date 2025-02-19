import React from 'react';
import { SearchBar } from '../../src/components/SearchBar';

describe('SearchBar Component', () => {
  it('renders input and button', () => {
    cy.mount(
      <SearchBar 
        query="" 
        setQuery={cy.stub().as('setQuery')} 
        onSearch={cy.stub().as('onSearch')} 
      />
    );

    cy.get('[data-testid="search-input"]').should('be.visible');
    cy.get('[data-testid="search-button"]').should('be.visible');
  });

  it('updates query on input change', () => {
    const setQuery = cy.stub().as('setQuery');
    cy.mount(
      <SearchBar 
        query="" 
        setQuery={setQuery} 
        onSearch={cy.stub().as('onSearch')} 
      />
    );

    cy.get('[data-testid="search-input"]')
      .type('Tartu');
    
    // Verify that setQuery was called with each character
    cy.get('@setQuery').should('have.been.calledWith', 'T');
    cy.get('@setQuery').should('have.been.calledWith', 'a');
    cy.get('@setQuery').should('have.been.calledWith', 'r');
    cy.get('@setQuery').should('have.been.calledWith', 't');
    cy.get('@setQuery').should('have.been.calledWith', 'u');
  });

  it('calls onSearch when button is clicked', () => {
    cy.mount(
      <SearchBar 
        query="Tartu" 
        setQuery={cy.stub().as('setQuery')} 
        onSearch={cy.stub().as('onSearch')} 
      />
    );

    cy.get('[data-testid="search-button"]')
      .click()
      .get('@onSearch')
      .should('have.been.called');
  });
}); 