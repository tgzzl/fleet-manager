require "rails_helper"

Capybara.register_driver :selenium do |app|
  require 'selenium/webdriver'
  Selenium::WebDriver::Firefox::Binary.path='C:\Users\tanner.tan\AppData\Local\Mozilla Firefox\firefox.exe'
  Capybara::Selenium::Driver.new(app, :browser => :firefox)
end

feature "fleets/show", :type => :feature, js: true do

  Before do
    if Capybara.current_driver == :selenium
      require 'headless'

      headless = Headless.new
      headless.start
    end
  end

  fixtures :fleets
  it "show fleet success" do
    visit '/fleets/1'
    expect(page).to have_text("111")
    expect(page).to have_text("222")
    expect(page).to have_text("15812341234")
    expect(page).to have_text("1234")
    expect(page).to have_text("深圳市")
  end

  it "submit failed" do
    visit '/fleets/6'
    expect(current_url).to eq Capybara.app_host + '/fleets/6'
  end
end
