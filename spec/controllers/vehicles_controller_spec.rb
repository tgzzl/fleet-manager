require 'rails_helper'

RSpec.describe VehiclesController, type: :controller do

  fixtures :fleets, :drivers

  def vehicle_params
    params = Hash.new
    params["number"] = "粤B88888"
    return params
  end

  def test_params
    params = Hash.new
    params["id"] = 1
    params["fleet_id"] = 1
    params["driver_id"] = 1
    params["vehicle"] = vehicle_params
    return params
  end

  describe "test POST #create with render json" do

    it "create vehicle success" do
      post :create, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 0
    end

    it "create vehicle failed" do
      post :create, test_params
      post :create, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 1000
    end
  end

  describe "test PUT #update with render json" do

    it "update vehicle success" do
      params = test_params
      post :create, params
      params["fleet_id"] = 2
      put :update, params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 0
      expect(result["vehicle"]["fleet_id"]).to eq params["fleet_id"]
    end

    it "update vehicle failed with id not exist" do
      params = test_params
      params["id"] = 0
      put :update, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 1000
    end

    it "update vehicle failed with number exist" do
      params = test_params
      post :create, params

      vehicle = vehicle_params
      vehicle["number"] = "粤B11111"
      params["vehicle"] = vehicle
      post :create, params
      result = JSON.parse response.body
      id = result["vehicle"]["id"]
      params = test_params
      params["id"] = id
      put :update, params

      result = JSON.parse response.body
      expect(result["return_code"]).to eq 1000
      expect(result["vehicle"]["number"]).not_to eq Vehicle.find(id).number
    end
  end

  describe "test DELETE #destroy with render json" do
    it "destroy vehicle success" do
      params = test_params
      post :create, params
      delete :destroy, params
      expect(response.status).to eq 200
      expect(Vehicle.find(params["id"]).enabled).to eq false
    end
  end

  describe "test get #index" do
    it "get vehicles" do
      get :index
      expect(response.status).to eq 200
      expect(response).to render_template :index
    end
  end

  describe "test get #new" do
    it "render template new" do
      get :new
      expect(response.status).to eq 200
      expect(response).to render_template :new
    end
  end

  describe "test get #edit" do
    it "get vehicle and render template edit" do
      get :edit, test_params
      expect(response.status).to eq 200
      expect(response).to render_template :edit
    end
  end

  describe "test get #show" do
    it "get vehicle and render template show" do
      params = test_params
      post :create, params
      get :show, params
      expect(response.status).to eq 200
      expect(response).to render_template :show
    end
  end

end
