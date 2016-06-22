import React from 'react';
import DriverForm from './driver_form';

var DriverEdit = React.createClass({
  getDefaultProps: function () {
    return {
      title: '司机编辑'
    };
  },
  getInitialState: function () {
    return {
      driver: {},
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData:function(){
    $.ajax({
      url: '/drivers/' + this.props.params.id+'/edit',
      method: 'GET',
      dataType: 'JSON',
      success: function (data) {
        this.setState({driver:data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  saveDriver: function () {
    $.ajax({
      url: '/drivers/' + this.props.params.id,
      method: 'PUT',
      data: {id: this.props.params.id, driver: this.state.driver},
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

export default DriverEdit;
