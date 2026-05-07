class CardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_card, only: %i[ edit update destroy ]
  before_action :set_list, only: %i[ new create ]

  def new
    @card = @list.cards.new()
  end

  def edit
  end

  def create
    @card = @list.cards.new(card_params)

    if @card.save
      redirect_to @card.board, notice: "Card was successfully created."
    else
      render :new, status: :unprocessable_content
    end
  end

  def bulk_update
    ActiveRecord::Base.transaction do
      cards_params.each do |card_params|
        list = current_user.cards.find(card_params[:id])
        list.update!(card_params.except(:id))
      end
    end
  end

  def update
    if @card.update(card_params)
      redirect_to @card.board, notice: "Card was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_content
    end
  end

  def destroy
    @card.destroy!
    redirect_to @card.board, notice: "Card was successfully destroyed.", status: :see_other
  end

  private
    def set_list
      @list = @card&.list || current_user.lists.find(params.expect(:list_id))
    end

    def set_card
      @card = current_user.cards.find(params.expect(:id))
    end

    def cards_params
      params.expect(records: [ [ :id, :order, :list_id ] ])
    end

    def card_params
      params.expect(card: [ :title ])
    end
end
