class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def render_router data={}
    p "#{data.to_json}"
    respond_to do |format|
      format.html { render '/index' }
      format.json { render json:data }
    end
  end

  def enter_action_log
    p "Enter => #{controller_name}##{action_name} [#{params.inspect}]"
  end

  def out_action_log
    p "OUT <= #{controller_name}##{action_name}"
  end

end
