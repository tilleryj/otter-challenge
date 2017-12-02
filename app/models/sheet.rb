class Sheet < ActiveRecord::Base
  belongs_to :review

  enum :status, :not_reviewed, :approved, :not_approved
end
