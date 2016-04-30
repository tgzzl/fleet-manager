var FleetIndex = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || [],
    }
  },
  removeFleet: function (id) {
    console.log('Destroy fleet:', id);
    $.ajax({
      url: '/fleets/' + id,
      method: 'DELETE',
      dataType: 'JSON',
      data: {id: id},
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  searchFleet: function () {
    var param = {
      name: this.refs.ref_search_fleet_name.value,
      contact: this.refs.ref_search_fleet_contact.value,
      mobilephone: this.refs.ref_search_fleet_mobilephone.value,
      address: this.refs.ref_search_fleet_address.value,
    };
    console.log('Search fleet:', param);
    $.ajax({
      url: '/fleets',
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
      <div className="fleet_index panel-body">
        <h2 className="text-center">车队管理系统</h2>
        <div className="form-inline" style={{marginBottom:'10px'}}>
          <div className="form-group form_search">
            <label className="sr-only">车队名称:</label>
            <input type="text" className="form-control" placeholder="车队名称" 
                   id="fleet_form_name" ref="ref_search_fleet_name"/>
          </div>
          <div className="form-group form_search">
            <label className="sr-only">联系人:</label>
            <input type="text" className="form-control" placeholder="联系人"
                   id="fleet_form_contact" ref="ref_search_fleet_contact"/>
          </div>
          <div className="form-group form_search">
            <label className="sr-only">手机/固话:</label>
            <input type="text" className="form-control" placeholder="手机/固话"
                   id="fleet_form_mobilephone" ref="ref_search_fleet_mobilephone"/>
          </div>
          <div className="form-group form_search">
            <label className="sr-only">车队驻地:</label>
            <input type="text" className="form-control" placeholder="车队驻地"
                   id="fleet_form_address" ref="ref_search_fleet_address"/>
          </div>
          <button type="button" className="btn btn-default form_search" onClick={this.searchFleet} 
                  id="fleet_form_submit">搜索</button>
          <a className="btn btn-primary" href="/fleets/new" id="link_fleet_new">新建车队</a>
        </div>
        <FleetList data={this.state.data} removeFleet={this.removeFleet}/>
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
            <th scope="row">{i+1}</th>
            <td>{item.name}</td>
            <td>{item.contact}</td>
            <td>{item.mobilephone}</td>
            <td>{item.telephone}</td>
            <td>{item.address}</td>
            <td>
              <a id={'link_fleet_show_'+item.id} className="btn btn-default" href={'/fleets/'+item.id}>查看</a>
              <a id={'link_fleet_edit_'+item.id} className="btn btn-default" href={'/fleets/'+item.id+'/edit'}>修改</a>
              <button id={'btn_fleet_delete_'+item.id} className="btn btn-default" 
                      onClick={this.props.removeFleet.bind(null,item.id)}>删除</button>
            </td>
          </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  }
});


