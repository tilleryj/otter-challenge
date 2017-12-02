require 'rest-client'
require 'open-uri'

class AutodeskToken
  API_URL = 'https://developer.api.autodesk.com'

  def self.get
    response = RestClient.post("#{API_URL}/authentication/v1/authenticate",
                               { client_id: "7ITL4KgHnKBPFA67Sq6QldEKWtTRmBDV",
                                 client_secret: "hV1f6P1AigiM1vDC", 
                                 grant_type: "client_credentials", 
                                 scope: "data:read data:write bucket:create" })
    JSON.parse(response.body)["access_token"]
  end
end