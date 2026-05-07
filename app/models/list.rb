class List < ApplicationRecord
  belongs_to :board
  has_many :cards, -> { order(:order) }, dependent: :destroy

  validates :title, presence: true
  validates :order, numericality: { greater_than: 0 }

  before_validation :set_default_order, on: :create

  private
    def set_default_order
      self.order ||= board.lists.count+1
    end
end
