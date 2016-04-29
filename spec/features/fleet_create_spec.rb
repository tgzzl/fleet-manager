require 'rails_helper'
require 'spec_helper'
require 'selenium/webdriver'
Selenium::WebDriver::Firefox::Binary.path='C:\Users\tanner.tan\AppData\Local\Mozilla Firefox\firefox.exe'

feature "fleet new page", :type => :feature, js: true do

  # fixtures :fleets

  it "without fill in anything" do
    visit '/fleets/new'
    click_button "fleet_form_submit"
    #expect(page).to have_text("请填写x车队名")
    #find('button[id="fleet_form_submit"]').click
  end


end
