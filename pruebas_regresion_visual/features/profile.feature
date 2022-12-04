Feature: Admin change values in profile 

@user1 @web
Scenario: Como usuario administrador me logeo e intento agregar una bio de menos de 200 caracteres
  Given I navigate to ghost admin
  And I take a snapshot "navigate_ghost_admin" step, "profile" feature
  And I login into the administrator
  And I take a snapshot "login_admin" step, "profile" feature
  And I go to my profile
  And I take a snapshot "go_to_my_profile" step, "profile" feature
  And I fill the bio with faker with "10" words
  And I take a snapshot "fill_bio_with_faker" step, "profile" feature
  And I save the profile changes
  And I take a snapshot "save_profile_changes" step, "profile" feature
  And I refresh the website
  And I take a snapshot "save_profile_changes" step, "profile" feature
  Then I check the Bio is updated
  And I take a snapshot "check_profile_updated" step, "profile" feature


@user2 @web
Scenario: Como usuario administrador me logeo y cambio el nombre en mi perfil
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I enter "johnattan devia" to the input with class "user-name"
  And I take a snapshot "change_user_name" step, "profile" feature
  And I save the profile changes
  And I take a snapshot "save_profile_changes" step, "profile" feature
  And I go to my profile
  Then I check that the full name is "johnattan devia"
  And I take a snapshot "full_name_changed" step, "profile" feature



@user3 @web
Scenario: Como usuario administrador me logeo y cambio el nombre en mi perfil pero no guardo cambios
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I enter "Johnattan Devia" to the input with class "user-name"
  And I take a snapshot "change_user_name_no_save" step, "profile" feature
  And I refresh the website
  And I take a snapshot "refresh_profile" step, "profile" feature
  Then I check that the full name is "johnattan devia"  
  And I take a snapshot "full_name_changed_no_save" step, "profile" feature


@user4 @web
Scenario: Como usuario administrador me logeo e intento cambiar la contraseña ingresando una inferior a 10 digitos
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I fill the input with id selector "#user-password-old" with "1234"
  And I take a snapshot "password_old_short" step, "profile" feature
  And I fill the input with id selector "#user-password-new" with "1234"
  And I take a snapshot "password_new_short" step, "profile" feature
  And I fill the input with id selector "#user-new-password-verification" with "1234"
  And I take a snapshot "password_verification_short" step, "profile" feature
  And I try to change password
  And I take a snapshot "try_change_password" step, "profile" feature
  Then I check the error message "Password must be at least 10 characters long."
  And I take a snapshot "error_pass_too_short" step, "profile" feature


@user5 @web
Scenario: Como usuario administrador me logeo e intento agregar una bio de más de 200 caracteres
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I fill the bio with faker with "30" words
  And I take a snapshot "change_bio_30_words" step, "profile" feature
  And I save the profile changes
  And I take a snapshot "save_profile_changes" step, "profile" feature
  Then I check the error message "Bio is too long"
  And I take a snapshot "error_bio_is_too_long" step, "profile" feature
