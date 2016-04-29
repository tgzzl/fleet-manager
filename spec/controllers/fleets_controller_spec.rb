require 'rails_helper'

RSpec.describe FleetsController, type: :controller do

  def fleet_params
    params = Hash.new
    params["name"] = "test_name"
    params["contact"] = "test_contact"
    params["mobilephone"] = "15818645501"
    params["telephone"] = "0755"
    params["address"] = "深圳市宝安"
    return params
  end

  def test_params
    params = Hash.new
    params["id"] = 1
    params["fleet"] = fleet_params
    return params
  end

  describe "test POST #create with render json" do

    it "create fleet success" do
      post :create, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 0
    end

    it "create fleet failed" do
      post :create, test_params
      post :create, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 1000
    end
  end

  describe "test PUT #update with render json" do

    it "update fleet success" do
      params = test_params
      post :create, params
      fleet = fleet_params
      fleet["contact"] = "update contact"
      params["fleet"] = fleet
      put :update, params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 0
      expect(result["fleet"]["contact"]).to eq fleet["contact"]
    end

    it "update fleet failed with id not exist" do
      params = test_params
      params["id"] = 0
      put :update, test_params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 1000
    end

    it "update fleet failed with name exist" do
      params = test_params
      post :create, params

      fleet = fleet_params
      fleet["name"] = "test_name2"
      params["fleet"] = fleet
      post :create, params

      fleet["contact"] = "update contact"
      params["fleet"] = fleet
      put :update, params
      result = JSON.parse response.body
      expect(result["return_code"]).to eq 1000
      expect(result["fleet"]["name"]).not_to eq Fleet.find(params["id"]).name
    end
  end

  describe "test DELETE #destroy with render json" do
    it "destroy fleet success" do
      params = test_params
      post :create, params
      delete :destroy, params
      expect(response.status).to eq 200
      expect(Fleet.find(params["id"]).enabled).to eq false
    end
  end

  describe "test get #index" do
    it "get fleets" do
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
    it "get fleet and render template edit" do
      get :edit, test_params
      expect(response.status).to eq 200
      expect(response).to render_template :edit
    end
  end

  describe "test get #show" do
    it "get fleet and render template show" do
      get :show, test_params
      expect(response.status).to eq 200
      expect(response).to render_template :show
    end
  end

end
