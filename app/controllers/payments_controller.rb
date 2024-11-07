require 'digest'
require './lib/paytm/encryption_new_pg'

class PaymentsController < ApplicationController
    def initiate_payment
        paytm_params = {
          MID: "YOUR_TEST_MID",  # Replace with your actual test MID
          ORDER_ID: SecureRandom.hex(10),
          CUST_ID: "CUST001",  # Test Customer ID
          TXN_AMOUNT: "10.00",  # Test amount
          CHANNEL_ID: "WEB",  # Use WEB or WAP
          WEBSITE: "WEBSTAGING",  # Use WEBSTAGING for test
          INDUSTRY_TYPE_ID: "Retail",  # Use Retail for general testing
          CALLBACK_URL: "http://192.168.225.160:3000/paytm/verify_payment"  # Update with your local verify URL
        }
    
        checksum = Paytm::EncryptionNewPg.new.get_checksum(paytm_params, "YOUR_TEST_MERCHANT_KEY")  # Replace with your actual test Merchant Key
        Rails.logger.info "Paytm Params: #{paytm_params}"
        Rails.logger.info "Checksum: #{checksum}"
    
        render json: { paytm_params: paytm_params, checksum: checksum, paytm_txn_url: "https://securegw-stage.paytm.in/theia/processTransaction" }
      end

  def verify_payment
    params.delete(:controller)
    params.delete(:action)
    paytm_params = params.to_h
    paytm_checksum = paytm_params.delete("CHECKSUMHASH")

    is_valid_checksum = Paytm::EncryptionNewPg.new.verify_checksum(paytm_params, ENV['PAYTM_MERCHANT_KEY'], paytm_checksum)

    if is_valid_checksum
      # Success logic
      render json: { status: "success", paytm_response: params }
    else
      # Failure logic
      render json: { status: "failure" }, status: 400
    end
  end
end
