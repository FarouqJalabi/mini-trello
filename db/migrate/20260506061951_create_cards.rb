class CreateCards < ActiveRecord::Migration[8.1]
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.integer :order, null: false
      t.belongs_to :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
