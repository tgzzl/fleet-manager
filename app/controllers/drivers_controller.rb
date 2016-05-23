class DriversController < ApplicationController
  def index
    result = Driver.search(params)

    respond_to do |format|
      format.html { render_router result[:drivers] }
      format.json { render json: result[:drivers] }
    end
  end

  def new
    render_router
  end

  def edit
    driver = Driver.find_driver(params[:id])
    render_router driver
  end

  def show
    driver = Driver.find_driver(params[:id])
    render_router driver
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
