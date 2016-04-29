var FleetShow = React.createClass({
  getInitialState: function () {
    return {
      fleet: this.props.data,
    }
  },
  render: function () {
    return (
      <div className="panel-body">
        <h2 className="text-center">车队详情</h2>
        <p>名称：{this.props.data.name}</p>
        <p>联系人：{this.props.data.contact}</p>
        <p>手机：{this.props.data.mobilephone}</p>
        <p>电话：{this.props.data.telephone}</p>
        <p>车队驻地：{this.props.data.address}</p>
      </div>
    );
  }
});
