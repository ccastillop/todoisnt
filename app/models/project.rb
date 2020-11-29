class Project < ApplicationRecord
  has_many :tasks
  
  def to_s
    name
  end
  
end
