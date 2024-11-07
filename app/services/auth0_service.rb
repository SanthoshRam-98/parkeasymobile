# app/services/auth0_service.rb
require 'net/http'
require 'uri'

class Auth0Service
  AUTH0_DOMAIN = 'dev-50n12l4qvkrz5ea6.us.auth0.com'

  def self.verify_id_token(id_token)
    # Fetch Auth0 JSON Web Key Set (JWKS)
    uri = URI("https://#{AUTH0_DOMAIN}/.well-known/jwks.json")
    response = Net::HTTP.get(uri)
    jwks = JSON.parse(response)['keys']

    # Decode the token using the JWKS
    JWT.decode(id_token, nil, true, {
      algorithm: 'RS256',
      jwks: ->(header) { jwks.find { |key| key['kid'] == header['kid'] } }
    })
  rescue JWT::DecodeError => e
    Rails.logger.error("JWT Decode Error: #{e.message}")
    nil
  end
end
