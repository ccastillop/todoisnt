class Project < ApplicationRecord
  has_many :tasks

  validates :name, presence: true

  def to_s
    name
  end
end
