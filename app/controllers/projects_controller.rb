class ProjectsController < ApplicationController
  before_action :load_project, only: [:show, :view3d]

  def create
    @project = Project.create(project_params)
    render 'uploading'
  end

  def view3d
    render layout: false
  end

  private

  def load_project
    @project = Project.find(params[:id])
    @auth_token = AutodeskToken.get
  end

  def project_params
    params.require(:project).permit(:name)
  end
end
