class Task < ApplicationRecord
  belongs_to :project
  validates :name, presence: true

  scope :completed, -> { where(completed: true) }
  scope :not_completed, -> { where(completed: false) }

  after_initialize do |task|
    task.project_id ||= Project.first.id
  end

  def to_s
    name
  end

end
