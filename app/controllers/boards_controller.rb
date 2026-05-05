class BoardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_board, only: %i[ show edit update destroy ]
  # TODO validate ownership of board

  def index
    @boards = Board.all
  end

  def show
  end

  def new
    @board = current_user.boards.new(title: "New board")

    if @board.save
      redirect_to @board, notice: "Board was successfully created."
    else
      redirect_to :boards, alert: "Unable to create board due to: #{@board.errors.full_messages.first}"
    end
  end

  def edit
  end

  def update
    if @board.update(board_params)
      redirect_to @board, notice: "Board was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_content
    end
  end

  def destroy
    @board.destroy!
    redirect_to boards_path, notice: "Board was successfully destroyed.", status: :see_other
  end

  private
    def set_board
      @board = Board.find(params.expect(:id))
    end

    def board_params
      params.expect(board: [ :title ])
    end
end
