class ParkingSpace < ApplicationRecord
  # Validations
  validates :building_name, presence: true
  validates :address, presence: true
  validates :two_wheeler_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :four_wheeler_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :hourly_rate, :day_rate, :week_rate, :month_rate, :six_month_rate, :year_rate,
            numericality: { greater_than_or_equal_to: 0, allow_nil: true }

  # Active Storage association
  has_many_attached :parking_images
end
