class CreateFleets < ActiveRecord::Migration
  def change
    create_table :fleets do |t|
      t.string :name, :null => false
      t.string :contact, :null => false
      t.string :mobilephone, :null => false
      t.string :telephone
      t.string :address
      t.boolean :enabled, :null => false, :default => true

      t.timestamps null: false
    end

    add_index(:fleets, :name, unique: true)

  end
end
