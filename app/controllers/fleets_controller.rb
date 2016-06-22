class FleetsController < ApplicationController
  before_action :enter_action_log
  after_action :out_action_log

  def index
    result = Fleet.search(params)
    render_router result[:fleets]
  end

  def new
    render_router
  end

  def edit
    fleet = Fleet.find_fleet(params[:id])
    render_router fleet
  end

  def show
    fleet = Fleet.find_fleet(params[:id])
    data = {fleet: fleet, vehicles: Vehicle.as_json(fleet.vehicles)}
    render_router data
  end

  def create
    render json: Fleet.create_fleet(filter_params)
  end

  def update
    render json: Fleet.update_fleet(params[:id], filter_params)
  end

  def destroy
    render json: Fleet.destroy_fleet(params[:id])
  end

  def filter_params
    params.require(:fleet).permit(:name, :contact, :mobilephone, :telephone, :address)
  end
end
