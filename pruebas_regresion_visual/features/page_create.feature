Feature: Admin create page

@user1 @web
Scenario: Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion, publicar ahora mismo
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "page_create" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "page_create" feature
  And I go into "pages"
  And I take a snapshot "page_list" step, "page_create" feature
  And I select new page
  And I take a snapshot "new_page" step, "page_create" feature
  And I fill the page title with "Kraken Titulo page" and description with "Kraken description page"
  And I take a snapshot "filled_page" step, "page_create" feature
  When I select publish
  And I take a snapshot "published_page" step, "page_create" feature
  Then I Check page has title 'Kraken Titulo page' and description 'Kraken description page'

  @user2 @web
Scenario: Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion y cancelar
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "cancel_create" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "cancel_create" feature
  And I go into "pages"
  And I take a snapshot "page_list" step, "cancel_create" feature
  And I select new page
  And I take a snapshot "new_page" step, "cancel_create" feature
  And I fill the page title with "Kraken Titulo page 2" and description with "Kraken description page 2"
  And I take a snapshot "filled_page" step, "cancel_create" feature
  Then I select pages