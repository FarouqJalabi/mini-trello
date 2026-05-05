class List < ApplicationRecord
  belongs_to :board

  validates :title, presence: true
  validates :order, numericality: { greater_than: 0 }
end
