var VehicleNew = React.createClass({
  getInitialState: function () {
    return {
      vehicle: {},
    }
  },
  saveVehicle: function () {
    console.log('Create vehicle:', this.state.vehicle);
    $.ajax({
      url: '/vehicles',
      method: 'POST',
      data: {
        fleet_id: this.state.vehicle.fleet_id,
        driver_id: this.state.vehicle.driver_id,
        vehicle: this.state.vehicle
      },
      success: function (data) {
        console.log('Create vehicle result:', JSON.stringify(data));
        if (data.return_code == 0) {
          window.location.href = '/vehicles';
        } else {
          alert(data.return_info);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setVehicle: function (vehicle) {
    this.setState({vehicle: vehicle});
  },
  render: function () {
    return (
      <div className="panel-body">
        <Navigation title="新建车辆"/>
        <div className="col-sm-11">
          <VehicleForm data={this.state.vehicle}
                       fleets={this.props.fleets}
                       drivers={this.props.drivers}
                       setVehicle={this.setVehicle}
                       saveVehicle={this.saveVehicle}/>
        </div>
      </div>
    );
  }
});
