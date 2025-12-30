/// <reference types="cypress" />

describe('Chat FAQ and Policy Query', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="chat-launcher"]').click();
  });

  it('answers a FAQ item', () => {
    cy.get('[data-testid="faq-item"]').first().click();
    cy.contains('收到您的咨询', { timeout: 10000 }).should('exist');
  });

  it('handles policy lookup flow', () => {
    cy.get('[data-testid="chat-input"]').type('POL-8888');
    cy.get('[data-testid="chat-send"]').click();
    cy.contains('保单号：POL-8888', { timeout: 10000 }).should('exist');
  });
});
