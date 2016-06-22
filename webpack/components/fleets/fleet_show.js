import React from 'react';

var FleetShow = React.createClass({
  getDefaultProps: function () {
    return {
      title: '车队详情'
    };
  },
  getInitialState: function () {
    return {
      fleet:{},
      vehicles:[],
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData:function(){
    $.ajax({
      url: '/fleets/' + this.props.params.id,
      method: 'GET',
      dataType: 'JSON',
      success: function (data) {
        this.setState({fleet:data.fleet,vehicles:data.vehicles});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
        <div>
          <p>名称：{this.state.fleet.name}</p>
          <p>联系人：{this.state.fleet.contact}</p>
          <p>手机：{this.state.fleet.mobilephone}</p>
          <p>电话：{this.state.fleet.telephone}</p>
          <p>车队驻地：{this.state.fleet.address}</p>
          <FleetVehicleList data={this.state.vehicles}/>
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

export default FleetShow;
