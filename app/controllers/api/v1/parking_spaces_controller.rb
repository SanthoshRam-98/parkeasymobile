module Api
  module V1
    class ParkingSpacesController < ApplicationController
      def create
        # Instantiate the parking space object
        @parking_space = ParkingSpace.new(parking_space_params)

        # Log received parameters for debugging
        Rails.logger.info "Received parameters: #{params.inspect}"

        # Attach images if any are provided
        if params[:parking_space][:parking_images]
          params[:parking_space][:parking_images].each do |image|
            @parking_space.parking_images.attach(image)
          end
        end

        # Save the parking space and respond accordingly
        if @parking_space.save
          render json: { message: "Parking space created successfully", parking_space: @parking_space }, status: :created
        else
          Rails.logger.info "Errors: #{@parking_space.errors.full_messages}"
          render json: { errors: @parking_space.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      private
      
      def parking_space_params
        params.require(:parking_space).permit(
          :building_name, :address, :two_wheeler_count, :four_wheeler_count,
          :hourly_rate, :day_rate, :week_rate, :month_rate, :six_month_rate, :year_rate,
          :latitude, :longitude, :location_name, :city, :selected_features,
          parking_images: [] # Ensure this is an array for attachments
        )
      end
    end
  end
end
