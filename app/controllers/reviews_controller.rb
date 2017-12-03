class ReviewsController < ApplicationController
  before_action :load_project
  before_action :load_review, only: [:show]

  def show
    @auth_token = AutodeskToken.get
  end

  def create
    @review = @project.reviews.create
    redirect_to [@project, @review]
  end

  private

  def load_project
    @project = Project.find(params[:project_id])
  end

  def load_review
    @review = Review.find(params[:id])
  end
end
