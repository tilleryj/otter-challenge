class Project < ActiveRecord::Base
  has_many :sheets, dependent: :destroy
  has_many :reviews, dependent: :destroy
end
