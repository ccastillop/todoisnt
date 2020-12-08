class RemoveNotNullContraintOnTask < ActiveRecord::Migration[6.0]
  def change
    change_column_null :tasks, :project_id, true
  end
end
