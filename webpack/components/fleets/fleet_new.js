import React from 'react';
import FleetForm from './fleet_form';

var FleetNew = React.createClass({
  getDefaultProps: function () {
    return {
      title: '新建车队'
    };
  },
  getInitialState: function () {
    return {
      fleet: {},
    }
  },
  saveFleet: function () {
    $.ajax({
      url: '/fleets',
      method: 'POST',
      data: {fleet: this.state.fleet},
      success: function (data) {
        if (data.return_code == 0) {
          window.location.href = '/fleets';
        } else {
          alert(data.return_info);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setFleet: function (fleet) {
    this.setState({fleet: fleet});
  },
  render: function () {
    return (
          <FleetForm data={this.state.fleet} setFleet={this.setFleet} saveFleet={this.saveFleet}/>
    );
  }
});

export default FleetNew;
