class Sheet < ActiveRecord::Base
  belongs_to :project

  enum :status, :not_reviewed, :approved, :not_approved
end
