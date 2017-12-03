class ReviewsController < ApplicationController
  before_action :load_review, only: [:show]

  private

  def load_review
    @review = Review.find(params[:id])
  end
end
