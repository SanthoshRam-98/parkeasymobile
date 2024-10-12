class AddLocationDetailsToParkingSpaces < ActiveRecord::Migration[7.1]
  def change
    add_column :parking_spaces, :location_name, :string
    add_column :parking_spaces, :city, :string
  end
end
