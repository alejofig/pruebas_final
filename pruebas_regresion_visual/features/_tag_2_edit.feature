Feature: Editar Tag

    @user1 @web
    Scenario: Como usuario administrador edito un Tag
        Given I navigate to ghost admin
        And I take a snapshot "navigate_admin" step, "tag_edit" feature
        And I login into the administrator
        And I take a snapshot "login_admin" step, "tag_edit" feature
        And I go into "tags"
        And I take a snapshot "tag_list" step, "tag_edit" feature
        And I select existing tag
        And I take a snapshot "tag_to_edit" step, "tag_edit" feature
        When I fill tag with random name and description
        And I take a snapshot "tag_to_edit_filled" step, "tag_edit" feature
        And I go into "tags"
        And I take a snapshot "edited_tag_list" step, "tag_edit" feature
        Then I chek tag with random name exists and has description

