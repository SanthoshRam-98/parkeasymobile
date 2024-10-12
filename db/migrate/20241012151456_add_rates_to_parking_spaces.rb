class AddRatesToParkingSpaces < ActiveRecord::Migration[7.1]
  def change
    add_column :parking_spaces, :rates, :json
  end
end
