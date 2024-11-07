Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post 'auth/google', to: 'sessions#google_auth'
      # Vehicle details management
      resources :vehicle_details, only: [:create, :index, :destroy]

      # Parking space management
      resources :parking_spaces, only: [:create, :index, :show]
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
      # Uncomment if you are implementing payment features in the future
      # post '/paytm/initiate_payment', to: 'payments#initiate_payment'
      # post '/paytm/verify_payment', to: 'payments#verify_payment' # Paytm callback URL
    end
  end
end
