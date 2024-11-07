# app/controllers/auth_controller.rb
class AuthController < ApplicationController
  require 'aws-sdk-cognitoidentityprovider'
  require 'aws-sdk-sts'

  USER_POOL_ID = 'YOUR_USER_POOL_ID'
  CLIENT_ID = 'YOUR_USER_POOL_CLIENT_ID'

  def send_otp
    phone_number = params[:phone_number]
    client = Aws::CognitoIdentityProvider::Client.new

    begin
      # Initiate the authentication request
      client.admin_create_user({
        user_pool_id: USER_POOL_ID,
        username: phone_number,
        user_attributes: [
          { name: 'phone_number', value: phone_number }
        ]
      })

      render json: { message: 'OTP sent successfully' }, status: :ok
    rescue Aws::CognitoIdentityProvider::Errors::ServiceError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def verify_otp
    phone_number = params[:phone_number]
    otp = params[:otp]
    client = Aws::CognitoIdentityProvider::Client.new

    begin
      # Confirm the OTP
      response = client.confirm_sign_up({
        user_pool_id: USER_POOL_ID,
        username: phone_number,
        confirmation_code: otp
      })

      # After successful verification, generate temporary AWS credentials if necessary
      role_credentials = Aws::AssumeRoleCredentials.new(
        client: Aws::STS::Client.new,
        role_arn: "arn:aws:iam::YOUR_ACCOUNT_ID:role/YOUR_ROLE_NAME",
        role_session_name: "session-name"
      )

      # Example of creating an S3 client with temporary credentials
      s3 = Aws::S3::Client.new(credentials: role_credentials)

      # Return JWT Token or necessary data (add your logic for generating JWT here)
      render json: { message: 'User verified successfully', token: 'JWT_TOKEN' }, status: :ok
    rescue Aws::CognitoIdentityProvider::Errors::ServiceError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
end
