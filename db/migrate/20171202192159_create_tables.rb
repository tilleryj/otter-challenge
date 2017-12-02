class CreateTables < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string "name"
      t.string "google_drive_file_id"
      t.timestamps
    end

    create_table :versions do |t|
      t.string "autodesk_urn"
      t.string "google_drive_revision_id"
      t.integer "review_id"
      t.timestamps
    end

    create_table :sheets do |t|
      t.string "guid"
      t.integer "status", default: 0
      t.datetime "last_reviewed_at"
      t.integer "review_id"
      t.timestamps
    end
  end
end
