class CreateParkingSpaces < ActiveRecord::Migration[7.1]
  def change
    create_table :parking_spaces do |t|
      t.string :building_name
      t.text :address
      t.integer :two_wheeler_count
      t.integer :four_wheeler_count
      t.decimal :hourly_rate
      t.decimal :day_rate
      t.decimal :week_rate
      t.decimal :month_rate
      t.decimal :six_month_rate
      t.decimal :year_rate
      t.text :features
      t.text :parking_images
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
