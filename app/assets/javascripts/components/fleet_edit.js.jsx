var FleetEdit = React.createClass({
  getInitialState: function () {
    return {
      id: this.props.data.id,
      fleet: this.props.data,
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
        <h2 className="text-center">编辑车队</h2>
        <FleetForm data={this.state.fleet} setFleet={this.setFleet} saveFleet={this.saveFleet}/>
      </div>
    );
  }
});

