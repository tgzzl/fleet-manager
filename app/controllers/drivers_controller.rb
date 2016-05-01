class DriversController < ApplicationController
  def index
    result = Driver.search(params)

    respond_to do |format|
      format.html { render 'index', locals: {drivers: result[:drivers]} }
      format.json { render json: result[:drivers] }
    end
  end

  def new
  end

  def edit
    driver = Driver.find_driver(params[:id])

    render 'edit', locals: {driver: driver}
  end

  def show
    driver = Driver.find_driver(params[:id])

    render 'show', locals: {driver: driver}
  end

  def create
    render json: Driver.create_driver(filter_params)
  end

  def update
    render json: Driver.update_driver(params[:id], filter_params)
  end

  def destroy
    render json: Driver.destroy_driver(params[:id])
  end

  def filter_params
    params.require(:driver).permit(:name, :mobilephone)
  end
end
