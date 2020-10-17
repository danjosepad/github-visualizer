/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/// <reference types="cypress" />

describe('Home', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should add organization', () => {
    cy.findByTestId('#orgNameInput').type('Facebook');
    cy.findByTestId('#logoContent').get('button').click()
    cy.findByTestId('#orgNameInput').clear()

    cy.findByText('Facebook').should('exist')
  })

  it('should remove organization', () => {
    cy.findByTestId('#organizationContent').get('button').eq(1).click()
    cy.findByText('Facebook').should('not.exist')
  })
})

describe('Access organization page', () => {
  it('should add and access organization', () => {
    cy.findByTestId('#orgNameInput').type('Facebook');
    cy.findByTestId('#logoContent').get('button').click()

    cy.findByText('Facebook').should('exist')
    cy.findByText('Facebook').click()
    cy.url().should('include', '/facebook');

    // Validate if new search of organization page appears
    cy.findByPlaceholderText('Buscar repositórios').should('exist')
  })

  it('Load more repositories', () => {
    cy.findByText('Carregar').click()
    cy.findAllByTestId('#repositoryContent').should('have.length', 10)
  })
})

describe('Search for an specific repository', () => {
  it('should successfully search for an repository', () => {
    cy.findByTestId('#repoNameInput').type('codemod');
    cy.findByTestId('#formWrapper').find('button').click();
  })

  it('should clear search bar and show repositories', () => {
    // Due to the nature of clear function, we should wait a little bit
    // just to make sure everything on promise would be fine
    // Not the necessary, but better safe than sorry
    cy.wait(750)
    cy.findByTestId('#repoNameInput').clear();
    cy.findAllByTestId('#repositoryContent').should('have.length', 5)
  })

  it('should redirect back from home', () => {
    cy.findByTestId('#redirectButtonBack').click();
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

describe('Redirect to an wrong organization', () => {
  it('should appear an 404 message on wrong redirect', () => {
    cy.visit('http://localhost:3000/Testingqoa');
    cy.findByText('A página que procura não foi encontrada').should('exist');
  })

  it('should redirect back to home page', () => {
    cy.findByTestId('#redirectButtonBack').click();
    cy.url().should('eq', 'http://localhost:3000/')
  })
})