class ListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_list, only: %i[ show edit update destroy ]
  before_action :set_board, except: %i[ bulk_update ]

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
      redirect_to @board, notice: "List was successfully created." # Possible to focus on list?
    else
      render :new, status: :unprocessable_content
    end
  end

  def bulk_update
    ActiveRecord::Base.transaction do
      lists_params.each do |list_params|
        list = current_user.lists.find(list_params[:id])
        list.update!(list_params.except(:id))
      end
    end
  end

  def update
    if @list.update(list_params)
      redirect_to @board, notice: "List was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_content
    end
  end

  def destroy
    @list.destroy!
    redirect_to @list.board, notice: "List was successfully destroyed.", status: :see_other
  end

  private
    def set_board
      @board = current_user.boards.find(params.expect(:board_id))
    end

    def set_list
      @list = current_user.lists.find(params.expect(:id))
    end

    def lists_params
      params.expect(records: [ [ :id, :order ] ])
    end

    def list_params
      params.expect(list: [ :title ])
    end
end
