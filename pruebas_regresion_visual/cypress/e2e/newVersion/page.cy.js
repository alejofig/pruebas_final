import { faker } from "@faker-js/faker";

describe("Admin create/cancel/edit page", (ghost_version = "new") => {
  it("Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion, publicar ahora mismo", () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    const feature="create_page"
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin(feature);
    cy.wait(3000);
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/pages/");
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/navigate_page`);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New page")
      .click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/create_page`);  
    cy.get("textarea.gh-editor-title").type(title);
    cy.get("article.koenig-editor").type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    cy.wait(3000);
    cy.screenshot(
      `images/cypress/${feature}_${ghost_version}/create_page_success`
    );  
    cy.wait(3000);  
    let titleUrl = title.replaceAll(" ", "-").toLowerCase();
    cy.visit(`http://uniandes.ingenio.com.co:2368/${titleUrl}/`);
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/published_page`);
    cy.get("h1.single-title").should("have.text", title);
    cy.get("div.single-content p").should("have.text", description);
  });

  it("Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion y cancelar", () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    const feature="cancel_page"
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin(feature);
    cy.wait(3000);
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/pages/");
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/navigate_page_cancel`);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New page")
      .click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/create_page_cancel`);
    cy.get("textarea.gh-editor-title").type(title);
    cy.get("article.koenig-editor").type(description);
    cy.wait(5000)
    cy.reload()
    cy.wait(1000)
    cy.screenshot(
      `images/cypress/${feature}_${ghost_version}/create_page_atras`
    );   
    cy.get("div.koenig-editor__editor p").should("have.text", description);
});

  it("Como usuario administrador me logeo e intento editar una pagina y la publico", () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    const feature="edit_page"
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin(feature);
    cy.wait(3000);
    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/pages/"
    );
    cy.wait(3000);
    cy.screenshot(
      `images/cypress/${feature}_${ghost_version}/published_pages_list`
    );
    cy.get("h3.gh-content-entry-title").first().click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/edit_pages`);

    cy.get("textarea.gh-editor-title").clear().type(title);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}_${ghost_version}/edited_pages_success`);
    

  });

});
