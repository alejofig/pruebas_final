Feature: Editar Tag

    @user1 @web
    Scenario: Como usuario administrador borro un Tag con description
        Given I navigate to ghost admin
        And I take a snapshot "navigate_admin" step, "tag_delete" feature
        And I login into the administrator
        And I take a snapshot "login_admin" step, "tag_delete" feature
        And I go into "tags"
        And I take a snapshot "tag_list" step, "tag_delete" feature
        And I select existing tag
        And I take a snapshot "tag_to_delete" step, "tag_delete" feature
        When I delete the tag
        And I go into "tags"
        And I take a snapshot "deleted_tags_list" step, "tag_delete" feature
        Then I chek tag doest not exists

