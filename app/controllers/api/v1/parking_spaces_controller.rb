module Api
  module V1
    class ParkingSpacesController < ApplicationController
      def create
        @parking_space = ParkingSpace.new(parking_space_params)
        @parking_space.selected_features = params[:selected_features].join(',') if params[:selected_features]

        if @parking_space.save
          render json: { message: "Parking space created successfully", parking_space: @parking_space }, status: :created
        else
          Rails.logger.info "Errors: #{@parking_space.errors.full_messages}"
          render json: { errors: @parking_space.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      private
      
      def parking_space_params
        params.permit(
          :building_name,
          :address,
          :two_wheeler_count,
          :four_wheeler_count,
          parking_images: [],
          selected_features: [],
          rates: [:hourly, :daily, :weekly, :monthly, :six_months, :yearly],
          location: [:location_name, :city, coordinates: [:latitude, :longitude]]
        )
      end      
    end
  end
end
