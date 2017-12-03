class Credential < ActiveRecord::Base
  # https://www.twilio.com/blog/2014/09/gmail-api-oauth-rails.html
  require 'net/http'
  require 'json'

  def to_params
    {
      'refresh_token' => refresh_token,
      'client_id' => Rails.application.secrets.client_id,
      'client_secret' => Rails.application.secrets.client_secret,
      'grant_type' => 'refresh_token'
    }
  end

  def request_token
    url = URI("https://accounts.google.com/o/oauth2/token")
    Net::HTTP.post_form(url, to_params)
  end

  def refresh!
    response = request_token
    data = JSON.parse(response.body)
    update_attributes(
      token: data['access_token'],
      expires_at: Time.now + (data['expires_in'].to_i).seconds)
  end

  def expired?
    expires_at < Time.now
  end

  def fresh_token
    refresh! if expired?
  end
end
