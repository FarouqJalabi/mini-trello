class CreateComments < ActiveRecord::Migration[8.1]
  def change
    create_table :comments do |t|
      t.belongs_to :card, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
