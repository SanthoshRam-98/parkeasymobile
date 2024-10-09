class CreateVehicleDetails < ActiveRecord::Migration[7.1]
  def change
    create_table :vehicle_details do |t|
      t.string :vehicle_number
      t.string :name
      t.string :license_number

      t.timestamps
    end
  end
end
