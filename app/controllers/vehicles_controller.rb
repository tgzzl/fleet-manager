class VehiclesController < ApplicationController
  def index
    result = Vehicle.search(params)

    respond_to do |format|
      format.html { render_router result[:vehicles] }
      format.json { render json: result[:vehicles] }
    end
  end

  def new
    fleets = Fleet.search
    drivers = Driver.search
    data = {fleets: fleets[:fleets], drivers: drivers[:drivers]}
    render_router data
  end

  def edit
    vehicle = Vehicle.find_vehicle(params[:id])
    fleets = Fleet.search
    drivers = Driver.search
    data = {vehicle: vehicle, fleets: fleets[:fleets], drivers: drivers[:drivers]}
    render_router data
  end

  def show
    vehicle = Vehicle.find_vehicle(params[:id])
    render_router Vehicle.as_json(vehicle)
  end

  def create
    render json: Vehicle.create_vehicle(params[:fleet_id], params[:driver_id], filter_params)
  end

  def update
    render json: Vehicle.update_vehicle(params[:id], params[:fleet_id], params[:driver_id], filter_params)
  end

  def destroy
    render json: Vehicle.destroy_vehicle(params[:id])
  end

  def filter_params
    params['vehicle']['number'] = params['vehicle']['number'].upcase
    params.require(:vehicle).permit(:number)
  end
end
