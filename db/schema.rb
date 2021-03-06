# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160501062405) do

  create_table "drivers", force: :cascade do |t|
    t.string   "name",                       null: false
    t.string   "mobilephone",                null: false
    t.boolean  "enabled",     default: true, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "fleets", force: :cascade do |t|
    t.string   "name",                       null: false
    t.string   "contact",                    null: false
    t.string   "mobilephone",                null: false
    t.string   "telephone"
    t.string   "address"
    t.boolean  "enabled",     default: true, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "fleets", ["name"], name: "index_fleets_on_name", unique: true

  create_table "vehicles", force: :cascade do |t|
    t.string   "number",                    null: false
    t.boolean  "enabled",    default: true, null: false
    t.integer  "fleet_id"
    t.integer  "driver_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "vehicles", ["driver_id"], name: "index_vehicles_on_driver_id"
  add_index "vehicles", ["fleet_id"], name: "index_vehicles_on_fleet_id"
  add_index "vehicles", ["number"], name: "index_vehicles_on_number", unique: true

end
