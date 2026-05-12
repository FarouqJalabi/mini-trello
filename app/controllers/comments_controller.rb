class CommentsController < ApplicationController
  before_action :set_card, only: %i[ index create destroy ]

  def index
    redirect_to [ :edit, @card ] unless turbo_frame_request?
    @comment = @card.comments.new
  end

  def create
    @comment = @card.comments.new(comment_params)

    if @comment.save
      redirect_to card_comments_path(@card), notice: "Comment was successfully created.", status: :see_other
    else
      @comments = @card.comments
      render :index, status: :unprocessable_content
    end
  end

  def destroy
    @comment = current_user.comments.find(params.expect(:id))
    @comment.destroy!
    redirect_to comments_path, notice: "Comment was successfully destroyed.", status: :see_other
  end

  private
    def set_card
      @card = current_user.cards.find(params.expect(:card_id))
    end

    def comment_params
      params.expect(comment: [ :content ])
    end
end
