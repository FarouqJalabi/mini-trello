class AddThemeToBoard < ActiveRecord::Migration[8.1]
  def change
    add_column :boards, :theme, :string, default: "light"
  end
end
