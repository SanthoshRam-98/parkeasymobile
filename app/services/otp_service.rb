# app/services/otp_service.rb
class OtpService
    def self.generate_otp
      rand(1000..9999).to_s  # Generates a random 4-digit OTP
    end
end
  