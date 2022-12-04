Feature: Admin delete elements in configurations

@user2 @web
Scenario: Como usuario administrador elimino un elemento del menu en la navegacion principal
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "menu_delete" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "menu_delete" feature
  And I go into settings
  And I take a snapshot "navigate_settings" step, "menu_delete" feature
  And I go into "navigation" settings
  And I take a snapshot "navigate_settings_navigation" step, "menu_delete" feature
  And I remove the last menu item in "primary" navigation
  And I save general settings changes
  And I navigate to ghost website
  And I take a snapshot "navigate_website" step, "menu_delete" feature
  Then I check that the last menu item was deleted in the "primary" navigation

