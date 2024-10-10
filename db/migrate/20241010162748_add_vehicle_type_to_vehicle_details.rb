class AddVehicleTypeToVehicleDetails < ActiveRecord::Migration[7.1]
  def change
    add_column :vehicle_details, :vehicle_type, :string
  end
end
