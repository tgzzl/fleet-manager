Capybara.register_driver :selenium do |app|
  require 'selenium/webdriver'
  Selenium::WebDriver::Firefox::Binary.path='C:\Users\tanner.tan\AppData\Local\Mozilla Firefox\firefox.exe'
  Capybara::Selenium::Driver.new(app, :browser => :firefox)
end
