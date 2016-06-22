import React from 'react';
import DriverForm from './driver_form';

var DriverNew = React.createClass({
  getDefaultProps: function () {
    return {
      title: '新建司机'
    };
  },
  getInitialState: function () {
    return {
      driver: {},
    }
  },
  saveDriver: function () {
    $.ajax({
      url: '/drivers',
      method: 'POST',
      data: {driver: this.state.driver},
      success: function (data) {
        if (data.return_code == 0) {
          window.location.href = '/drivers';
        } else {
          alert(data.return_info);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setDriver: function (driver) {
    this.setState({driver: driver});
  },
  render: function () {
    return (
          <DriverForm data={this.state.driver} setDriver={this.setDriver} saveDriver={this.saveDriver}/>
    );
  }
});

export default DriverNew;
