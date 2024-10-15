Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :vehicle_details, only: [:create,:index,:destroy]
      resources :parking_spaces, only: [:create, :index, :show]  
    end
  end
end
