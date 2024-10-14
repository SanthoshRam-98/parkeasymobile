class CreateParkingSpaces < ActiveRecord::Migration[7.1]
  def change
    create_table :parking_spaces do |t|
      t.string :building_name
      t.string :address
      t.integer :two_wheeler_count
      t.integer :four_wheeler_count
      t.decimal :hourly_rate, precision: 8, scale: 2
      t.decimal :day_rate, precision: 8, scale: 2
      t.decimal :week_rate, precision: 8, scale: 2
      t.decimal :month_rate, precision: 8, scale: 2
      t.decimal :six_month_rate, precision: 8, scale: 2
      t.decimal :year_rate, precision: 8, scale: 2
      t.string :location_name
      t.string :city
      t.text :selected_features

      t.timestamps
    end
  end
end
