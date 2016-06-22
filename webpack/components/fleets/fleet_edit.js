import React from 'react';
import FleetForm from './fleet_form';

var FleetEdit = React.createClass({
  getDefaultProps: function () {
    return {
      title: '车队编辑'
    };
  },
  getInitialState: function () {
    return {
      fleet: {},
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData:function(){
    $.ajax({
      url: '/fleets/' + this.props.params.id+'/edit',
      method: 'GET',
      dataType: 'JSON',
      success: function (data) {
        this.setState({fleet:data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  saveFleet: function () {
    $.ajax({
      url: '/fleets/' + this.props.params.id,
      method: 'PUT',
      data: {id: this.props.params.id, fleet: this.state.fleet},
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

export default FleetEdit;
