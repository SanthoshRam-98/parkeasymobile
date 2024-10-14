class ParkingSpace < ApplicationRecord
  # Validations
  validates :building_name, :address, :two_wheeler_count, :four_wheeler_count, 
            :hourly_rate, :day_rate, :week_rate, :month_rate, 
            :six_month_rate, :year_rate, :location_name, :city, 
            presence: true
  has_many_attached :parking_images
  end
  