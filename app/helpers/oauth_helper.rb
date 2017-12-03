require 'google/apis/drive_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'


module OauthHelper
  OOB_URI = 'urn:ietf:wg:oauth:2.0:oob'
  APPLICATION_NAME = 'Drive API Ruby Quickstart'
  # CLIENT_SECRETS_PATH = 'client_secret.json'
  # CREDENTIALS_PATH = File.join(Dir.home, '.credentials',
  #                              "drive-ruby-quickstart.yaml")
  SCOPE = Google::Apis::DriveV3::AUTH_DRIVE

  # authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
  # json_key_io: File.open('/path/to/service_account_json_key.json'),
  # scope: scope)

  # authorizer.fetch_access_token!

  # Ensure valid credentials, either by restoring from the saved credentials
  # files or intitiating an OAuth2 authorization. If authorization is required,
  # the user's default browser will be launched to approve the request.
  #
  # @return [Google::Auth::UserRefreshCredentials] OAuth2 credentials
  def authorize
    # FileUtils.mkdir_p(File.dirname(CREDENTIALS_PATH))

    p client_id = Rails.application.secrets.client_id
    # token_store = Google::Auth::Stores::FileTokenStore.new(file: CREDENTIALS_PATH)
    authorizer = Google::Auth::UserAuthorizer.new(client_id, SCOPE, token_store)

    user_id = 'default'
    credentials = authorizer.get_credentials(user_id)
    if credentials.nil?
      url = authorizer.get_authorization_url(
        base_url: OOB_URI)
      puts "Open the following URL in the browser and enter the " +
           "resulting code after authorization"
      puts url
      code = gets
      credentials = authorizer.get_and_store_credentials_from_code(
        user_id: user_id, code: code, base_url: OOB_URI)
    end
    credentials

    # Initialize the API
    service = Google::Apis::DriveV3::DriveService.new
    service.client_options.application_name = APPLICATION_NAME
    service.authorization = authorize
    response = service.list_files(page_size: 10,
                                  fields: 'nextPageToken, files(id, name)')

    puts "\nStart token"
    start_token = service.get_changes_start_page_token
    puts start_token.inspect

    puts "\nDrive change list"
    changes = service.list_changes(145205)
    puts changes.inspect

    # puts "\nRevision list"
    # revisions = service.list_revisions('1hOC1ShRXHxyFz8hVnbPzypr3pr_lRWEL')
    # puts revisions.inspect

    # puts "\nGet one file"
    # file = service.get_file('1hOC1ShRXHxyFz8hVnbPzypr3pr_lRWEL', download_dest: "/home/rtrifan/Coding/hackathons/builtworlds/file")
    # puts file.inspect

    # puts "\nGet one revision"
    # response = service.get_revision('1hOC1ShRXHxyFz8hVnbPzypr3pr_lRWEL', '0B7HMrQcKw_OMekxuOXRsQlM3aGpJV1hPSldBUEs5RDhkbk9VPQ', download_dest: "/home/rtrifan/Coding/hackathons/builtworlds/revision_last")
    # puts response
    end
  end




