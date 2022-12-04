Feature: Crear Tag

    @user1 @web
    Scenario: Como usuario administrador creo un Tag con description
        Given I navigate to ghost admin
        And I take a snapshot "navigate_admin" step, "tag_create" feature
        And I login into the administrator
        And I take a snapshot "login_admin" step, "tag_create" feature
        And I go into "tags"
        And I take a snapshot "tags_list" step, "tag_create" feature
        And I select new tag
        And I take a snapshot "create_tags" step, "tag_create" feature
        When I fill tag with random name and description
        And I take a snapshot "create_tags_values" step, "tag_create" feature
        And I go into "tags"
        And I take a snapshot "created_tag_list" step, "tag_create" feature
        Then I chek tag with random name exists and has description

