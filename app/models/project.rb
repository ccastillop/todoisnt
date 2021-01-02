class Project < ApplicationRecord
  has_many :tasks, dependent: :nullify

  validates :name, presence: true

  COLORS = %i( red yellow green blue indigo purple pink gray black)

  def to_s
    name
  end
end
