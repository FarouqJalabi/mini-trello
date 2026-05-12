class Card < ApplicationRecord
  belongs_to :list
  has_one :board, through: :list
  has_many :comments, -> { order(created_at: :desc) }, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50 }
  validates :order, numericality: { greater_than: 0 }
  has_rich_text :description
  validates :description, no_attachments: true


  before_validation :set_default_order, on: :create

  private
    def set_default_order
      self.order ||= (list&.cards&.second_to_last&.order || 0) + 1
    end
end
