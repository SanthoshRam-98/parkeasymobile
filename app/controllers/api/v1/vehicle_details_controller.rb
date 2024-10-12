class Api::V1::VehicleDetailsController < ApplicationController
    def create
      vehicle_detail = VehicleDetail.new(vehicle_detail_params)
      
      if vehicle_detail.save
        render json: { message: "Vehicle details saved successfully" }, status: :created
      else
        render json: { error: vehicle_detail.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index
      vehicle_details = VehicleDetail.all
      render json: vehicle_details, status: :ok
    end

    def destroy
      vehicle_detail = VehicleDetail.find_by(id: params[:id])
      
      if vehicle_detail
        vehicle_detail.destroy
        render json: { message: "Vehicle details deleted successfully" }, status: :ok
      else
        render json: { error: "Vehicle not found" }, status: :not_found
      end
    end
    
    private
  
    def vehicle_detail_params
      params.require(:vehicle_detail).permit(:vehicle_number, :name, :license_number, :vehicle_type)
    end
  end
  