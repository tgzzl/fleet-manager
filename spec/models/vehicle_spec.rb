require 'rails_helper'

RSpec.describe Vehicle, type: :model do

  fixtures :fleets, :drivers

  def test_params
    params = Hash.new
    params["number"] = "粤BTTTTT"
    return params
  end

  describe "test the create_vehicle function" do

    it "create vehicle success" do
      params = test_params
      result = Vehicle.create_vehicle(1, 1, params)

      expect(result[:return_code]).to eq 0
      expect(result[:vehicle].number).to eq params["number"]
    end

    it "create vehicle success with name exist but destroy" do
      params = test_params
      # 创建一个标记为删除的车辆
      result = Vehicle.create_vehicle(1, 1, params)
      id = result[:vehicle].id
      Vehicle.destroy_vehicle(id)
      # 再次创建一个车牌相同的车辆
      result2 = Vehicle.create_vehicle(1, 2, params)
      vehicle = Vehicle.find(id)

      expect(result2[:vehicle].id).to eq id
      expect(vehicle.number).to eq params["number"]
      expect(vehicle.enabled).to eq true
    end

    it "create vehicle error with name exist" do
      params = test_params
      result = Vehicle.create_vehicle(1, 1, params)
      result2 = Vehicle.create_vehicle(1, 2, params)
      vehicle = Vehicle.find(result[:vehicle].id)

      expect(result2[:return_code]).to eq 1000
      expect(vehicle.number).to eq params["number"]
    end

    it "create vehicle with nil" do
      result = Vehicle.create_vehicle(1, 1, Hash.new)

      expect(result[:return_code]).to eq 1000
    end

  end

  describe "test the update function" do

    it "update vehicle success" do
      params = test_params
      result = Vehicle.create_vehicle(1, 1, params)
      result2 = Vehicle.update_vehicle(result[:vehicle].id, 2, 1, params)

      expect(result2[:return_code]).to eq 0
      expect(result2[:vehicle].fleet_id).to eq 2
    end

    it "update vehicle error with name exist" do
      params = test_params
      # 创建一个车辆
      result = Vehicle.create_vehicle(1, 1, params)
      # 再次创建一个车辆
      params["number"] = "粤BTTTT2"
      result2 = Vehicle.create_vehicle(2, 2, params)
      # 更新第二个车辆的车牌为第一个车辆的车牌
      params["number"] = result[:vehicle].number
      result3 = Vehicle.update_vehicle(result2[:vehicle].id, 1, 2, params)

      expect(result3[:return_code]).to eq 1000
    end

  end

  describe "test the search function" do

    it "search vehicles" do
      params=test_params
      Vehicle.create_vehicle(1, 1, params)
      result = Vehicle.search(params)

      expect(result[:vehicles].count).to eq 1
    end
  end

  describe "test the find function" do

    it "find vehicle" do
      params = test_params
      result = Vehicle.create_vehicle(1, 1, params)
      vehicle = Vehicle.find_vehicle(result[:vehicle].id)

      expect(result[:vehicle].number).to eq vehicle.number
    end

  end

  describe "test the destroy function" do

    it "destroy vehicle" do
      params = test_params
      result = Vehicle.create_vehicle(1, 1, params)
      id = result[:vehicle].id
      Vehicle.destroy_vehicle(id)
      vehicle = Vehicle.find_vehicle(id)

      expect(vehicle.number).to eq params["number"]
      expect(vehicle.enabled).to eq false
    end

  end
end
