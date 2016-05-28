var FleetEdit = React.createClass({
  getInitialState: function () {
    return {
      fleet: this.props.route.data,
      id: this.props.route.data.id,
    }
  },
  saveFleet: function () {
    console.log('Update fleet:', this.state.fleet);
    $.ajax({
      url: '/fleets/' + this.state.id,
      method: 'PUT',
      data: {id: this.state.id, fleet: this.state.fleet},
      success: function (data) {
        console.log('Update fleet result:', JSON.stringify(data));
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
        <Navigation title="编辑车队"/>
        <div className="col-sm-11">
          <FleetForm data={this.state.fleet} setFleet={this.setFleet} saveFleet={this.saveFleet}/>
        </div>
      </div>
    );
  }
});
