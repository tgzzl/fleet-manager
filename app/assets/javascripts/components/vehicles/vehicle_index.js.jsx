var VehicleIndex = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || [],
    }
  },
  deleteVehicle: function (fleetId, vehicleId) {
    console.log('Destroy vehicle:', fleetId, vehicleId);
    $.ajax({
      url: '/vehicles/' + vehicleId,
      method: 'DELETE',
      dataType: 'JSON',
      data: {id: vehicleId},
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  searchVehicle: function () {
    var param = {
      number: this.refs.ref_search_vehicle_number.value,
      fleet_name: this.refs.ref_search_fleet_name.value,
      fleet_contact: this.refs.ref_search_fleet_contact.value,
      driver_name: this.refs.ref_search_driver_name.value,
    };
    console.log('Search vehicle:', param);
    $.ajax({
      url: '/vehicles',
      method: 'GET',
      dataType: 'JSON',
      data: param,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="app panel-body">
        <Navigation title="车辆管理"/>
        <div className="col-sm-11">
          <div className="form-inline" style={{marginBottom:'10px'}}>
            <div className="form-group margin">
              <label className="sr-only">车牌:</label>
              <input type="text" className="form-control" placeholder="车牌"
                     id="vehicle_form_number" ref="ref_search_vehicle_number"/>
            </div>
            <div className="form-group margin">
              <label className="sr-only">车队名称:</label>
              <input type="text" className="form-control" placeholder="车队名称"
                     id="vehicle_form_fleet_name" ref="ref_search_fleet_name"/>
            </div>
            <div className="form-group margin">
              <label className="sr-only">车队联系人:</label>
              <input type="text" className="form-control" placeholder="车队联系人"
                     id="vehicle_form_fleet_contact" ref="ref_search_fleet_contact"/>
            </div>
            <div className="form-group margin">
              <label className="sr-only">司机姓名:</label>
              <input type="text" className="form-control" placeholder="司机姓名"
                     id="vehicle_form_driver_name" ref="ref_search_driver_name"/>
            </div>
            <button type="button" className="btn btn-default margin" onClick={this.searchVehicle}
                    id="vehicle_form_submit">搜索
            </button>
          </div>
          <VehicleList data={this.state.data} deleteVehicle={this.deleteVehicle}/>
        </div>
      </div>
    );
  }
});

var VehicleList = React.createClass({
  render: function () {
    return (
      <table className="table table-bordered table-hover">
        <thead>
        <tr style={{background:'#F5F5F5'}}>
          <th>序号</th>
          <th>车牌</th>
          <th>车队名称</th>
          <th>车队联系人</th>
          <th>司机姓名</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {this.props.data.map(function (item, i) {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{item.vehicle.number}</td>
              <td>{item.fleet.name}</td>
              <td>{item.fleet.contact}</td>
              <td>{item.driver.name}</td>
              <td>
                <a id={'link_vehicle_show_'+item.vehicle.id} className="btn btn-default margin"
                   href={'/vehicles/'+item.vehicle.id}>查看</a>
                <a id={'link_vehicle_edit_'+item.vehicle.id} className="btn btn-default margin"
                   href={'/vehicles/'+item.vehicle.id+'/edit'}>修改</a>
                <button id={'btn_vehicle_delete_'+item.vehicle.id} className="btn btn-default"
                        onClick={this.props.deleteVehicle.bind(null,item.fleet.id,item.vehicle.id)}>删除
                </button>
              </td>
            </tr>
          );
        }, this)}
        </tbody>
      </table>
    );
  }
});
