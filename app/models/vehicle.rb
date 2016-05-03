class Vehicle < ActiveRecord::Base
  belongs_to :fleet
  belongs_to :driver
  validates :number, presence: true, uniqueness: true,
            format: {with: /\A[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}\z/, message: "请输入正确的车牌"}

  def self.search(params)
    result = {return_code: 0, return_info: 'success'}

    begin
      #vehicles = Vehicle.all
      vehicles = Vehicle.where("enabled = ?", true)
      vehicles = vehicles.where("number like ?", "%#{params["number"]}%") if params["number"].present?

      result[:vehicles] = Vehicle.as_json(vehicles)

    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result
  end

  def self.find_vehicle(id)
    begin
      vehicle = Vehicle.find(id)
    rescue Exception => e
      puts e
      vehicle = {}
    end

    vehicle
  end

  def self.create_vehicle(fleet_id, driver_id, params)
    result = {return_code: 0, return_info: 'success'}

    begin
      params["enabled"] = true

      vehicle = Vehicle.unscoped.find_by number: params["number"]
      # 存在标记不可用的对象，覆写重用此对象；不存在则新建一个；存在合法的对象，创建时报错
      (vehicle.present? and !vehicle.enabled) ? vehicle.update!(params) : vehicle = Vehicle.create!(params)

      fleet = Fleet.find(fleet_id)
      driver = Driver.find(driver_id)
      fleet.vehicles << vehicle
      driver.vehicles << vehicle

    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result[:vehicle] = vehicle
    result
  end

  def self.update_vehicle(id, fleet_id, driver_id, params)
    result = {return_code: 0, return_info: 'success'}

    begin
      vehicle = Vehicle.find(id)
      vehicle.fleet = Fleet.find(fleet_id)
      vehicle.driver = Driver.find(driver_id)
      vehicle.update!(params)
    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result[:vehicle] = vehicle
    result
  end

  def self.destroy_vehicle(id)
    begin
      vehicle = Vehicle.find(id)
      vehicle.update!("enabled" => false)
    rescue Exception => e
      puts e
    end

    result = Vehicle.search({})
    result[:vehicles]
  end

  def self.as_json(obj)
    obj.as_json(include: {fleet: {}, driver: {}})
  end
end
