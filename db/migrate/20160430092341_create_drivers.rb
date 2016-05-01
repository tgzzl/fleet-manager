class CreateDrivers < ActiveRecord::Migration
  def change
    create_table :drivers do |t|
      t.string :name, :null => false
      t.string :mobilephone, :null => false
      t.boolean :enabled, :null => false, :default => true

      t.timestamps null: false
    end
  end
end
