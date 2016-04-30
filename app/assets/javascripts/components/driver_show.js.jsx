var DriverShow = React.createClass({
  getInitialState: function () {
    return {
      driver: this.props.data,
    }
  },
  render: function () {
    return (
      <div className="panel-body">
        <h2 className="text-center">司机详情</h2>
        <p>名称：{this.props.data.name}</p>
        <p>手机：{this.props.data.mobilephone}</p>
      </div>
    );
  }
});

