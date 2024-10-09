class Api::V1::VehicleDetailsController < ApplicationController
    def create
      vehicle_detail = VehicleDetail.new(vehicle_detail_params)
      
      if vehicle_detail.save
        render json: { message: "Vehicle details saved successfully" }, status: :created
      else
        render json: { error: vehicle_detail.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def vehicle_detail_params
      params.require(:vehicle_detail).permit(:vehicle_number, :name, :license_number)
    end
  end
  