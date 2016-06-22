import React from 'react';
import VehicleForm from './vehicle_form';

var VehicleEdit = React.createClass({
  getDefaultProps: function () {
    return {
      title: '车辆编辑'
    };
  },
  getInitialState: function () {
    return {
      vehicle: {},
      fleets:[],
      drivers:[],
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData:function(){
    $.ajax({
      url: '/vehicles/' + this.props.params.id+'/edit',
      method: 'GET',
      dataType: 'JSON',
      success: function (data) {
        this.setState({vehicle:data.vehicle,fleets:data.fleets,drivers:data.drivers});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  saveVehicle: function () {
    $.ajax({
      url: '/vehicles/' + this.props.params.id,
      method: 'PUT',
      data: {
        id: this.props.params.id,
        fleet_id: this.state.vehicle.fleet_id,
        driver_id: this.state.vehicle.driver_id,
        vehicle: this.state.vehicle
      },
      success: function (data) {
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
          <VehicleForm data={this.state.vehicle}
                       fleets={this.state.fleets}
                       drivers={this.state.drivers}
                       setVehicle={this.setVehicle}
                       saveVehicle={this.saveVehicle}/>
    );
  }
});

export default VehicleEdit;
