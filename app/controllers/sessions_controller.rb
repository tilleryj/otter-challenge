class SessionsController < ApplicationController
  def create
    @credential = Credential.find_or_create_by(email: auth_hash['info']['email'])
    @credential.update(
      token:         auth_hash['credentials']['token'],
      refresh_token: auth_hash['credentials']['refresh_token'],
      expires_at:    auth_hash['credentials']['expires_at'],
      expires:       auth_hash['credentials']['expires']
    )

    session[:id] = @credential.id
    redirect_to request.env['omniauth.origin'] || root_path
  end

  def destroy
    sessions[:id] = nil
    redirect_to root
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
