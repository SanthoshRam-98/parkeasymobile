Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :vehicle_details, only: [:create,:index,:destroy]
    end
  end
end
