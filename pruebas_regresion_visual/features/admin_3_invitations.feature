Feature: Admin Invitations

@user1 @web
Scenario: Como usuario administrador invito y elimino la invitación a un usuario
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "invitation" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "invitation" feature
  And I go into settings
  And I take a snapshot "navigate_settings" step, "invitation" feature
  And I go into "staff" settings
  And I take a snapshot "navigate_settings_staff" step, "invitation" feature
  And I open menu invite people
  And I fill the input with id selector "#new-user-email" with random email
  And I select the option "Editor" in the invite a new staff modal
  And I take a snapshot "invitation_staff_filled" step, "invitation" feature
  And I send the invitation mail
  And I take a snapshot "navigate_settings_staff_invitations" step, "invitation" feature
  And I revoke the invitation
  And I refresh the website
  Then I check that the invitation has been deleted

@user2 @web
Scenario: Como usuario administrador invito a un usuario ya existente
  And I take a snapshot "navigate_ghost_admin" step, "invitation_repeated" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "invitation_repeated" feature
  And I go into settings
  And I take a snapshot "navigate_settings" step, "invitation_repeated" feature
  And I go into "staff" settings
  And I take a snapshot "navigate_settings_staff" step, "invitation_repeated" feature
  And I open menu invite people
  And I fill the input with id selector "#new-user-email" with "jfdeviar@gmail.com"
  And I select the option "Administrator" in the invite a new staff modal
  And I send the invitation mail
  And I take a snapshot "invitation_staff_error" step, "invitation_repeated" feature
  Then I see an error saying "A user with that email address already exists" in the ".response" field
