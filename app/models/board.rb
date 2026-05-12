class Board < ApplicationRecord
  belongs_to :user
  has_many :lists, -> { order(:order) }, dependent: :destroy

  validates :title, presence: true
  enum :theme, %w[light valentine emerald corporate autumn caramellatte dark].index_by(&:itself), validate: true
end
