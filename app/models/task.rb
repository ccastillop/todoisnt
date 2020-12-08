class Task < ApplicationRecord
  belongs_to :project, optional: true
  validates :name, presence: true

  scope :completed, -> { where(completed: true) }
  scope :not_completed, -> { where(completed: false) }

  def to_s
    name
  end

end
