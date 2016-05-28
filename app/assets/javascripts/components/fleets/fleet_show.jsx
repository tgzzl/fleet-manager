var FleetShow = React.createClass({
  render: function () {
    return (
      <div className="panel-body">
        <Navigation title="车队详情"/>
        <div className="col-sm-11">
          <p>名称：{this.props.route.data.fleet.name}</p>
          <p>联系人：{this.props.route.data.fleet.contact}</p>
          <p>手机：{this.props.route.data.fleet.mobilephone}</p>
          <p>电话：{this.props.route.data.fleet.telephone}</p>
          <p>车队驻地：{this.props.route.data.fleet.address}</p>
          <FleetVehicleList data={this.props.route.data.vehicles}/>
        </div>
      </div>
    );
  }
});

var FleetVehicleList = React.createClass({
  render: function () {
    return (
      <table className="table table-bordered table-hover">
        <thead>
        <tr style={{background:'#F5F5F5'}}>
          <th>序号</th>
          <th>车牌</th>
          <th>司机名称</th>
          <th>司机手机</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {this.props.data.map(function (item, i) {
          return (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.number}</td>
            <td>{item.driver.name}</td>
            <td>{item.driver.mobilephone}</td>
            <td>
              <a id={'link_vehicle_show_'+item.id} className="btn btn-default margin"
                 href={'/vehicles/'+item.id}>查看</a>
              <a id={'link_vehicle_edit_'+item.id} className="btn btn-default"
                 href={'/vehicles/'+item.id+'/edit'}>修改</a>
            </td>
          </tr>
            )}, this)}
        </tbody>
      </table>
    );
  }
});
