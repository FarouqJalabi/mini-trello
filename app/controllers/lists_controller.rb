class ListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_list, only: %i[ show edit update destroy ]
  before_action :set_board
  # TODO validate ownership of list/board

  def show
  end

  def new
    @list = List.new
  end

  def edit
  end

  def create
    @list = @board.lists.new(list_params)

    if @list.save
      redirect_to [ @board, @list ], notice: "List was successfully created." # Possible to focus on list?
    else
      render :new, status: :unprocessable_content
    end
  end

  def update
    if @list.update(list_params)
      redirect_to [ @board, @list ], notice: "List was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_content
    end
  end

  def destroy
    @list.destroy!
    redirect_to lists_path, notice: "List was successfully destroyed.", status: :see_other
  end

  private
    def set_board
      @board = current_user.boards.find(params.expect(:board_id))
    end

    def set_list
      @list = List.find(params.expect(:id))
    end

    def list_params
      params.expect(list: [ :order, :title ])
    end
end
