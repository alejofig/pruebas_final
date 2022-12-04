// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from "@faker-js/faker";

Cypress.Commands.add(
  "goIntoSettings",
  (settings, feature = "general", ghost_version = "new") => {
    if (ghost_version === "new") {
      cy.get('.gh-nav-bottom a[href="#/settings/"]').click();
      cy.get('.gh-main a[href="#/settings/' + settings + '/"]').click();
      cy.wait(1000);
      cy.screenshot(
        `images/cypress/${feature}_${ghost_version}/navigate_ghost_settings_${settings}`
      );
      return;
    }

    cy.get('.gh-nav-body a[href="#/settings/' + settings + '/"]').click();
    cy.wait(1000);
    cy.screenshot(
      `images/cypress/${feature}_${ghost_version}/navigate_ghost_settings_${settings}`
    );
  }
);

Cypress.Commands.add("saveSettings", () => {
  cy.get(".view-actions button").click();
});

Cypress.Commands.add(
  "goAdminAndLogin",
  (feature = "general", ghost_version = "new") => {
    const username = "jfdeviar@gmail.com";
    const password = "pt100UNAL--";

    let endpoint = "http://uniandes.ingenio.com.co:2368/ghost";
    if (ghost_version === "old") {
      endpoint = "http://uniandes.ingenio.com.co:2367/ghost";
    }

    cy.visit(endpoint);
    cy.wait(1000);
    cy.screenshot(
      `images/cypress/${feature}_${ghost_version}/navigate_ghost_admin`
    );
    cy.get("input.email").type(username);
    cy.get("input.password").type(password);
    cy.get("button.login").click(); // Click on button
    cy.wait(1000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/login_admin`);
  }
);

Cypress.Commands.add(
  "goWebsite",
  (feature = "general", ghost_version = "new") => {
    let endpoint = "http://uniandes.ingenio.com.co:2368";
    if (ghost_version === "old") {
      endpoint = "http://uniandes.ingenio.com.co:2367";
    }

    cy.visit(endpoint);
    cy.wait(1000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/new_site`);
  }
);
