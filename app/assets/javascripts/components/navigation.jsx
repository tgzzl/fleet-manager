var Navigation = React.createClass({
  render: function () {
    return (
      <div>
        <h2 className="text-center">{this.props.title}</h2><br/><br/>
        <div className="col-sm-1">
          <Link id="link_fleets" to="/fleets">车队管理</Link><br/>
          <Link id="link_fleet_new" to="/fleets/new">新建车队</Link><br/><br/>
          <Link id="link_drivers" to="/drivers">司机管理</Link><br/>
          <Link id="link_driver_new" to="/drivers/new">新建司机</Link><br/><br/>
          <Link id="link_vehicles" to="/vehicles">车辆管理</Link><br/>
          <Link id="link_vehicle_new" to="/vehicles/new">新建车辆</Link>
        </div>
      </div>
    );
  }
});
