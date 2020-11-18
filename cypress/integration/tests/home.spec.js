/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/// <reference types="cypress" />

describe('Home', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should add organization', () => {
    cy.findByPlaceholderText('Adicionar organização').type('Facebook');
    cy.findByTestId('#logoContent').get('button').click();
    cy.findByPlaceholderText('Adicionar organização').clear();

    cy.findByText('Facebook').should('exist');
  });

  it('should remove organization', () => {
    cy.findByRole('button', { name: 'delete repo' }).click();
    cy.findByText('Facebook').should('not.exist');
  });
});

describe('Access organization page', () => {
  it('should add and access organization', () => {
    cy.findByPlaceholderText('Adicionar organização').type('Facebook');
    cy.findByTestId('#logoContent').get('button').click();

    cy.findByText('Facebook').should('exist');
    cy.findByText('Facebook').click();
    cy.url().should('include', '/facebook');

    // Validate if new search of organization page appears
    cy.findByPlaceholderText('Buscar repositórios').should('exist');
  });

  it('Load more repositories', () => {
    cy.findByText('Carregar').click();
    cy.findAllByRole('link', { name: 'repository content' }).should('have.length', 10);
  });
});

describe('Search for an specific repository', () => {
  it('should successfully search for an repository', () => {
    cy.findByRole('textbox', { name: /search repository/i }).type('codemod');
    cy.findByTestId('#formWrapper').find('button').click();
    cy.findAllByRole('link', { name: 'repository content' }).should('have.length', 1);
  });

  it('should redirect back from home', () => {
    cy.findByRole('button', { name: 'redirect back' }).click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('Redirect to an wrong organization', () => {
  it('should appear an 404 message on wrong redirect', () => {
    cy.visit('http://localhost:3000/Testingqoa');
    cy.findByText('A página que procura não foi encontrada').should('exist');
  });

  it('should redirect back to home page', () => {
    cy.findByRole('button', { name: 'redirect back' }).click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
