var DriverShow = React.createClass({
  render: function () {
    return (
      <div className="panel-body">
        <Navigation title="司机详情"/>
        <div className="col-sm-11">
          <p>姓名：{this.props.data.name}</p>
          <p>手机：{this.props.data.mobilephone}</p>
        </div>
      </div>
    );
  }
});