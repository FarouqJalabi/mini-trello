class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_many :boards, dependent: :destroy
  has_many :lists, through: :boards
  has_many :cards, through: :lists
  has_many :comments, through: :lists
end
