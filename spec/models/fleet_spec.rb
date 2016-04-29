require 'rails_helper'

RSpec.describe Fleet, type: :model do

  def test_params
    params = Hash.new
    params["name"] = "test_name"
    params["contact"] = "test_contact"
    params["mobilephone"] = "15818645501"
    params["telephone"] = "0755"
    params["address"] = "深圳市宝安交通局"
    return params
  end

  describe "test the create_fleet function" do

    it "create fleet success" do
      params = test_params
      result = Fleet.create_fleet(params)

      expect(result).not_to eq nil
      expect(result[:return_code]).to eq 0
      expect(result[:fleet].name).to eq params["name"]
    end

    it "create fleet success with name exist but destroy" do
      params = test_params
      # 创建一个标记为删除的车队
      result = Fleet.create_fleet(params)
      id = result[:fleet].id
      Fleet.destroy_fleet(id)
      # 再次创建一个同名的车队
      params["contact"] = "test_contact2"
      result2 = Fleet.create_fleet(params)
      fleet = Fleet.find(id)

      expect(result2[:fleet].id).to eq id
      expect(fleet.contact).to eq params["contact"]
      expect(fleet.enabled).to eq true
    end

    it "create fleet error with name exist" do
      params = test_params
      result = Fleet.create_fleet(params)
      params["contact"] = "test_contact2"
      result2 = Fleet.create_fleet(params)
      fleet = Fleet.find(result[:fleet].id)

      expect(result2[:return_code]).to eq 1000
      expect(fleet.name).to eq params["name"]
    end

    it "create fleet with nil" do
      result = Fleet.create_fleet(Hash.new)

      expect(result[:return_code]).to eq 1000
    end

  end

  describe "test the update function" do

    it "update fleet success" do
      params = test_params
      result = Fleet.create_fleet(params)
      params["contact"] = "test_contact2"
      result2 = Fleet.update_fleet(result[:fleet].id, params)

      expect(result2[:fleet].contact).to eq params["contact"]
    end

    it "update fleet error with name exist" do
      params = test_params
      # 创建一个车队
      result = Fleet.create_fleet(params)
      # 再次创建一个车队
      params["name"] = "test_name2"
      params["contact"] = "test_contact2"
      result2 = Fleet.create_fleet(params)
      # 更新第二个车队的名称为第一个车队的名称
      params["name"] = result[:fleet].name
      result3 = Fleet.update_fleet(result2[:fleet].id, params)

      expect(result3[:return_code]).to eq 1000
    end

  end

  describe "test the search function" do

    it "search fleets" do
      result = Fleet.create_fleet(test_params)

      params = Hash.new
      params["name"] = result[:fleet].name
      params["contact"] = result[:fleet].contact
      params["mobilephone"] = result[:fleet].mobilephone
      params["telephone"] = result[:fleet].telephone
      params["address"] = result[:fleet].address
      result = Fleet.search(params)

      expect(result[:fleets].count).to eq 1
    end
  end

end
