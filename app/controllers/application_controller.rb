class ApplicationController < ActionController::Base
  helper_method :current_user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @credential ||= Credential.find_by(id: session[:id])
  end
end
