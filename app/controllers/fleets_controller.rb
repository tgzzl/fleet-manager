class FleetsController < ApplicationController
  def index
    result = Fleet.search(params)

    respond_to do |format|
      format.html { render 'index', locals: {fleets: result[:fleets]} }
      format.json { render json: result[:fleets] }
    end
  end

  def new
  end

  def edit
    fleet = Fleet.find_fleet(params[:id])

    respond_to do |format|
      format.html { render 'edit', locals: {fleet: fleet} }
      format.json { render json: fleet }
    end
  end

  def show
    fleet = Fleet.find_fleet(params[:id])

    respond_to do |format|
      format.html { render 'show', locals: {fleet: fleet} }
      format.json { render json: fleet }
    end
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
