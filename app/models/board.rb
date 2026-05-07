class Board < ApplicationRecord
  belongs_to :user
  has_many :lists, -> { order(:order) }, dependent: :destroy

  validates :title, presence: true
end
