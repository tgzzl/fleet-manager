import React from 'react';
import { Link } from 'react-router';

var FleetIndex = React.createClass({
  getDefaultProps: function () {
    return {
      title: '车队管理系统'
    };
  },
  getInitialState: function () {
    return {
      fleets: [],
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function () {
    var param = {
      name: this.refs.ref_search_fleet_name.value,
      contact: this.refs.ref_search_fleet_contact.value,
      mobilephone: this.refs.ref_search_fleet_mobilephone.value,
      address: this.refs.ref_search_fleet_address.value,
    };
    $.ajax({
      url: '/fleets',
      method: 'GET',
      dataType: 'JSON',
      data: param,
      success: function (data) {
        this.setState({fleets: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteFleet: function (id) {
    $.ajax({
      url: '/fleets/' + id,
      method: 'DELETE',
      dataType: 'JSON',
      data: {id: id},
      success: function (fleets) {
        this.setState({fleets: fleets});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
        <div>
          <div className="form-inline" style={{marginBottom:'10px'}}>
            <div className="form-group margin">
              <label className="sr-only">车队名称:</label>
              <input type="text" className="form-control" placeholder="车队名称"
                     id="fleet_form_name" ref="ref_search_fleet_name"/>
            </div>
            <div className="form-group margin">
              <label className="sr-only">联系人:</label>
              <input type="text" className="form-control" placeholder="联系人"
                     id="fleet_form_contact" ref="ref_search_fleet_contact"/>
            </div>
            <div className="form-group margin">
              <label className="sr-only">手机/固话:</label>
              <input type="text" className="form-control" placeholder="手机/固话"
                     id="fleet_form_mobilephone" ref="ref_search_fleet_mobilephone"/>
            </div>
            <div className="form-group margin">
              <label className="sr-only">车队驻地:</label>
              <input type="text" className="form-control" placeholder="车队驻地"
                     id="fleet_form_address" ref="ref_search_fleet_address"/>
            </div>
            <button type="button" className="btn btn-default margin" onClick={this.fetchData}
                    id="fleet_form_submit">搜索
            </button>
          </div>
          <FleetList data={this.state.fleets} deleteFleet={this.deleteFleet}/>
        </div>
    );
  }
});

var FleetList = React.createClass({
  render: function () {
    return (
      <table className="table table-bordered table-hover">
        <thead>
        <tr style={{background:'#F5F5F5'}}>
          <th>序号</th>
          <th>车队名称</th>
          <th>联系人</th>
          <th>手机</th>
          <th>电话</th>
          <th>车队驻地</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {this.props.data.map(function (item, i) {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.mobilephone}</td>
              <td>{item.telephone}</td>
              <td>{item.address}</td>
              <td>
                <Link id={'link_fleet_show_'+item.id} className="btn btn-default margin"
                      to={'/fleets/'+item.id}>查看</Link>
                <Link id={'link_fleet_edit_'+item.id} className="btn btn-default margin"
                      to={'/fleets/'+item.id+'/edit'}>修改</Link>
                <button id={'btn_fleet_delete_'+item.id} className="btn btn-default"
                        onClick={this.props.deleteFleet.bind(null,item.id)}>删除
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

export default FleetIndex;
