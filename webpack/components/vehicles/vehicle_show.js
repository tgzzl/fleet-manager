import React from 'react';

var VehicleShow = React.createClass({
  getDefaultProps: function () {
    return {
      title: '车辆详情'
    };
  },
  getInitialState: function () {
    return {
      vehicle: {
        fleet:{},
        driver: {},
      },
    }
  },
  componentWillMount: function() {
    this.fetchData();
  },
  fetchData:function(){
    $.ajax({
      url: '/vehicles/' + this.props.params.id,
      method: 'GET',
      dataType: 'JSON',
      success: function (data) {
        this.setState({vehicle:data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
        <div>
          <p>车牌：{this.state.vehicle.number}</p>
          <p>车队名称：{this.state.vehicle.fleet.name}</p>
          <p>车队联系人：{this.state.vehicle.fleet.contact}</p>
          <p>司机姓名：{this.state.vehicle.driver.name}</p>
          <p>司机手机：{this.state.vehicle.driver.mobilephone}</p>
        </div>
    );
  }
});

export default VehicleShow;
