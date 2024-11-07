class Api::V1::SessionsController < ApplicationController
  def google_auth
    id_token = params[:id_token]
    validator = GoogleIDToken::Validator.new
    begin
      payload = validator.check(id_token, '199863809916-0nt0vk16hjcuk93tti5ci3vk4b58dd94.apps.googleusercontent.com')
      user = User.find_or_create_by(email: payload['email']) do |u|
        u.name = payload['name']
      end
      token = JsonWebToken.encode(user_id: user.id) # Generates session token
      render json: { token: token, user: user }, status: :ok
    rescue GoogleIDToken::ValidationError => e
      render json: { error: 'Invalid Google ID token' }, status: :unauthorized
    end
  end
end
