import {faker} from "@faker-js/faker";

describe('Admin add newsletter', (ghost_version = "new") => {

  it('Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y crear', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    const feature="create_newsletter"
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin(feature)
    cy.goIntoSettings('newsletters',feature,ghost_version)

    let previewLength = 0
    cy.wait(2000).then(() => {
        if (Cypress.$('.apps-configured a[href="#revoke"]').length > 0) {
            cy.get('.apps-configured a[href="#revoke"]').then(($aElement) => {
                previewLength = $aElement.length
            })
        }
    })
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/navigate_newsletter`);
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.wait(3000);
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.wait(3000);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/add_newsletter`);

  })

  it('Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    const feature="cancel_newsletter"
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin(feature)
    cy.goIntoSettings('newsletters',feature,ghost_version)

    let previewLength = 0
    cy.wait(2000).then(() => {
        if (Cypress.$('.apps-configured a[href="#revoke"]').length > 0) {
            cy.get('.apps-configured a[href="#revoke"]').then(($aElement) => {
                previewLength = $aElement.length
            })
        }
    })
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/navigate_newsletter_cancel`);
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.wait(3000);
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.wait(3000);
    cy.get(".modal-footer button.gh-btn:not(.gh-btn-primary)").click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/cancel_newsletter`);

  })

})