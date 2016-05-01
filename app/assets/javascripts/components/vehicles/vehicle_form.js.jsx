const MATCH_VEHICLE_NUMBER = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/;

var VehicleForm = React.createClass({
  propTypes: {
    setVehicle: React.PropTypes.func.isRequired,
    saveVehicle: React.PropTypes.func.isRequired,
  },
  handleChange: function () {
    var vehicle = {
      number: this.refs.ref_vehicle_number.value.trim(),
      fleet_id: this.refs.ref_fleet_id.value.trim(),
      driver_id: this.refs.ref_driver_id.value.trim(),
    };
    this.props.setVehicle(vehicle);
  },
  handleSubmit: function () {
    if (!MATCH_VEHICLE_NUMBER.test(this.props.data.number)) {
      this.refs.ref_vehicle_number.getDOMNode().focus();
      var data = this.props.data;
      data.number = '';
      this.props.setVehicle(data);
      alert("请输入正确的车牌号");
      return;
    }
    this.props.saveVehicle();
  },
  render: function () {
    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">车牌：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入车牌" id="vehicle_form_number"
                   ref="ref_vehicle_number" value={this.props.data.number} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">车队：</label>
          <div className="col-sm-11">
            <select className="form-control" value={this.props.data.fleet_id} onChange={this.handleChange}
                    ref="ref_fleet_id" id="vehicle_form_fleet">
              {this.props.fleets.map(function (fleet, i) {
                return (
                  <option key={i} value={fleet.id}>{fleet.name}</option>
                )
              }, this)}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">司机：</label>
          <div className="col-sm-11">
            <select className="form-control" value={this.props.data.driver_id} onChange={this.handleChange}
                    ref="ref_driver_id" id="vehicle_form_driver">
              {this.props.drivers.map(function (driver, i) {
                return (
                  <option key={i} value={driver.id}>{driver.name}</option>
                )
              }, this)}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-offset-1 col-sm-11">
            <button type="button" className="btn btn-default" onClick={this.handleSubmit} id="vehicle_form_submit">保存
            </button>
          </div>
        </div>
      </div>
    );
  }
});
