class UsersController < ApplicationController
  before_action :authenticate_user!

  def destroy
    current_user.destroy!
    redirect_to new_user_session_path, notice: "User deleted, goodbye :("
  end
end
