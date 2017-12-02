class ProjectsController < ApplicationController
  def index
  end

  def show
    @auth_token = AutodeskToken.get
    @project = Project.find(params[:id])
  end

  def new

  end
end
