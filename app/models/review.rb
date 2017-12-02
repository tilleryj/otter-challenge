class Review < ActiveRecord::Base
  belongs_to :project

  after_create :process_version


  def process_version
    # google_drive_version_id
    # send bytes to autodesk and get urn
  end

  # def create_bucket(bucket_key,access_token)
  #   response = RestClient.post("#{API_URL}/oss/v2/buckets",
  #                              { bucketKey: bucket_key, policyKey:'persistent'}.to_json,
  #                              { Authorization: "Bearer #{access_token}", content_type:'application/json' })
  #   return response

end
