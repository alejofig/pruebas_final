Feature: Admin Invitations

    @user1 @web
    Scenario: Como usuario administrador edito un post publicado
        Given I navigate to ghost admin
        And I take a snapshot "navigate_admin" step, "post_edit" feature
        And I login into the administrator
        And I take a snapshot "login_admin" step, "post_edit" feature
        And I go into "posts"
        And I take a snapshot "post_list" step, "post_edit" feature
        And I select last post published
        And I take a snapshot "post_to_edit" step, "post_edit" feature
        And I fill the post title with random title
        And I take a snapshot "post_filled" step, "post_edit" feature
        When I edit the post
        And I take a snapshot "edited_post_success" step, "post_edit" feature
        Then I Check post has the random title
        And I take a snapshot "edited_post" step, "post_edit" feature