class Comment < ApplicationRecord
  belongs_to :card

  validates :content, presence: true, length: { maximum: 300 }
end
