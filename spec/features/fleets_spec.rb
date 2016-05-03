require 'rails_helper'
require 'selenium/webdriver'
Selenium::WebDriver::Firefox::Binary.path='C:\Users\tanner.tan\AppData\Local\Mozilla Firefox\firefox.exe'

feature "fleets page", :type => :feature, js: true do

  fixtures :fleets

  it "search fleets -> new fleet" do
    visit '/fleets'

    fill_in "fleet_form_name", :with => "111"
    fill_in "fleet_form_contact", :with => "111"
    fill_in "fleet_form_mobilephone", :with => "1581234"
    fill_in "fleet_form_address", :with => "深圳"
    click_button "fleet_form_submit"
    expect(current_url.end_with?('/fleets')).to eq true

    click_link "link_fleet_new"
    expect(current_url.end_with?('/fleets/new')).to eq true

    fill_in "fleet_form_name", :with => "test"
    fill_in "fleet_form_contact", :with => "test"
    fill_in "fleet_form_mobilephone", :with => "15818645501"
    fill_in "fleet_form_telephone", :with => "0758"
    fill_in "fleet_form_address", :with => "深圳市"
    click_button "fleet_form_submit"
    expect(current_url.end_with?('/fleets')).to eq true
  end

  it "list fleets -> show fleet" do
    visit '/fleets'

    expect(current_url.end_with?('/fleets')).to eq true

    click_link "link_fleet_show_1"
    expect(current_url.end_with?('/fleets/1')).to eq true

  end

  it "list fleets -> edit fleet" do
    visit '/fleets'

    expect(current_url.end_with?('/fleets')).to eq true

    click_link "link_fleet_edit_1"
    expect(current_url.end_with?('/fleets/1/edit')).to eq true

    #fill_in "fleet_form_name", :with => "111"
    fill_in "fleet_form_contact", :with => "111_test"
    fill_in "fleet_form_mobilephone", :with => "15800000000"
    fill_in "fleet_form_telephone", :with => "07"
    fill_in "fleet_form_address", :with => "深圳市test"
    click_button "fleet_form_submit"
    expect(current_url.end_with?('/fleets')).to eq true

  end

  it "list fleets -> delete fleet" do
    visit '/fleets'

    expect(current_url.end_with?('/fleets')).to eq true

    click_button "btn_fleet_delete_2"
    expect(current_url.end_with?('/fleets')).to eq true

  end

end
