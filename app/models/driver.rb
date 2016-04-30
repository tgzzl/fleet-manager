class Driver < ActiveRecord::Base

  def self.search(params)
    result = {return_code: 0, return_info: 'success'}

    begin
      #drivers = Driver.all
      drivers = Driver.where("enabled = ?", true)
      drivers = drivers.where("name like ?", "%#{params["name"]}%") if params["name"].present?
      drivers = drivers.where("mobilephone like ?", "%#{params["mobilephone"]}%") if params["mobilephone"].present?

      result[:drivers] = drivers

    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result
  end

  def self.find_driver(id)
    begin
      driver = Driver.find(id)
    rescue Exception => e
      puts e
      driver = {}
    end

    driver
  end

  def self.create_driver(params)
    result = {return_code: 0, return_info: 'success'}

    begin
      driver = Driver.unscoped.find_by name: params["name"]
      # 存在标记不可用的对象，覆写重用此对象；不存在则新建一个；存在合法的对象，创建时报错
      params["enabled"] = true
      (driver.present? and !driver.enabled) ? Driver.update(params) : driver = Driver.create!(params)

    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result[:driver] = driver
    result
  end

  def self.update_driver(id, params)
    result = {return_code: 0, return_info: 'success'}

    begin
      driver = Driver.find(id)
      driver.update(params)
    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result[:driver] = driver
    result
  end

  def self.destroy_driver(id)
    begin
      driver = Driver.find(id)
      driver.update!("enabled" => false)
    rescue Exception => e
      puts e
    end

    result = Driver.search({})
    result[:drivers]
  end

end
