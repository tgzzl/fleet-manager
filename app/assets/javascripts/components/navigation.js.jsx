var Navigation = React.createClass({
  render: function () {
    return (
      <div>
        <h2 className="text-center">{this.props.title}</h2><br/><br/>
        <div className="col-sm-1">
          <a id="link_fleets" href="/fleets">车队管理</a><br/>
          <a id="link_fleet_new" href="/fleets/new">新建车队</a><br/><br/>
          <a id="link_drivers" href="/drivers">司机管理</a><br/>
          <a id="link_driver_new" href="/drivers/new">新建司机</a><br/><br/>
          <a id="link_vehicles" href="/vehicles">车辆管理</a><br/>
          <a id="link_vehicle_new" href="/vehicles/new">新建车辆</a>
        </div>
      </div>
    );
  }
});
