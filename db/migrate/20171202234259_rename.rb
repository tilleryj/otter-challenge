class Rename < ActiveRecord::Migration
  def change
    rename_table :reviews, :projects
    rename_table :versions, :reviews

    rename_column :reviews, :review_id, :project_id
    rename_column :sheets, :review_id, :project_id

  end
end
