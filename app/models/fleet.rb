class Fleet < ActiveRecord::Base

  def self.search(params)
    result = {return_code: 0, return_info: 'success'}

    begin
      #fleets = Fleet.all
      fleets = Fleet.where("enabled = ?", true)
      fleets = fleets.where("name like ?", "%#{params["name"]}%") if params["name"].present?
      fleets = fleets.where("contact like ?", "%#{params["contact"]}%") if params["contact"].present?
      fleets = fleets.where("mobilephone like ? OR telephone like ?", "%#{params["mobilephone"]}%", "%#{params["mobilephone"]}%") if params["mobilephone"].present?
      fleets = fleets.where("address like ?", "%#{params["address"]}%") if params["address"].present?

      result[:fleets] = fleets

    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result
  end

  def self.find_fleet(id)
    begin
      fleet = Fleet.find(id)
    rescue Exception => e
      puts e
      fleet = {}
    end

    fleet
  end

  def self.create_fleet(params)
    result = {return_code: 0, return_info: 'success'}

    begin
      fleet = Fleet.unscoped.find_by name: params["name"]
      # 存在标记不可用的对象，覆写重用此对象；不存在则新建一个；存在合法的对象，创建时报错
      params["enabled"] = true
      (fleet.present? and !fleet.enabled) ? fleet.update(params) : fleet = Fleet.create!(params)

    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result[:fleet] = fleet
    result
  end

  def self.update_fleet(id, params)
    result = {return_code: 0, return_info: 'success'}

    begin
      fleet = Fleet.find(id)
      fleet.update(params)
    rescue Exception => e
      puts e
      result = {return_code: 1000, return_info: e.message}
    end

    result[:fleet] = fleet
    result
  end

  def self.destroy_fleet(id)
    begin
      fleet = Fleet.find(id)
      fleet.update!("enabled" => false)
    rescue Exception => e
      puts e
    end

    result = Fleet.search({})
    result[:fleets]
  end

end

