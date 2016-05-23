var VehicleEdit = React.createClass({
  getInitialState: function () {
    return {
      vehicle: this.props.data,
      id: this.props.data.id,
    }
  },
  saveVehicle: function () {
    console.log('Update vehicle:', this.state.vehicle);
    $.ajax({
      url: '/vehicles/' + this.state.id,
      method: 'PUT',
      data: {
        id: this.state.id,
        fleet_id: this.state.vehicle.fleet_id,
        driver_id: this.state.vehicle.driver_id,
        vehicle: this.state.vehicle
      },
      success: function (data) {
        console.log('Update vehicle result:', JSON.stringify(data));
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
        <Navigation title="编辑车辆"/>
        <div className="col-sm-11">
          <VehicleForm data={this.state.vehicle}
                       fleets={this.props.data.fleets}
                       drivers={this.props.data.drivers}
                       setVehicle={this.setVehicle}
                       saveVehicle={this.saveVehicle}/>
        </div>
      </div>
    );
  }
});
