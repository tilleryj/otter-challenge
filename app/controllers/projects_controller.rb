class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def show
    @auth_token = AutodeskToken.get
    @project = Project.find(params[:id])
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
