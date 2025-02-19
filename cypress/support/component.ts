/// <reference types="cypress" />
import './commands';
import { mount } from '@cypress/react18';
import React from 'react';
import '../../src/index.css';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount);

window.React = React; 