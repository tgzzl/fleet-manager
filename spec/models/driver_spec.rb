require 'rails_helper'

RSpec.describe Driver, type: :model do

  def test_params
    params = Hash.new
    params["name"] = "test_name"
    params["mobilephone"] = "15818645501"
    return params
  end

  describe "test the create_driver function" do

    it "create driver success" do
      params = test_params
      result = Driver.create_driver(params)

      expect(result).not_to eq nil
      expect(result[:return_code]).to eq 0
      expect(result[:driver].name).to eq params["name"]
    end

    it "create driver with nil" do
      result = Driver.create_driver(Hash.new)

      expect(result[:return_code]).to eq 1000
    end

  end

  describe "test the update function" do

    it "update driversuccess" do
      params = test_params
      result = Driver.create_driver(params)
      params["mobilephone"] = "15800000000"
      result2 = Driver.update_driver(result[:driver].id, params)

      expect(result2[:driver].mobilephone).to eq params["mobilephone"]
    end

  end

  describe "test the search function" do

    it "search drivers" do
      result = Driver.create_driver(test_params)

      params = Hash.new
      params["name"] = result[:driver].name
      params["mobilephone"] = result[:driver].mobilephone
      result = Driver.search(params)

      expect(result[:drivers].count).to eq 1
    end

  end

  describe "test the find function" do

    it "find driver" do
      params = test_params
      result = Driver.create_driver(params)
      driver = Driver.find_driver(result[:driver].id)

      expect(result[:driver].name).to eq driver.name
    end

  end

  describe "test the destroy function" do

    it "destroy driver" do
      params = test_params
      result = Driver.create_driver(params)
      id = result[:driver].id
      Driver.destroy_driver(id)
      driver = Driver.find_driver(id)

      expect(driver.name).to eq params["name"]
      expect(driver.enabled).to eq false
    end

  end

end
