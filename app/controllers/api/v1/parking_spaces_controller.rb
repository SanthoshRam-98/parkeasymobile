class Api::V1::ParkingSpacesController < ApplicationController
  # GET /api/v1/parking_spaces
  # GET /api/v1/parking_spaces
  def index
    begin
      @parking_spaces = ParkingSpace.all

      # Build a JSON response including URLs for attached images
      parking_spaces_with_images = @parking_spaces.map do |parking_space|
        parking_space.as_json.merge({
          parking_images: parking_space.parking_images.map { |image| url_for(image) }
        })
      end

      render json: parking_spaces_with_images
    rescue => e
      Rails.logger.error("Error fetching parking spaces: #{e.message}")
      render json: { error: 'Error fetching parking spaces' }, status: :internal_server_error
    end
  end
  
  def show
    begin
      parking_space = ParkingSpace.find(params[:id])
      render json: parking_space.as_json.merge({
        parking_images: parking_space.parking_images.map { |image| url_for(image) }
      })
    rescue => e
      Rails.logger.error("Error fetching parking space: #{e.message}")
      render json: { error: 'Error fetching parking space' }, status: :internal_server_error
    end
  end

  # POST /api/v1/parking_spaces
  def create
    if parking_space_params[:building_name].blank? || 
       parking_space_params[:address].blank? || 
       parking_space_params[:location_name].blank? || 
       parking_space_params[:city].blank?
       
      return render json: { errors: "Building name, address, location name, and city are required." }, status: :unprocessable_entity
    end

    parking_space = ParkingSpace.new(parking_space_params)
    
    if parking_space.save
      render json: { message: 'Parking space created successfully', parking_space: parking_space }, status: :created
    else
      Rails.logger.error("Parking space creation failed: #{parking_space.errors.full_messages}")
      render json: { errors: parking_space.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def parking_space_params
    params.require(:parking_space).permit(
      :building_name, :address, :two_wheeler_count, :four_wheeler_count, 
      :hourly_rate, :day_rate, :week_rate, :month_rate, :six_month_rate, 
      :year_rate, :location_name, :city, selected_features: [],
      parking_images: [] # Allow multiple images
    )
  end
end
