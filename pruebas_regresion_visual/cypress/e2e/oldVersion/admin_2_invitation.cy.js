import {faker} from "@faker-js/faker";

const ghost_version = "old";
describe('Admin create elements in configuration', () => {

  it('Como usuario administrador envio una invitación y la elimino a un nuevo usuario', () => {
    const profile_name = "invitation";
    const email = faker.lorem.words(1) + (Date.now()) + '@' + faker.internet.domainName()

    cy.intercept('/ghost/api/v3/admin/invites/*').as('saveSettings')


    cy.goAdminAndLogin(profile_name,ghost_version)

    cy.get('.gh-nav-body a[href="#/staff/"]').click()
    cy.screenshot(`images/cypress/${profile_name}_${ghost_version}/navigate_ghost_settings_staff`)

    let previewLength = 0
    cy.wait(2000).then(() => {
        if (Cypress.$('.apps-configured a[href="#revoke"]').length > 0) {
            cy.get('.apps-configured a[href="#revoke"]').then(($aElement) => {
                previewLength = $aElement.length
            })
        }
    })

    cy.get(".view-actions button").click()
    cy.wait(1000)
    cy.get('#new-user-email').clear().type(email)
    cy.get('#new-user-role').select(faker.helpers.arrayElement(['Contributor','Editor','Administrator']))

    cy.screenshot(`images/cypress/${profile_name}_${ghost_version}/invitation_filled`)

    cy.get('.modal-footer button').click()
    cy.wait('@saveSettings')
    cy.reload()

    cy.get('.apps-configured a[href="#revoke"]').should(($aElement) => {
      expect($aElement).to.have.length(previewLength + 1)
    })
    cy.screenshot(`images/cypress/${profile_name}_${ghost_version}/invitation_list`)
    cy.get('.apps-configured a[href="#revoke"]').first().click()
    cy.wait('@saveSettings')
    cy.reload()

    cy.get('.apps-configured a[href="#revoke"]').should(($aElement) => {
      expect($aElement).to.have.length(previewLength)
    })

  })

    it('Como usuario administrador invito a un usuario ya existente', () => {
        const profile_name = "invitation_repeated";
        cy.intercept('/ghost/api/v3/admin/invites/*').as('saveSettings')

        cy.goAdminAndLogin(profile_name,ghost_version)
        cy.get('.gh-nav-body a[href="#/staff/"]').click()
        cy.screenshot(`images/cypress/${profile_name}_${ghost_version}/navigate_ghost_settings_staff`)

        cy.get(".view-actions button").click()
        cy.wait(1000)
        cy.get('#new-user-email').clear().type('jfdeviar@gmail.com')
        cy.get('#new-user-role').select(faker.helpers.arrayElement(['Contributor','Editor','Administrator']))
        cy.get('.modal-footer button').click()
        cy.wait('@saveSettings')

        cy.screenshot(`images/cypress/${profile_name}_${ghost_version}/invitation_error`)
        cy.get('.response').contains('A user with that email address already exists').should('be.visible')


    })

})