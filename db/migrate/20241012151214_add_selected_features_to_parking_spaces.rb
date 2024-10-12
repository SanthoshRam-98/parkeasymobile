class AddSelectedFeaturesToParkingSpaces < ActiveRecord::Migration[7.1]
  def change
    add_column :parking_spaces, :selected_features, :string
  end
end
