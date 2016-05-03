require 'rails_helper'

RSpec.describe DriversController, type: :controller do

  def driver_params
    params = Hash.new
    params["name"] = "test_name"
    params["mobilephone"] = "15818645501"
    return params
  end

  def test_params
    params = Hash.new
    params["id"] = 1
    params["driver"] = driver_params
    return params
  end

  describe "test POST #create with render json" do

    it "create driver success" do
      post :create, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 0
    end
  end

  describe "test PUT #update with render json" do

    it "update driver success" do
      params = test_params
      post :create, params
      driver = driver_params
      driver["mobilephone"] = "15800000000"
      params["driver"] = driver
      put :update, params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 0
      expect(result["driver"]["mobilephone"]).to eq driver["mobilephone"]
    end

    it "update driver failed with id not exist" do
      params = test_params
      params["id"] = 0
      put :update, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 1000
    end
  end

  describe "test DELETE #destroy with render json" do
    it "destroy driver success" do
      params = test_params
      post :create, params
      delete :destroy, params
      expect(response.status).to eq 200
      expect(Driver.find(params["id"]).enabled).to eq false
    end
  end

  describe "test get #index" do
    it "get drivers" do
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
    it "get driver and render template edit" do
      get :edit, test_params
      expect(response.status).to eq 200
      expect(response).to render_template :edit
    end
  end

  describe "test get #show" do
    it "get driver and render template show" do
      params = test_params
      post :create, params
      get :show, test_params
      expect(response.status).to eq 200
      expect(response).to render_template :show
    end
  end

end
