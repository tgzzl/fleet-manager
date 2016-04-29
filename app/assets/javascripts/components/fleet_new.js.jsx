var FleetNew = React.createClass({
  getInitialState: function () {
    return {
      fleet: {},
    }
  },
  saveFleet: function () {
    console.log('Create fleet:', this.state.fleet);
    $.ajax({
      url: '/fleets',
      method: 'POST',
      data: {fleet: this.state.fleet},
      success: function (data) {
        console.log('Create fleet result:', JSON.stringify(data));
        if (data.return_code == 0) {
          window.location.href = '/fleets';
        } else {
          alert(data.return_info);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setFleet: function (fleet) {
    this.setState({fleet: fleet});
  },
  render: function () {
    return (
      <div className="panel-body">
        <h2 className="text-center">新建车队</h2>
        <FleetForm data={this.state.fleet} setFleet={this.setFleet} saveFleet={this.saveFleet}/>
      </div>
    );
  }
});
