import {faker} from "@faker-js/faker";

describe('Admin create and delete elements in configuration', () => {

  it('Como usuario administrador cambio el titulo y lo verifico en la página', () => {
    const newTitle = faker.lorem.words(2)
    cy.intercept('/ghost/api/admin/settings').as('saveSettings')

    cy.goAdminAndLogin()
    cy.goIntoSettings('general')
    cy.get('.gh-expandable-block').contains('Title').parents('.gh-expandable-block').find('button.gh-btn').click()
    cy.get('.gh-expandable-content input').eq(0).clear().type(newTitle)
    cy.saveSettings()
    cy.wait('@saveSettings')
    cy.goWebsite()

    cy.title().should('eq', newTitle)

  })

  it('Como usuario administrador crea un elemento del menu en la navegacion principal', () => {
    const newUrl = faker.internet.url()
    const newLabel = faker.lorem.word()
    cy.intercept('/ghost/api/admin/settings').as('saveSettings')

    cy.goAdminAndLogin()
    cy.goIntoSettings('navigation')

    cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder="Label"]').clear().type(newLabel)
    cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder="Label"])').clear().type(newUrl)

    cy.saveSettings()
    cy.wait('@saveSettings')
    cy.goWebsite()
    cy.get('.nav a[href="'+newUrl+'"]').should(($nav) => {
      expect($nav).to.have.length(1)
      expect($nav.first()).to.contain(newLabel)
    })

  })
  it('Como usuario administrador crea un elemento del menu en la navegacion principal', () => {
    cy.intercept('/ghost/api/admin/settings').as('saveSettings')

    let lastHref = {};
    let previewLength = 0;

    cy.goWebsite()

    cy.get('#gh-head .nav a').then(($aElement) => {
      $aElement.each(($innerEl) => {
        lastHref['el-'+$innerEl] = $aElement.eq($innerEl).attr('href')
      })
      previewLength = $aElement.length
    })
    cy.goAdminAndLogin()
    cy.goIntoSettings('navigation')

    cy.wait(1000)
    cy.get('#settings-navigation .sortable-objects .draggable-object:last-child button.gh-blognav-delete').click()
    cy.wait(1000)

    cy.saveSettings()
    cy.wait('@saveSettings')
    cy.goWebsite()
    cy.get('#gh-head .nav a').should(($aElement) => {
      expect($aElement).to.have.length(previewLength - 1)

      $aElement.each(($innerEl) => {
        expect(lastHref['el-'+$innerEl]).to.eq($aElement.eq($innerEl).attr('href'))
      })
    })
  })


})