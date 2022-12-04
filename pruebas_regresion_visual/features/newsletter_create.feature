Feature: Admin add newsletter

@user1 @web
Scenario: Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y crear
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "create_newsletter" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "create_newsletter" feature
  And I go into settings
  And I take a snapshot "navigate_settings" step, "create_newsletter" feature
  And I go into "email newsletter" settings
  And I take a snapshot "navigate_settings_newsletter" step, "create_newsletter" feature
  And I select add newsletter
  And I take a snapshot "add_newsletter" step, "create_newsletter" feature
  And I fill the input with id selector name "#newsletter-title" with "Boletin 1"
  And I fill the input with id selector description "#newsletter-description" with "Descripcion 1"
  Then I select create
  And I take a snapshot "created_newsletter" step, "create_newsletter" feature
  

  @user2 @web
Scenario: Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "cancel_newsletter" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "cancel_newsletter" feature
  And I go into settings
  And I take a snapshot "navigate_settings" step, "cancel_newsletter" feature
  And I go into "email newsletter" settings
  And I take a snapshot "navigate_settings_newsletter" step, "cancel_newsletter" feature
  And I select add newsletter
  And I take a snapshot "add_newsletter" step, "cancel_newsletter" feature
  And I fill the input with id selector name "#newsletter-title" with "Boletin 2"
  And I fill the input with id selector description "#newsletter-description" with "Descripcion 2"
  Then I select cancel
  And I take a snapshot "canceled_newsletter" step, "cancel_newsletter" feature