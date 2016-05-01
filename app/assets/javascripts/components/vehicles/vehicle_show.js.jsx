var VehicleShow = React.createClass({
  render: function () {
    return (
      <div className="panel-body">
        <Navigation title="车辆详情"/>
        <div className="col-sm-11">
          <p>车牌：{this.props.vehicle.number}</p>
          <p>车队名称：{this.props.fleet.name}</p>
          <p>车队联系人：{this.props.fleet.contact}</p>
          <p>司机姓名：{this.props.driver.name}</p>
          <p>司机手机：{this.props.driver.mobilephone}</p>
        </div>
      </div>
    );
  }
});
