Feature: Admin edit page

@user1 @web
Scenario: Como usuario administrador me logeo e intento editar una pagina
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "edit_page" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "edit_page" feature
  And I go into "pages"
  And I take a snapshot "page_list" step, "edit_page" feature
  And I select last page published
  And I take a snapshot "page_to_edit" step, "edit_page" feature
  And I fill the page title with random title
  And I take a snapshot "page_filled" step, "edit_page" feature
  When I edit the page
  And I take a snapshot "edited_page_success" step, "edit_page" feature
  Then I Check page has the random title
  And I take a snapshot "edited_page" step, "edit_page" feature
