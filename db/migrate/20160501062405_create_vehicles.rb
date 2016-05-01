class CreateVehicles < ActiveRecord::Migration
  def change
    create_table :vehicles do |t|
      t.string :number, :null => false
      t.boolean :enabled, :null => false, :default => true
      t.references :fleet, index: true, foreign_key: true
      t.references :driver, index: true, foreign_key: true

      t.timestamps null: false
    end

    add_index(:vehicles, :number, unique: true)

  end
end
