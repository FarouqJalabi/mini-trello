class CreateLists < ActiveRecord::Migration[8.1]
  def change
    create_table :lists do |t|
      t.integer :order, null: false
      t.belongs_to :board, null: false, foreign_key: true
      t.string :title, null: false

      t.timestamps
    end
  end
end
