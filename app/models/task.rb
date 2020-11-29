class Task < ApplicationRecord
  belongs_to :project
  
  def to_s
    name
  end
end
