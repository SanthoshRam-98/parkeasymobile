class AddAuth0UidToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :auth0_uid, :string
    add_index :users, :auth0_uid, unique: true
  end
end
