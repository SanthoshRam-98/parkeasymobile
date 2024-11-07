# app/services/sms_service.rb
require 'net/http'
require 'uri'
require 'json'

class SmsService
  FAST2SMS_URL = 'https://www.fast2sms.com/dev/bulkV2'

  def self.send_quick_sms(phone_number, message)
    
    uri = URI.parse(FAST2SMS_URL)
    params = {
      authorization: "lM7Giu9vFLZ61oIsfUJWEQXHpzmrR3N5ebAhYtTPCV2xDwgqn8vuYVTBwSPnMARChOz7Gp02DZlk68Ef",
      message: message,
      language: "english",  # Optional
      route: "q",           # "q" is the Quick SMS route for testing
      numbers: phone_number.to_s.sub(/^\+91/, ''),  # Remove +91 if present
    }

    uri.query = URI.encode_www_form(params)
    response = Net::HTTP.get_response(uri)
    Rails.logger.info("Response from SMS service: #{response.body}")
    begin
      parsed_response = JSON.parse(response.body)
      if parsed_response["return"]
        { "return" => true, "message" => "SMS sent successfully" }
      else
        Rails.logger.error("Failed to send SMS: #{parsed_response['message']}")
        { "return" => false, "message" => parsed_response['message'] || "Failed to send SMS" }
      end
    rescue JSON::ParserError => e
      Rails.logger.error("Failed to parse SMS service response: #{e.message}")
      { "return" => false, "message" => "Invalid response from SMS service." }
    rescue => e
      Rails.logger.error("SMS service error: #{e.message}")
      { "return" => false, "message" => "Service error." }
    end
  end
end
