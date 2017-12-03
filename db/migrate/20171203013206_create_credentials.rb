class CreateCredentials < ActiveRecord::Migration
  def change
    create_table :credentials do |t|
      t.string :email
      t.string :provider
      t.string :token
      t.string :refresh_token
      t.datetime :expires_at
      t.boolean :expires
    end
  end
end
