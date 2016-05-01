var DriverEdit = React.createClass({
  getInitialState: function () {
    return {
      id: this.props.data.id,
      driver: this.props.data,
    }
  },
  saveDriver: function () {
    console.log('Update driver:', this.state.driver);
    $.ajax({
      url: '/drivers/' + this.state.id,
      method: 'PUT',
      data: {id: this.state.id, driver: this.state.driver},
      success: function (data) {
        console.log('Update driver result:', JSON.stringify(data));
        if (data.return_code == 0) {
          window.location.href = '/drivers';
        } else {
          alert(data.return_info);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setDriver: function (driver) {
    this.setState({driver: driver});
  },
  render: function () {
    return (
      <div className="panel-body">
        <Navigation title="编辑司机"/>
        <div className="col-sm-11">
          <DriverForm data={this.state.driver} setDriver={this.setDriver} saveDriver={this.saveDriver}/>
        </div>
      </div>
    );
  }
});
