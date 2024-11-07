class AddFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :email, :string
    add_column :users, :password_digest, :string
    add_column :users, :user_role, :string
    add_column :users, :profile_picture, :string
  end
end
