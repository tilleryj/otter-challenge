class Review < ActiveRecord::Base
  has_many :sheets, dependent: :destroy
  has_many :versions, dependent: :destroy
end
