class ReviewsController < ApplicationController
  def index
    
  end

  def show
    @auth_token = AutodeskToken.get
  end

  def new
    
  end
end
