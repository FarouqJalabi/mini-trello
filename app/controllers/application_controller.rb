class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  def after_sign_in_path_for(_resource)
    if current_user.boards.any?
      root_path
    else
      board_path(create_default_board)
    end
  end

  private
    def create_default_board
      board = current_user.boards.create!(title: "My First Board")
      list = board.lists.create!(title: "To do")
      list.cards.create!(title: "Click me!", description: "Edit my description!")
      list.cards.create!(title: "Drag me to in progress list")
      list.cards.create!(title: "Try editing boards theme")

      list = board.lists.create!(title: "In progress")
      list.cards.create!(title: "Click on Miello to see other boards")

      list = board.lists.create!(title: "Done")
      list.cards.create!(title: "Love Miello 😉")

      board
    end
end
