Feature: Admin create elements in configuration


@user1 @web
Scenario: Como usuario administrador cambio el titulo y lo verifico en la página
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "title" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "title" feature
  And I go into settings
  And I take a snapshot "navigate_settings" step, "title" feature
  And I go into "general" settings
  And I take a snapshot "navigate_settings_general" step, "title" feature
  And I expand the "Title" section
  And I fill the input in the position 1 in the expanded section
  And I save general settings changes
  And I navigate to ghost website
  And I take a snapshot "navigate_website" step, "title" feature
  Then I check that the title has changed

@user2 @web
Scenario: Como usuario administrador crea un elemento del menu en la navegacion principal
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "menu" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "menu" feature
  And I go into settings
  And I take a snapshot "navigate_settings" step, "menu" feature
  And I go into "navigation" settings
  And I take a snapshot "navigate_settings_navigation" step, "menu" feature
  And I add a menu to "https://facebook.com" with label "facebook" as a new element in "primary" navigation
  And I save general settings changes
  And I navigate to ghost website
  And I take a snapshot "navigate_website" step, "menu" feature
  Then I check that the menu to "https://facebook.com" has been added
