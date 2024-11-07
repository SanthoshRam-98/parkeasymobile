# config/initializers/auth0.rb

Rails.application.config.middleware.use OmniAuth::Builder do
    provider :auth0,
             ENV['AUTH0_CLIENT_ID'],
             ENV['AUTH0_CLIENT_SECRET'],
             ENV['AUTH0_DOMAIN'],
             callback_path: '/auth/auth0/callback',
             authorize_params: {
               scope: 'openid profile email',
               audience: ENV['AUTH0_AUDIENCE']
             }
  end
  