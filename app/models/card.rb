class Card < ApplicationRecord
  belongs_to :list
  has_one :board, through: :list

  validates :title, presence: true
  validates :order, numericality: { greater_than: 0 }

  before_validation :set_default_order, on: :create

  private
    def set_default_order
      self.order ||= list.cards.count+1
    end
end
