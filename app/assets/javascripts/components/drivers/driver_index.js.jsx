var DriverIndex = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || [],
    }
  },
  deleteDriver: function (id) {
    console.log('Destroy driver:', id);
    $.ajax({
      url: '/drivers/' + id,
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
  searchDriver: function () {
    var param = {
      name: this.refs.ref_search_driver_name.value,
      mobilephone: this.refs.ref_search_driver_mobilephone.value,
    };
    console.log('Search driver:', param);
    $.ajax({
      url: '/drivers',
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
        <Navigation title="司机管理"/>
        <div className="col-sm-11">
          <div className="form-inline" style={{marginBottom:'10px'}}>
            <div className="form-group margin">
              <label className="sr-only">名称:</label>
              <input type="text" className="form-control" placeholder="司机名称"
                     id="driver_form_name" ref="ref_search_driver_name"/>
            </div>
            <div className="form-group margin">
              <label className="sr-only">手机:</label>
              <input type="text" className="form-control" placeholder="手机"
                     id="driver_form_mobilephone" ref="ref_search_driver_mobilephone"/>
            </div>
            <button type="button" className="btn btn-default margin" onClick={this.searchDriver}
                    id="driver_form_submit">搜索
            </button>
          </div>
          <DriverList data={this.state.data} deleteDriver={this.deleteDriver}/>
        </div>
      </div>
    );
  }
});

var DriverList = React.createClass({
  render: function () {
    return (
      <table className="table table-bordered table-hover">
        <thead>
        <tr style={{background:'#F5F5F5'}}>
          <th>序号</th>
          <th>名称</th>
          <th>手机</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {this.props.data.map(function (item, i) {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>{item.mobilephone}</td>
              <td>
                <a id={'link_driver_show_'+item.id} className="btn btn-default margin"
                   href={'/drivers/'+item.id}>查看</a>
                <a id={'link_driver_edit_'+item.id} className="btn btn-default margin"
                   href={'/drivers/'+item.id+'/edit'}>修改</a>
                <button id={'btn_driver_delete_'+item.id} className="btn btn-default"
                        onClick={this.props.deleteDriver.bind(null,item.id)}>删除
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
