Feature: Creacion de posts

    @user1 @web
    Scenario: Como usuario administrador creo un post con un titulo y descripción
        Given I navigate to ghost admin
        And I take a snapshot "navigate_ghost_admin" step, "post_create" feature
        And I login into the administrator
        And I take a snapshot "login_admin" step, "post_create" feature
        And I go into "posts"
        And I take a snapshot "post_list" step, "post_create" feature
        And I select new post
        And I take a snapshot "new_post" step, "post_create" feature
        And I fill the post title with "Kraken Titulo post" and description with "Kraken description post"
        And I take a snapshot "filled_post" step, "post_create" feature
        When I publish the post
        And I take a snapshot "published_post" step, "post_create" feature
        Then I Check post has title 'Kraken Titulo post' and description 'Kraken description post'

