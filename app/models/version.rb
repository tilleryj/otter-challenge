class Version < ActiveRecord::Base
  belongs_to :review

  after_create :process_version


  def process_version
    #
  end

end
