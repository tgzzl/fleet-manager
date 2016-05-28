class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def render_router data={}
    p "======#{data.to_json}"
    render '/index', locals: {data: data}
  end
end
