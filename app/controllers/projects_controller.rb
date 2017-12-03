class ProjectsController < ApplicationController
  def show
    @auth_token = AutodeskToken.get
    @project = Project.find(params[:id])
  end

  def create
    @project = Project.create(project_params)
    redirect_to project_path(@project)
  end

  private

  def project_params
    params.require(:project).permit(:name)
  end
end
