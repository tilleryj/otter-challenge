class ProjectsController < ApplicationController
  include OauthHelper

  def index
    @projects = Project.all
  end

  def show
    @auth_token = AutodeskToken.get
    @project = Project.find(params[:id])
  end

  def new
    get_files
  end

  def create
    @project = Project.create(project_params)
    render 'uploading'
  end

  private

  def project_params
    params.require(:project).permit(:name)
  end

end
