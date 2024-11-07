class User < ApplicationRecord
  # Use bcrypt for secure password storage if email/password authentication is needed
  has_secure_password

  # Custom validation to ensure that at least one method of authentication is present
  validate :authentication_method_present

  # Validations
  validates :phone_number, uniqueness: true, allow_nil: true
  validates :email, uniqueness: true, allow_nil: true
  validates :otp, presence: true, if: -> { otp_generated_at.present? }

  # Methods
  def otp_valid?(entered_otp)
    otp == entered_otp && (Time.now - otp_generated_at) <= 5.minutes
  end

  private

  # Custom validation method
  def authentication_method_present
    if phone_number.blank? && email.blank? && auth0_uid.blank?
      errors.add(:base, "At least one authentication method (phone number, email, or Auth0) must be present")
    end
  end
end
